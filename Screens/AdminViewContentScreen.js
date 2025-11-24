import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmall = width < 380;

const AdminViewContentScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const sections = [
    { title: "Parayan", screen: "ParayanAdminScreen" },
    { title: "Aarti Sangrah", screen: "AartiSangrahScreenAdminScreen" },
    { title: "Bhajan Sangrah", screen: "BhajanSangrahScreenAdmin" },
    { title: "Dev Puja", screen: "DevPujaScreenAdmin" },
    { title: "Panchakrushna", screen: "PanchakrushnaScreenAdmin" },
    { title: "Bhagvat Gita", screen: "BhagvatGitaAdminScreen" },
  ];

  return (
    <View style={styles.container}>
      
      <LinearGradient
        colors={["#6a11cb", "#2575fc"]}
        style={[
          styles.header,
          { paddingTop: insets.top + 14, paddingBottom: 18 },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={22} color="white" />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { fontSize: isSmall ? 20 : 24 }]}>
          Manage Content
        </Text>
      </LinearGradient>

      <Text style={[styles.subText, { fontSize: isSmall ? 14 : 16 }]}>
        Select a section to update content
      </Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {sections.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminViewContentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomLeftRadius: width * 0.06,
    borderBottomRightRadius: width * 0.06,
    elevation: 8,
  },

  backButton: {
    padding: 10,
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 50,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "800",
  },

  subText: {
    textAlign: "center",
    marginVertical: 16,
    color: "#444",
  },

  scroll: { paddingBottom: 120 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },

  card: {
    width: "46%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: "center",
    elevation: 4,
  },

  cardText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
});
