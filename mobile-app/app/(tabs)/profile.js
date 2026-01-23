import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../src/theme/colors";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sub}>UI only for now ✅</Text>

      <Pressable style={styles.btn} onPress={() => router.push("/auth/login")}>
        <Text style={styles.btnText}>Go to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
  },
  sub: {
    marginTop: 8,
    color: colors.muted,
    fontWeight: "600",
  },
  btn: {
    marginTop: 20,
    backgroundColor: colors.black,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "900",
  },
});
