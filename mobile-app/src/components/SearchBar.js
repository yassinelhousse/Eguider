import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function SearchBar({ value, onChange, onFilterPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
      </View>

      <Pressable onPress={onFilterPress} style={styles.filterBtn}>
        <Text style={styles.filterIcon}>⚙️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  inputBox: {
    flex: 1,
    backgroundColor: colors.grayBtn,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    color: colors.text,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.grayBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    fontSize: 18,
  },
});
