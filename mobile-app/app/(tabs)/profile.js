import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";
import { colors } from "../../src/theme/colors";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || "Unknown"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "Unknown"}</Text>
      </View>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
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
    paddingBottom: 110,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.grayBtn,
    borderRadius: 18,
    padding: 16,
  },
  label: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "800",
    color: colors.muted,
  },
  value: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },
  logoutBtn: {
    marginTop: 20,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
  },
});
