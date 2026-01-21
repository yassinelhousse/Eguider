import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

import { api } from "../src/api/client";
import { colors } from "../src/theme/colors";
import { create } from "zustand";

// ✅ simple zustand store inside this file (later we move it to src/store)
const useBookingStore = create((set) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/bookings");
      set({ bookings: res.data, loading: false });
    } catch (err) {
      set({ loading: false, error: err?.message || "Failed to load bookings" });
    }
  },
}));

export default function BookingsScreen() {
  const router = useRouter();
  const { bookings, loading, error, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Bookings</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* Loading */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No bookings yet 📭</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const tour = item.Tour;
            const image = tour?.images?.[0];

            return (
              <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />

                <View style={styles.info}>
                  <Text style={styles.cardTitle}>{tour?.title || "Tour"}</Text>

                  <Text style={styles.sub}>
                    📅 {item.date} • 📍 {tour?.city || "City"}
                  </Text>

                  <View style={styles.rowBetween}>
                    <Text style={styles.price}>${item.totalPrice}</Text>

                    <View
                      style={[
                        styles.badge,
                        item.status === "pending"
                          ? styles.badgePending
                          : styles.badgeOther,
                      ]}
                    >
                      <Text style={styles.badgeText}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.grayBtn,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 20,
    fontWeight: "900",
  },

  title: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  list: {
    paddingTop: 10,
    gap: 14,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  image: {
    width: 90,
    height: 90,
  },

  info: {
    flex: 1,
    padding: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  sub: {
    marginTop: 6,
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },

  rowBetween: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgePending: {
    backgroundColor: "#F2F2F2",
  },

  badgeOther: {
    backgroundColor: "#EAEAEA",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text,
    textTransform: "capitalize",
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

  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted,
  },
});
