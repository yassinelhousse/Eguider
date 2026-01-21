import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "../../src/api/client";
import { colors } from "../../src/theme/colors";

const { width } = Dimensions.get("window");

export default function TourDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [tour, setTour] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTour = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/tours/${id}`);
      setTour(res.data);
    } catch (err) {
      console.log("❌ Tour details error:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  const onScrollImages = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading tour...</Text>
      </View>
    );
  }

  if (!tour) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Tour not found ❌</Text>
      </View>
    );
  }

  const images = tour.images?.length ? tour.images : [tour.images?.[0]];

  return (
    <View style={styles.container}>
      {/* Top Image Slider */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollImages}
          scrollEventThrottle={16}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Back Button */}
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        {/* Dots */}
        <View style={styles.dots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{tour.title}</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.city}>📍 {tour.city}</Text>
          <Text style={styles.price}>${tour.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rating}>⭐ 4.8</Text>
          <Text style={styles.muted}>• {tour.durationHours || 4} hours</Text>
          <Text style={styles.muted}>• Guided</Text>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {tour.description || "No description available."}
        </Text>

        <View style={styles.guideBox}>
          <Text style={styles.guideTitle}>Guide</Text>
          <Text style={styles.guideName}>
            {tour.User?.name || "Unknown guide"}
          </Text>
        </View>

        {/* BOOK Button */}
        <Pressable
          style={styles.bookBtn}
          onPress={() => router.push(`/booking/${tour.id}`)}
        >
          <Text style={styles.bookText}>BOOK</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  imageContainer: {
    height: 420,
    backgroundColor: "#000",
  },

  image: {
    width: width,
    height: 420,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 20,
    fontWeight: "900",
  },

  dots: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },

  dotActive: {
    backgroundColor: "white",
    width: 18,
  },

  dotInactive: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 18,
    marginTop: -30, // overlap like Figma
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  city: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "600",
  },

  price: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  rating: {
    fontSize: 14,
    fontWeight: "800",
  },

  muted: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },

  guideBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.grayBtn,
  },

  guideTitle: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },

  guideName: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  bookBtn: {
    marginTop: 18,
    backgroundColor: colors.black,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  bookText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: colors.muted,
  },

  errorText: {
    color: "red",
    fontWeight: "800",
  },
});
