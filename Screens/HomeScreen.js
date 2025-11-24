import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

import MantraList from "../Components/MantraList";
import HomeBanner from "../Components/HomeBanner";
import HomeTitle from "../Components/HomeTitle";
import SanskritShlokas from "../Components/SanskritShlokas";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }} // ✔ TabBar Safe Area
      >
        <HomeTitle />

        <HomeBanner />

        <SanskritShlokas />

        <View style={styles.mantraWrapper}>
          <MantraList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E2C5",
  },
  scrollView: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  mantraWrapper: {
    marginTop: 10,
  },
});

export default HomeScreen;
