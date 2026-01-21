import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import SearchBar from "../src/components/SearchBar";
import TourCard from "../src/components/TourCard";
import { useTourStore } from "../src/store/tour.store";
import { colors } from "../src/theme/colors";

export default function HomeScreen() {
  const router = useRouter();

  const { tours, loading, error, fetchTours } = useTourStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    if (!search.trim()) return tours;
    return tours.filter((t) =>
      `${t.title} ${t.city}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tours, search]);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable>
          <Text style={styles.icon}>☰</Text>
        </Pressable>

        <Text style={styles.location}>📍 AGADIR</Text>

        <Pressable>
          <Text style={styles.icon}>♡</Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.heading}>GUIDED TOUR</Text>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} onFilterPress={() => {}} />

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading tours...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTours}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TourCard
              tour={item}
              onPress={() => router.push(`/tour/${item.id}`)}
            />
          )}
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
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 10,
  },
  icon: {
    fontSize: 22,
  },
  location: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12,
  },
  list: {
    paddingTop: 14,
    gap: 14,
    paddingBottom: 20,
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
    fontWeight: "700",
  },
});
