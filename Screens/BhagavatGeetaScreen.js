import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axiosInstance from "../apis/axiosInstance";
import { Audio } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";

const BhagavatGeetaScreen = () => {
  const [titles, setTitles] = useState([]);
  const [textData, setTextData] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState("TEXT");

  const soundRef = useRef(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dummy audios
  const audioList = [
    { title: "Gita Audio 1", file: require("../assets/audios/Aarti.mp3") },
    { title: "Gita Audio 2", file: require("../assets/audios/Aarti.mp3") },
  ];

  // Dummy videos
  const videoList = [
    { title: "Gita Video 1", youtubeId: "FkopR6dA5wE" },
    { title: "Gita Video 2", youtubeId: "l482T0yNkeo" },
  ];

  // ----------------------------
  // FETCH TITLES
  // ----------------------------
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axiosInstance.get("/users/bhagvatGitaSubTitle");
        setTitles(response.data || []);
      } catch {
        console.log("Title fetch error");
      }
      setLoading(false);
    };
    fetchTitles();
  }, []);

  // ----------------------------
  // FETCH TEXT CONTENT FOR ALL TITLES
  // ----------------------------
  useEffect(() => {
    const fetchText = async () => {
      let resultObj = {};

      for (let title of titles) {
        try {
          const res = await axiosInstance.get(
            `/users/get-bhagvatGitacontent/${encodeURIComponent(title)}`
          );

          const raw = res.data?.content;

          const safeText =
            typeof raw === "string"
              ? raw.trim()
              : raw?.toString
              ? raw.toString().trim()
              : "";

          resultObj[title] = safeText;
        } catch {
          resultObj[title] = "";
        }
      }
      setTextData(resultObj);
    };

    if (selectedTab === "TEXT" && titles.length > 0) {
      fetchText();
    }
  }, [selectedTab, titles]);

  // ----------------------------
  // AUDIO PLAYER
  // ----------------------------
  const cleanupAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
    } catch {}
    soundRef.current = null;
    setCurrentAudioIndex(null);
    setIsPlaying(false);
  };

  const handleAudioToggle = async (index, file) => {
    try {
      if (currentAudioIndex === index && isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        return;
      }

      if (currentAudioIndex === index && !isPlaying) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        return;
      }

      await cleanupAudio();

      const { sound } = await Audio.Sound.createAsync(file, {
        shouldPlay: true,
      });

      soundRef.current = sound;
      setCurrentAudioIndex(index);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status?.didJustFinish) cleanupAudio();
      });
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  // ----------------------------
  // LOADING UI
  // ----------------------------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4A017" />
      </View>
    );
  }

  // ----------------------------
  // RENDER TEXT TAB
  // ----------------------------
  const renderTextItem = ({ item }) => (
    <View style={styles.textCard}>
      <Text style={styles.textTitle}>{item}</Text>

      <Text style={styles.textBody}>
        {textData[item] ? textData[item] : "Content not found"}
      </Text>
    </View>
  );

  // ----------------------------
  // RENDER AUDIO TAB
  // ----------------------------
  const renderAudioItem = ({ item, index }) => (
    <View style={styles.audioCard}>
      <Text style={styles.audioTitle}>{item.title}</Text>

      <TouchableOpacity onPress={() => handleAudioToggle(index, item.file)}>
        <Ionicons
          name={
            currentAudioIndex === index && isPlaying
              ? "pause-circle"
              : "play-circle"
          }
          size={48}
          color="#D4A017"
        />
      </TouchableOpacity>
    </View>
  );

  // ----------------------------
  // RENDER VIDEO TAB
  // ----------------------------
  const renderVideoItem = ({ item }) => (
    <View style={styles.videoCard}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubePlayer height={220} videoId={item.youtubeId} />
    </View>
  );

  // ----------------------------
  // MAIN UI
  // ----------------------------
  return (
    <View style={styles.container}>
      {/* Toggle Buttons */}
      <View style={styles.toggleRow}>
        {["TEXT", "AUDIO", "VIDEO"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setSelectedTab(tab);
              if (tab !== "AUDIO") cleanupAudio();
            }}
            style={[
              styles.toggleBtn,
              selectedTab === tab && styles.toggleBtnActive,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                selectedTab === tab && styles.toggleTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TEXT TAB */}
      {selectedTab === "TEXT" && (
        <FlatList
          data={titles}
          renderItem={renderTextItem}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}

      {/* AUDIO TAB */}
      {selectedTab === "AUDIO" && (
        <FlatList
          data={audioList}
          renderItem={renderAudioItem}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ padding: 10, paddingBottom: 30 }}
        />
      )}

      {/* VIDEO TAB */}
      {selectedTab === "VIDEO" && (
        <FlatList
          data={videoList}
          renderItem={renderVideoItem}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

export default BhagavatGeetaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", maxWidth: 1000, alignSelf: "center", backgroundColor: "#FAF7F2" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "transparent",
  },

  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e6d2a2",
  },

  toggleBtnActive: {
    backgroundColor: "#d4a017",
  },

  toggleText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 16,
  },

  toggleTextActive: {
    color: "white",
  },

  textCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#FFD700",
    padding: 15,
    margin: 10,
    elevation: 4,
  },

  textTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#7A4B1A",
  },

  textBody: {
    fontSize: 16,
    lineHeight: 26,
    color: "#5C3D2E",
    textAlign: "center",
  },

  audioCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "#FFD700",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 4,
  },

  audioTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  videoCard: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#FFD700",
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    elevation: 4,
  },

  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
});
