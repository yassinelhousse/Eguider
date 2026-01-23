import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { colors } from "../../src/theme/colors";
import { useAuthStore } from "../../src/store/auth.store";
import { Alert } from "react-native";


export default function LoginScreen() {
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Login</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* Title */}
      <Text style={styles.bigTitle}>Welcome Back</Text>
      <Text style={styles.subTitle}>Login to continue your journey</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          placeholderTextColor={colors.muted}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          placeholderTextColor={colors.muted}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Forgot */}
      <Pressable style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </Pressable>

      {/* Login Button */}
      <Pressable
        style={[styles.mainBtn, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={async () => {
          const ok = await login(email, password);

          if (ok) {
            Alert.alert("✅ Success", "Logged in successfully!");
            router.replace("/(tabs)/home");
          } else {
            Alert.alert("❌ Error", "Invalid email or password");
          }
        }}
      >
        <Text style={styles.mainBtnText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </Pressable>

      {/* Signup link */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Don’t have an account?</Text>
        <Pressable onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}> Sign up</Text>
        </Pressable>
      </View>
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
    marginBottom: 20,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  bigTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
  },

  subTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
    marginBottom: 18,
  },

  label: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },

  inputBox: {
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.grayBtn,
    paddingHorizontal: 14,
    justifyContent: "center",
  },

  input: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 18,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },

  mainBtn: {
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },

  mainBtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  bottomText: {
    color: colors.muted,
    fontWeight: "600",
  },

  link: {
    color: colors.text,
    fontWeight: "900",
  },
});
