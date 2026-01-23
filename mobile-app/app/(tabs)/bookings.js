import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../../src/api/client";
import { colors } from "../../src/theme/colors";

export default function BookingsScreen() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.log(
        "❌ fetch bookings error:",
        err?.response?.data || err.message,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const getImage = (tour) => {
    if (!tour) return null;

    // If images is array => take first
    if (Array.isArray(tour.images)) return tour.images[0];

    // If images is string => use it
    return tour.images;
  };

  const renderItem = ({ item }) => {
    const tour = item.Tour;
    const img = getImage(tour);

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/tour/${tour?.id}`)}
      >
        <Image
          source={{
            uri:
              img ||
              "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
          }}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.title}>{tour?.title || "Tour"}</Text>
          <Text style={styles.sub}>📍 {tour?.city || "City"}</Text>

          <View style={styles.row}>
            <Text style={styles.date}>📅 {item.date}</Text>
            <Text style={styles.price}>${item.totalPrice}</Text>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading your bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>

      {bookings.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No bookings yet 😅</Text>
          <Text style={styles.emptySub}>
            Book a tour and it will appear here.
          </Text>

          <Pressable
            style={styles.btn}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.btnText}>Explore Tours</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 110 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  header: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
  },

  image: {
    width: 110,
    height: 110,
  },

  info: {
    flex: 1,
    padding: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  sub: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },

  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },

  price: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
  },

  statusRow: {
    marginTop: 8,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.grayBtn,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
    textTransform: "capitalize",
  },

  center: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontWeight: "700",
    color: colors.muted,
  },

  emptyBox: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  emptySub: {
    marginTop: 8,
    color: colors.muted,
    fontWeight: "700",
    textAlign: "center",
  },

  btn: {
    marginTop: 18,
    backgroundColor: colors.black,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
  },

  btnText: {
    color: "#fff",
    fontWeight: "900",
  },
});
