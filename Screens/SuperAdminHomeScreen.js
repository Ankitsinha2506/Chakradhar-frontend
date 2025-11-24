import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Vibration,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmall = width < 380;
const isTablet = width >= 768;

const cardWidth = isTablet ? "30%" : isSmall ? "100%" : "47%";

const SuperAdminHomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      title: "Manage Users",
      icon: "people-outline",
      screen: "SuperAdminUserScreen",
      gradient: ["#1e3c72", "#2a5298"],
    },
    {
      title: "Manage Admins",
      icon: "shield-checkmark-outline",
      screen: "SuperAdminUserAdminScreen",
      gradient: ["#134e5e", "#71b280"],
    },
    {
      title: "View Contents",
      icon: "document-text-outline",
      screen: "AdminViewContentScreen",
      gradient: ["#780206", "#061161"],
    },
  ];

  const logout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={["#0d1b2a", "#1b263b"]}
        style={[
          styles.header,
          {
            paddingTop: insets.top + (isSmall ? 10 : 18),
            paddingBottom: 14,
          },
        ]}
      >
        <Pressable
          style={styles.backButton}
          onPress={logout}
        >
          <Ionicons
            name="log-out"
            size={isSmall ? 22 : 26}
            color="#fff"
          />
        </Pressable>

        <Text style={[styles.headerTitle, { fontSize: isSmall ? 20 : 24 }]}>
          Super Admin Dashboard
        </Text>
      </LinearGradient>

      {/* Welcome */}
      <Text style={[styles.welcomeText, { fontSize: isSmall ? 22 : 26 }]}>
        Welcome, Super Admin 👋
      </Text>

      <Text style={[styles.subtitle, { fontSize: isSmall ? 14 : 16 }]}>
        Select a section to manage
      </Text>

      {/* GRID */}
      <View style={styles.gridContainer}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (Platform.OS !== "web") Vibration.vibrate(40);
              navigation.navigate(item.screen);
            }}
            style={[styles.cardWrapper, { width: cardWidth }]}
          >
            <LinearGradient colors={item.gradient} style={styles.card}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    width: isSmall ? 60 : 72,
                    height: isSmall ? 60 : 72,
                    borderRadius: isSmall ? 30 : 36,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={isSmall ? 28 : 36}
                  color="#fff"
                />
              </View>

              <Text
                style={[
                  styles.cardTitle,
                  { fontSize: isSmall ? 15 : 17 },
                ]}
              >
                {item.title}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={isSmall ? 20 : 24}
                color="rgba(255,255,255,0.7)"
                style={styles.arrow}
              />
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default React.memo(SuperAdminHomeScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8faff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomLeftRadius: width * 0.06,
    borderBottomRightRadius: width * 0.06,
    elevation: 10,
  },

  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginRight: 12,
  },

  headerTitle: { fontWeight: "800", color: "#fff", flex: 1, textAlign: "center" },

  welcomeText: {
    textAlign: "center",
    marginTop: 26,
    color: "#1b263b",
    fontWeight: "800",
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginTop: 6,
    marginBottom: 20,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
  },

  cardWrapper: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },

  card: {
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
  },

  iconCircle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },

  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  arrow: {
    position: "absolute",
    bottom: 22,
    right: 10,
  },
});
