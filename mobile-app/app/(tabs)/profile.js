import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";
import { colors } from "../../src/theme/colors";

export default function ProfileScreen() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
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

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "#FF3B30";
      case "guide":
        return "#007AFF";
      default:
        return "#34C759";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
          </View>
          <View
            style={[
              styles.roleBadge,
              { backgroundColor: getRoleBadgeColor(user?.role) },
            ]}
          >
            <Text style={styles.roleBadgeText}>
              {user?.role?.toUpperCase() || "USER"}
            </Text>
          </View>
        </View>

        <Text style={styles.userName}>{user?.name || "Unknown User"}</Text>
        <Text style={styles.userEmail}>
          {user?.email || "no-email@example.com"}
        </Text>
      </View>

      {/* Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>👤</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.name || "Not set"}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>✉️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{user?.email || "Not set"}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Text style={styles.infoIcon}>🎫</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Account Type</Text>
              <Text style={styles.infoValue}>{user?.role || "User"}</Text>
            </View>
          </View>
        </View>
      </View>


      {/* Logout Button */}
      <Pressable
        style={({ pressed }) => [
          styles.logoutBtn,
          pressed && styles.logoutBtnPressed,
        ]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutIcon}></Text>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.text,
  },

  // Profile Card
  profileCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "900",
    color: "white",
  },

  roleBadge: {
    position: "absolute",
    bottom: 0,
    right: -4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "white",
  },

  roleBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "white",
    letterSpacing: 0.5,
  },

  userName: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
  },

  // Section
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12,
  },

  // Info Card
  infoCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  infoIcon: {
    fontSize: 20,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },

  divider: {
    height: 1,
    backgroundColor: colors.bg,
    marginHorizontal: 16,
  },

  // Menu Items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },

  menuItemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  menuIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  menuIcon: {
    fontSize: 22,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 2,
  },

  menuSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },

  menuChevron: {
    fontSize: 28,
    fontWeight: "300",
    color: colors.muted,
  },

  // Logout Button
  logoutBtn: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF3B30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  logoutBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  versionText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: colors.muted,
    marginBottom: 40,
    marginTop: 8,
  },
});
