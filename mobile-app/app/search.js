import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import { useTourStore } from "../src/store/tour.store";
import { colors } from "../src/theme/colors";
import TourCard from "../src/components/TourCard";

export default function SearchScreen() {
  const router = useRouter();
  const { tours } = useTourStore();

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return tours;

    return tours.filter((t) =>
      `${t.title} ${t.city}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, tours]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Search</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* Main Title */}
      <Text style={styles.bigTitle}>Where to?</Text>

      {/* Search input */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search city or tour..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      {/* Quick chips (like Figma categories) */}
      <View style={styles.chipsRow}>
        {["Marrakech", "Agadir", "Chefchaouen", "Desert"].map((city) => (
          <Pressable
            key={city}
            style={styles.chip}
            onPress={() => setQuery(city)}
          >
            <Text style={styles.chipText}>{city}</Text>
          </Pressable>
        ))}
      </View>

      {/* Results */}
      <Text style={styles.resultsText}>Results: {results.length}</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TourCard
            tour={item}
            onPress={() => router.push(`/tour/${item.id}`)}
          />
        )}
      />
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

  bigTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.grayBtn,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 52,
  },

  searchIcon: {
    fontSize: 18,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.border,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },

  resultsText: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },

  list: {
    paddingTop: 14,
    gap: 14,
    paddingBottom: 30,
  },
});
