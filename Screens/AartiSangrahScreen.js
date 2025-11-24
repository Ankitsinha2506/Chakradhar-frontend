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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../apis/axiosInstance";
import YoutubePlayer from "react-native-youtube-iframe";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const imageSources = [
  require("../assets/palna1.jpg"),
  require("../assets/after.jpg"),
  require("../assets/hinid1.jpg"),
  require("../assets/sunrise1.jpg"),
  require("../assets/eve22.jpg"),
  require("../assets/night.jpeg"),
  require("../assets/chakrapaniimages.jpeg"),
  require("../assets/dattatrey1.jpg"),
  require("../assets/krushna07.jpg"),
  require("../assets/Govind.png"),
];

const AartiSangrahScreen = () => {
  const navigation = useNavigation();
  const [infoTitles, setInfoTitles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTab, setSelectedTab] = useState("TEXT");

  // AUDIO PLAYER STATE
  const soundRef = useRef(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dummy Audio list
  const audioList = [
    { title: "Aarti Audio 1", file: require("../assets/audios/Aarti.mp3") },
    { title: "Aarti Audio 2", file: require("../assets/audios/Aarti.mp3") },
  ];

  // Dummy Video List
  const videoList = [
    { title: "Aarti Video 1", youtubeId: "FkopR6dA5wE" },
    { title: "Aarti Video 2", youtubeId: "l482T0yNkeo" },
  ];

  const handlePress = (infoTitle) => {
    navigation.navigate("AartiSunInfoScreen", { infoTitle });
  };

  // Fetch text titles
  useEffect(() => {
    const fetchInfoTitles = async () => {
      try {
        const response = await axiosInstance.get("/users/aartiInfoTile");
        setInfoTitles(response.data || []);
      } catch (err) {
        setError("Error fetching Aarti titles");
      }
      setLoading(false);
    };
    fetchInfoTitles();
  }, []);

  // Cleanup audio on tab change
  useEffect(() => {
    if (selectedTab !== "AUDIO") {
      cleanupSound();
    }
  }, [selectedTab]);

  useEffect(() => {
    return () => {
      cleanupSound();
    };
  }, []);

  const cleanupSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch {}
      soundRef.current = null;
    }
    setCurrentAudioIndex(null);
    setIsPlaying(false);
  };

  const handleAudioToggle = async (index, file) => {
    try {
      // If same and playing ==> pause
      if (currentAudioIndex === index && isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        return;
      }

      // Same but paused ==> resume
      if (currentAudioIndex === index && !isPlaying) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        return;
      }

      // New audio
      cleanupSound();
      const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
      soundRef.current = sound;
      setCurrentAudioIndex(index);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status?.didJustFinish) cleanupSound();
      });
    } catch (e) {
      console.log("Audio Error:", e);
    }
  };

  const renderTextItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
      <ImageBackground
        source={imageSources[index % imageSources.length]}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
          style={styles.overlay}
        >
          <Text style={styles.cardText}>{item || "No Title"}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

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
          size={45}
          color="#D4A017"
        />
      </TouchableOpacity>
    </View>
  );

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <YoutubePlayer height={220} play={false} videoId={item.youtubeId} />
    </View>
  );

  if (loading) return <ActivityIndicator size="large" />;

  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      
      {/* TABS */}
      <View style={styles.tabContainer}>
        {["TEXT", "AUDIO", "VIDEO"].map((tab) => {
          const active = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, active && styles.activeTabButton]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* TEXT GRID */}
      {selectedTab === "TEXT" && (
        <FlatList
          data={infoTitles}
          renderItem={renderTextItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* AUDIO LIST */}
      {selectedTab === "AUDIO" && (
        <FlatList
          data={audioList}
          renderItem={renderAudioItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* VIDEO LIST */}
      {selectedTab === "VIDEO" && (
        <FlatList
          data={videoList}
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default AartiSangrahScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7E2C5" },
  listContainer: { padding: 10 },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e6d2a2",
  },

  activeTabButton: { backgroundColor: "#d4a017" },

  tabText: { fontSize: 16, fontWeight: "600", color: "#333" },
  activeTabText: { color: "#fff" },

  // TEXT CARDS
  card: {
    width: (width - 60) / 2,
    aspectRatio: 1.1,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 8,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  cardBackground: { flex: 1, justifyContent: "flex-end", padding: 15 },
  overlay: { padding: 10, alignItems: "center" },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  // AUDIO CARD
  audioCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: 15,
  marginVertical: 10,
  borderRadius: 30,
  borderWidth: 3,
  borderColor: "#FFD700",   // Golden border like TEXT CARD
  elevation: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},

  audioTitle: { fontSize: 18, fontWeight: "700" },

  // VIDEO card
  videoContainer: {
    // backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  videoTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
});
