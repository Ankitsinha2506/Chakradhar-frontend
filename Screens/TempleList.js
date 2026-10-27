import FramedImage from "../ui/FramedImage";
import { colors, useLayout } from "../ui/theme";
import { InteractiveCard } from "../ui/Motion";
import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const templeData = [
  {
    name: "Chakradhar Swami Temple, Surat",
    location: "Surat, Gujarat",
    significance:
      "One of the most prominent temples dedicated to Chakradhar Swami, this temple attracts a lot of devotees, especially during his birth anniversary and religious occasions.",
    image: "https://surattourism.in/images/places-to-visit/header/swami-narayan-temple-surat-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    latitude: 21.1702,
    longitude: 72.8311,
    hotels: [
      { name: "The Gateway Hotel Surat", rating: 4.2 },
      { name: "Fortune Palace Hotel", rating: 4.0 },
      { name: "Hotel Sifat International", rating: 3.8 },
      { name: "Lemon Tree Hotel Surat", rating: 4.1 },
      { name: "Hotel Suba Elite Surat", rating: 3.9 },
      { name: "The Grand Bhagwati Surat", rating: 4.4 },
      { name: "Surat Marriott Hotel", rating: 4.5 },
      { name: "TGB Surat", rating: 4.3 },
      { name: "Hotel Prestige", rating: 3.7 },
      { name: "Vyara Royal Hotel", rating: 3.6 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Rajkot",
    location: "Rajkot, Gujarat",
    significance:
      "This temple is a center of spiritual learning and worship for followers of Chakradhar Swami. It is known for its peaceful atmosphere and religious celebrations.",
    image: "https://www.baps.org/Data/Sites/1/Media/GalleryImages/30385/WebImages/2024_06_24_001_Rajkot.jpg",
    latitude: 22.3039,
    longitude: 70.8022,
    hotels: [
      { name: "The Fern Residency Rajkot", rating: 4.2 },
      { name: "PARKINN by Radisson Rajkot", rating: 4.1 },
      { name: "Hotel Crystal", rating: 3.9 },
      { name: "Rajkot Continental Hotel", rating: 4.3 },
      { name: "Hotel Metro", rating: 3.8 },
      { name: "The Imperial Palace", rating: 4.0 },
      { name: "Hotel Kailsagar", rating: 3.7 },
      { name: "Hotel Saurabh", rating: 4.4 },
      { name: "The Royal Orchid", rating: 4.5 },
      { name: "JMC International Hotel", rating: 3.6 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Gondia",
    location: "Gondia, Maharashtra",
    significance: "This temple is dedicated to Chakradhar Swami, the founder of the Mahanubhava sect. It is known for its impressive architecture and serene atmosphere, making it a significant spiritual center for devotees.",
    image: "https://templesofindia.org/assets/compressed/c913f8df2fdcb28d461a1063967d45ec_4837.jpg",
    latitude: 21.4606,
    longitude: 80.1995,
    hotels: [
      { name: "Hotel Dattaguru", rating: 3.8 },
      { name: "Hotel Raj Mahal", rating: 3.7 },
      { name: "Hotel Kuber", rating: 3.6 },
      { name: "Hotel Shree", rating: 3.5 },
      { name: "Hotel Pandit", rating: 3.9 },
      { name: "Vithal Rukmini Hotel", rating: 4.0 },
      { name: "Shree Balaji Lodge", rating: 3.4 },
      { name: "Hotel Vaishali", rating: 3.6 },
      { name: "Sagar Hotel", rating: 3.5 },
      { name: "Hotel Ganesh", rating: 3.7 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Jalicha Dev",
    location: "Buldhana, Maharashtra",
    significance: "Located in Buldhana, this temple is an important pilgrimage site for followers of the Mahanubhava sect. The annual yatra held here in January attracts numerous devotees who participate in various religious activities.",
    image: "https://utsav.gov.in/public/uploads/event_cover_image/event_1285/16639306321742554375.jpg",
    latitude: 20.5275,
    longitude: 76.2046,
    hotels: [
      { name: "Hotel Shree Krishna", rating: 3.8 },
      { name: "Hotel Shubham", rating: 3.7 },
      { name: "Hotel Chhatrapati", rating: 3.6 },
      { name: "Hotel Sagar", rating: 3.5 },
      { name: "Hotel Vaishali", rating: 3.9 },
      { name: "Hotel Ashirwad", rating: 3.8 },
      { name: "Radhika Hotel", rating: 3.6 },
      { name: "Hotel Krishna", rating: 3.7 },
      { name: "Hotel Guru", rating: 3.5 },
      { name: "Sai Krupa Hotel", rating: 3.6 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Donkhamb Cave",
    location: "Chattrapati SambhajiNagar, Maharashtra",
    significance: "Situated near the Donkhamb caves in Aurangabad, this temple offers a unique blend of spirituality and natural beauty. The serene environment makes it a peaceful retreat for devotees.",
    image: "https://files.yappe.in/place/full/donkhamb-cave-chakradhar-swami-temple-10375520.webp",
    latitude: 19.8792,
    longitude: 75.2128,
    hotels: [
      { name: "Taj Vivanta Aurangabad", rating: 4.5 },
      { name: "Hotel Noor Mahal", rating: 4.2 },
      { name: "The Ambassador Ajanta", rating: 4.0 },
      { name: "ITC Grand Maratha", rating: 4.3 },
      { name: "Keys Prima Hotel", rating: 3.8 },
      { name: "Lemon Tree Hotel", rating: 4.1 },
      { name: "The Meadows Resort", rating: 3.9 },
      { name: "VITS Aurangabad", rating: 4.0 },
      { name: "Shree Datta International", rating: 3.7 },
      { name: "Hotel Kailas", rating: 3.8 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Nashik",
    location: "Nashik, Maharashtra",
    significance: "This temple in Nashik is dedicated to Chakradhar Swami and is known for its historical significance and architectural beauty. It serves as a center for spiritual learning and worship.",
    image: "https://content.jdmagicbox.com/v2/comp/nashik/j4/0253px253.x253.200323212105.x1j4/catalogue/sarvadnya-shree-chakradhar-swami-mandir-gangapur-nashik-temples-hfcuIQMPQa.jpg",
    latitude: 20.0105,
    longitude: 73.7746,
    hotels: [
      { name: "The Gateway Hotel Nashik", rating: 4.3 },
      { name: "Hotel Express Inn", rating: 4.0 },
      { name: "Ibis Nashik", rating: 4.1 },
      { name: "Soma Vine Village", rating: 4.4 },
      { name: "Grape City Hotel", rating: 3.8 },
      { name: "Daisy Suites", rating: 4.0 },
      { name: "VIVA Nashik", rating: 3.9 },
      { name: "Holiday Inn Express Nashik", rating: 4.2 },
      { name: "Fifth Avenue", rating: 3.7 },
      { name: "Sadhana Village", rating: 4.1 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Pachora",
    location: "Pachora, Maharashtra",
    significance: "Located in Pachora, this temple is a significant site for followers of the Mahanubhava sect. It is known for its peaceful atmosphere and religious celebrations.",
    image: "https://files.yappe.in/place/full/shree-chakradhar-swami-mahanubhav-panth-temple-pachora-sthan-6335911.webp",
    latitude: 20.5934,
    longitude: 75.4594,
    hotels: [
      { name: "Hotel Satkar", rating: 3.9 },
      { name: "Hotel Shubham", rating: 3.7 },
      { name: "Sagar Hotel", rating: 3.8 },
      { name: "Jayshree Hotel", rating: 3.5 },
      { name: "Hotel Shree Ganesh", rating: 3.6 }
    ],
  },
  {
    name: "Chakradhar Swami Temple, Nagpur",
    location: "Nagpur, Maharashtra",
    significance: "This temple in Nagpur serves as a significant religious hub for the Mahanubhava sect, offering daily prayers, discourses, and special celebrations during major festivals.",
    image: "https://files.yappe.in/place/full/shri-chakradhar-swami-mandir-datt-mandir-4752846.webp",
    latitude: 21.1458,
    longitude: 79.0882,
    hotels: [
      { name: "Radisson Blu Hotel", rating: 4.5 },
      { name: "Hotel Hardeo", rating: 4.0 },
      { name: "Hotel Centre Point", rating: 4.1 },
      { name: "Le Méridien Nagpur", rating: 4.3 },
      { name: "Tuli Imperial", rating: 4.2 },
      { name: "Hotel Orange City", rating: 3.9 },
      { name: "Hotel Orient Taibah", rating: 3.8 },
      { name: "Hotel LB", rating: 3.7 },
      { name: "Hotel Woodlands", rating: 3.6 },
      { name: "Hotel Rahul Deluxe", rating: 3.5 }
    ]
  },
  {
    name: "Chakradhar Swami Temple, Amravati",
    location: "Amravati, Maharashtra",
    significance: "Located in Amravati, this temple is a revered place of worship for followers of Chakradhar Swami and is popular for its peaceful surroundings and sacred rituals.",
    image: "https://www.poojn.in/wp-content/uploads/2025/05/Chakradhar-Swami-Temples-A-2025-Guide-to-Pilgrimage-Sites.jpeg.jpg",
    latitude: 20.9374,
    longitude: 77.7796,
    hotels: [
      { name: "Hotel Shripad Continental", rating: 4.0 },
      { name: "Hotel Mehfil Inn", rating: 4.2 },
      { name: "Hotel Regency", rating: 3.9 },
      { name: "Hotel Neelam", rating: 3.8 },
      { name: "Hotel Excel Executive", rating: 4.1 },
      { name: "Hotel Harshawardhan", rating: 3.7 },
      { name: "Hotel Gauri Inn", rating: 3.6 },
      { name: "Hotel Surya", rating: 3.5 },
      { name: "Hotel Shyam", rating: 3.6 },
      { name: "Hotel Amba Inn", rating: 3.7 }
    ]
  }

];


const TempleListScreen = () => {
  const navigation = useNavigation();
  const { cardWidth, padding } = useLayout();
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ width: '100%', maxWidth: 1200, alignSelf: 'center', paddingHorizontal: padding, paddingVertical: 24 }}>
    <Text style={{ fontSize: 28, fontWeight: '700', color: colors.ink, marginBottom: 8 }}>पवित्र स्थळे</Text>
    <Text style={{ color: colors.muted, lineHeight: 24, marginBottom: 24 }}>Explore temples and plan your next visit.</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {templeData.map(temple => <InteractiveCard key={temple.name} accessibilityLabel={temple.name} onPress={() => navigation.navigate('TempleMapInfo', { temple })} style={[styles.card, { width: cardWidth }]}>
        <FramedImage source={{ uri: temple.image }} height={190} />
        <View style={styles.textContainer}><Text numberOfLines={2} style={styles.name}>{temple.name}</Text><Text numberOfLines={2} style={styles.location}>{temple.location}</Text><Text style={styles.significance} numberOfLines={3}>{temple.significance}</Text></View>
      </InteractiveCard>)}
    </View>
  </ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F7E2C5",
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9E0D5",

    overflow: "hidden",
    elevation: 1,

    shadowColor: "#E9E0D5",
    shadowOffset: { width: 0, height: 10 },
  },

  image: {
    width: "100%",
    height: 200,
  },

  textContainer: {
    padding: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5A3E00",
    marginBottom: 6,
    textShadowColor: "#E9E0D5",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
  },

  location: {
    fontSize: 15,
    color: "#8c6e32",
    marginBottom: 5,
  },

  significance: {
    fontSize: 14,
    color: "#5C3D2E",
    lineHeight: 20,
  },

  glowLayer: {
  ...StyleSheet.absoluteFillObject,
  borderRadius: 20,
  borderWidth: 4,
  borderColor: "#E9E0D5",
  opacity: 0,
},

});

export default TempleListScreen;
