import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../apis/axiosInstance";
import YoutubePlayer from "react-native-youtube-iframe";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const { width } = Dimensions.get("window");

const imageSources = [
  require("../assets/datta45.jpg"),
  require("../assets/krushna07.jpg"),
  require("../assets/datta.jpg"),
  require("../assets/chakrapaniimages.jpeg"),
  require("../assets/Govind.png"),
  require("../assets/shreechakra.jpg"),
];

const ParayanScreen = () => {
  const navigation = useNavigation();

  const [infoTitles, setInfoTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("TEXT");

  // AUDIO STATE
  const [sound, setSound] = useState(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  // MENU POPUP
  const [menuIndex, setMenuIndex] = useState(null);

  // Dummy audio
  const audioList = [
    { title: "Parayan Audio 1", file: require("../assets/audios/Aarti.mp3"), url: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav" },
    { title: "Parayan Audio 2", file: require("../assets/audios/Aarti.mp3"), url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav" },
  ];

  const videoList = [
    { title: "Parayan Video 1", youtubeId: "FkopR6dA5wE" },
    { title: "Parayan Video 2", youtubeId: "l482T0yNkeo" },
  ];

  // Load titles
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/parayanInfoTitle");
        setInfoTitles(response.data || []);
      } catch {
        setError("Error fetching Parayan titles.");
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    return () => cleanupSound();
  }, []);

  useEffect(() => {
    if (selectedTab !== "AUDIO") cleanupSound();
  }, [selectedTab]);

  const cleanupSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
    } catch { }

    soundRef.current = null;
    setIsPlaying(false);
    setCurrentAudioIndex(null);
    setPosition(0);
    setDuration(1);
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

      cleanupSound();

      const { sound: newSound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
      soundRef.current = newSound;
      setCurrentAudioIndex(index);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((st) => {
        if (st.isLoaded) {
          setPosition(st.positionMillis);
          setDuration(st.durationMillis || 1);

          if (st.didJustFinish) cleanupSound();
        }
      });
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  const formatTime = (millis) => {
    const totalSec = millis / 1000;
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // DOWNLOAD AUDIO
  const downloadAudio = async (audioUrl, title) => {
    try {
      const fileName = title.replace(/\s+/g, "_") + ".mp3";
      const fileUri = FileSystem.documentDirectory + fileName;

      const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);
      console.log("Downloaded to:", uri);

      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      }

      alert("Downloaded Successfully!");
    } catch (err) {
      console.log("Download error:", err);
      alert("Download failed!");
    }
    setMenuIndex(null);
  };

  // RENDER: TEXT CARD
  const renderTextItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ParayanSubInfoScreen", { infoTitle: item })} style={styles.card}>
      <ImageBackground source={imageSources[index % imageSources.length]} style={styles.cardBackground} imageStyle={{ borderRadius: 18 }}>
        <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)"]} style={styles.overlay}>
          <Text style={styles.cardText}>{item}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  // RENDER: AUDIO PLAYER
  const renderAudioItem = ({ item, index }) => {
    const isActive = currentAudioIndex === index;

    return (
      <View style={styles.audioPlayerBox}>
        <View style={styles.audioTopRow}>
          <TouchableOpacity onPress={() => handleAudioToggle(index, item.file)} style={styles.playButtonArea}>
            <Ionicons name={isActive && isPlaying ? "pause" : "play"} size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.audioTime}>{formatTime(isActive ? position : 0)} / {formatTime(isActive ? duration : 0)}</Text>

          <Ionicons name="volume-high" size={22} color="#000" />

          {/* 3 DOT MENU */}
          <TouchableOpacity onPress={() => setMenuIndex(index)}>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(position / duration) * 100}%` }]} />
        </View>

        {/* POPUP MENU */}
        {menuIndex === index && (
          <Modal transparent animationType="fade">
            <Pressable style={styles.menuOverlay} onPress={() => setMenuIndex(null)}>
              <View style={styles.menuBox}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => downloadAudio(item.url, item.title)}
                >
                  <Ionicons name="download" size={20} color="#000" />
                  <Text style={styles.menuText}>Download</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}
      </View>
    );
  };

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoCard}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubePlayer height={220} play={false} videoId={item.youtubeId} />
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FFD700" />;

  return (
    <View style={styles.container}>
      {/* TABS */}
      <View style={styles.tabContainer}>
        {["TEXT", "AUDIO", "VIDEO"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === "TEXT" && (
        <FlatList data={infoTitles} renderItem={renderTextItem} keyExtractor={(i, x) => x.toString()} numColumns={2} contentContainerStyle={styles.listContainer} />
      )}

      {selectedTab === "AUDIO" && (
        <FlatList data={audioList} renderItem={renderAudioItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.listContainer} />
      )}

      {selectedTab === "VIDEO" && (
        <FlatList data={videoList} renderItem={renderVideoItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.listContainer} />
      )}
    </View>
  );
};

export default ParayanScreen;

//
// ---------------- STYLES ----------------
//

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7E2C5" },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: "#e6d2a2",
    borderRadius: 20,
  },
  tabButtonActive: { backgroundColor: "#FFD700", elevation: 5 },

  tabText: { fontSize: 16, fontWeight: "700", color: "#5A3E00" },
  tabTextActive: { color: "#fff" },

  listContainer: { paddingBottom: 60 },

  card: {
    width: (width - 60) / 2,
    aspectRatio: 1.2,
    margin: 10,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FFD700",
    elevation: 10,
  },
  cardBackground: { flex: 1, justifyContent: "flex-end", padding: 15 },
  overlay: { padding: 10, borderRadius: 18 },
  cardText: { color: "white", fontSize: 16, fontWeight: "700", textAlign: "center" },

  audioPlayerBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 40,
    padding: 15,
    marginVertical: 10,
    elevation: 4,
  },

  audioTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  playButtonArea: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  audioTime: { flex: 1, color: "#333" },

  progressBar: {
    backgroundColor: "#ccc",
    height: 4,
    marginTop: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: 4, backgroundColor: "#444" },

  videoCard: {
    padding: 15,
    // backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    elevation: 5,
  },
  videoTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  // MENU STYLES
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  menuBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },

  menuItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },

  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
