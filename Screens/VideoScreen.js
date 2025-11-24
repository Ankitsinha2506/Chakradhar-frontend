
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Fallback placeholder image for failed thumbnail loads
const placeholderImage = "https://via.placeholder.com/1280x720.png?text=Thumbnail+Not+Available";

const videos = [
  {
    id: "1",
    title: "श्रीचक्रधर स्वामी अमृतवाणी",
    thumbnailUri: "https://img.youtube.com/vi/WKkxn9fHA0A/maxresdefault.jpg",
    videoUrl: "https://youtu.be/WKkxn9fHA0A",
  },
  {
    id: "2",
    title: "श्री चक्रधराय नमः । श्री चक्रधर स्वामी नाम जप 108 वेळा",
    thumbnailUri: "https://img.youtube.com/vi/5RnYIHdSyoQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/5RnYIHdSyoQ",
  },
  {
    id: "3",
    title: "त्रिगुणात्मक त्रिमूर्ती आरती",
    thumbnailUri: "https://img.youtube.com/vi/xKoiBlFH8bc/maxresdefault.jpg",
    videoUrl: "https://youtu.be/xKoiBlFH8bc",
  },
  {
    id: "4",
    title: "श्री दत्त जयंती विशेष",
    thumbnailUri: "https://img.youtube.com/vi/q_i99DH65Nk/maxresdefault.jpg",
    videoUrl: "https://youtu.be/q_i99DH65Nk",
  },
  {
    id: "5",
    title: "निघालो घेऊन दत्ताची पालखी",
    thumbnailUri: "https://img.youtube.com/vi/i5Yds3KV-yc/maxresdefault.jpg",
    videoUrl: "https://youtu.be/q_i99DH65Nk",
  },
  {
    id: "6",
    title: "कुठे पाहू तुला भगवंता",
    thumbnailUri: "https://img.youtube.com/vi/nbPi6eiILzQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/nbPi6eiILzQ",
  },
  {
    id: "7",
    title: "श्री चक्रधर स्वामी भजन - सर्वज्ञ श्री चक्रधर",
    thumbnailUri: "https://img.youtube.com/vi/Z3lW1fX1mY/maxresdefault.jpg",
    videoUrl: "https://youtu.be/Z3lW1fX1mY",
  },
  {
    id: "8",
    title: "श्री चक्रधर स्वामी लीळा सिमरण - भाग १",
    thumbnailUri: "https://img.youtube.com/vi/0vY5z3v9kQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/0vY5z3v9kQ",
  },
  {
    id: "9",
    title: "श्री चक्रधर स्वामींचा पाळणा",
    thumbnailUri: "https://img.youtube.com/vi/4J9k2n8mL3w/maxresdefault.jpg",
    videoUrl: "https://youtu.be/4J9k2n8mL3w",
  },
  {
    id: "10",
    title: "श्री चक्रधर स्वामी आरती - महानुभाव पंथ",
    thumbnailUri: "https://img.youtube.com/vi/9pXh7k5vT2Y/maxresdefault.jpg",
    videoUrl: "https://youtu.be/9pXh7k5vT2Y",
  },
  {
    id: "11",
    title: "श्री चक्रधर स्वामी लीळाचरित्र - भाग २",
    thumbnailUri: "https://img.youtube.com/vi/8QwY7z9kL4M/maxresdefault.jpg",
    videoUrl: "https://youtu.be/8QwY7z9kL4M",
  },
  {
    id: "12",
    title: "श्री चक्रधर स्वामी नाम संकीर्तन",
    thumbnailUri: "https://img.youtube.com/vi/vT5mX8jP2Qw/maxresdefault.jpg",
    videoUrl: "https://youtu.be/vT5mX8jP2Qw",
  },
];

const VideoScreen = () => {
  const openYouTubeVideo = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>📺 भक्ती व्हिडिओ</Text> */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => openYouTubeVideo(item.videoUrl)}
            activeOpacity={0.7}
          >
            <ImageBackground
              source={{ uri: item.thumbnailUri || placeholderImage }}
              style={styles.thumbnail}
              imageStyle={styles.imageBackground}
              onError={() => console.log(`Failed to load thumbnail for ${item.title}`)}
            >
              <View style={styles.overlay}>
                <Ionicons
                  name="play-circle"
                  size={60}
                  color="#fff"
                  style={styles.playIcon}
                />
              </View>
            </ImageBackground>
            <View style={styles.textContainer}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5e6", // Warm, soft cream for spiritual vibe
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#b22222", // Rich maroon for divine feel
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "sans-serif-condensed", // Modern yet elegant font
  },
  flatListContent: {
    paddingBottom: 30,
  },
  videoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    opacity: 0.9,
  },
  textContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    fontFamily: "sans-serif",
    lineHeight: 22,
  },
});

export default VideoScreen;