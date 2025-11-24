import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";

import axiosInstance from "../apis/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const isSmall = width < 380;
const isTablet = width > 768;

const SuperAdminUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const adminEmailPattern = /^admin[\w\d]*@gmail\.com$/;
  const superadminEmail = "superadmin@gmail.com";

  /** 🔍 FETCH USERS */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token missing");

      const response = await axiosInstance.get("/users/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = response.data.filter(
        (user) =>
          !adminEmailPattern.test(user.email) &&
          user.email !== superadminEmail
      );

      setUsers(filtered);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Unable to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  /** 🗑 DELETE USER */
  const deleteUser = (id, email) => {
    Alert.alert("Confirm Delete", "This action cannot be undone!", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Token missing");

            await axiosInstance.delete(`/users/delete/${email}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert("Success", "User deleted successfully");
            fetchUsers();
          } catch (error) {
            Alert.alert("Error", "Failed to delete user.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) fetchUsers();
  }, [isFocused]);

  /** 🔹 RENDER EACH USER CARD */
  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() =>
            nav.navigate("AdminUpdateUserScreen", { user: item })
          }
        >
          <Icon name="edit" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => deleteUser(item._id, item.email)}
        >
          <Icon name="trash" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  /** 🔄 LOGOUT */
  const logout = () => {
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 🔵 BEAUTIFUL RESPONSIVE HEADER */}
      <LinearGradient
        colors={["#0d1b2a", "#1b263b"]}
        style={[
          styles.header,
          { paddingTop: insets.top + 12, paddingBottom: 15 },
        ]}
      >
        <Text style={styles.headerTitle}>Manage Users</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => nav.navigate("CreateAdminUserScreen")}
          >
            <Icon name="plus" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Icon name="sign-out" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator
          color="#0d6efd"
          size="large"
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id || item.email}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}
    </View>
  );
};

export default SuperAdminUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  /** 🔵 HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },

  headerTitle: {
    fontSize: isSmall ? 20 : 24,
    color: "white",
    fontWeight: "800",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  addBtn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 30,
    marginRight: 12,
  },

  logoutBtn: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 30,
  },

  /** 👤 USER CARD */
  userCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: isSmall ? 12 : 16,
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#0003",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userInfo: { flex: 1 },

  userName: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: "700",
    color: "#333",
  },

  userEmail: {
    fontSize: isSmall ? 13 : 14,
    color: "#777",
    marginTop: 4,
  },

  /** ✏️ ACTION BUTTONS */
  actionButtons: {
    flexDirection: "row",
    marginLeft: 10,
  },

  actionBtn: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },

  editBtn: { backgroundColor: "#0d6efd" },

  deleteBtn: { backgroundColor: "#dc3545" },
});
