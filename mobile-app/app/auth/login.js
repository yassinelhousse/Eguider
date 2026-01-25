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
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <Pressable>
          
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.welcomeText}>WELCOME BACK</Text>
      <Text style={styles.bigTitle}>Log In to your Account</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="johnsondoe@nomail.com"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="****************"
            placeholderTextColor="#999"
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>👁</Text>
          </Pressable>
        </View>
      </View>

      {/* Remember me & Forgot Password */}
      <View style={styles.optionsRow}>
        <Pressable
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>

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
          {loading ? "Loading..." : "CONTINUE"}
        </Text>
      </Pressable>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Login Buttons */}
      <Pressable style={styles.socialBtn}>
        <Text style={styles.socialIcon}>G</Text>
        <Text style={styles.socialText}>Log In with Google</Text>
      </Pressable>

      <Pressable style={styles.socialBtn}>
        <Text style={styles.socialIconFb}>f</Text>
        <Text style={styles.socialText}>Log In with Facebook</Text>
      </Pressable>

      <Pressable style={styles.socialBtn}>
        <Text style={styles.socialIconApple}></Text>
        <Text style={styles.socialText}>Log In with Apple</Text>
      </Pressable>

      {/* Signup link */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>New User? </Text>
        <Pressable onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}>SIGN UP HERE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3B82F6",
  },

  codeIcon: {
    fontSize: 16,
    color: "#3B82F6",
  },

  welcomeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    letterSpacing: 1,
  },

  bigTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },

  inputBox: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
  },

  eyeIcon: {
    fontSize: 18,
    color: "#9CA3AF",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: "#9CA3AF",
    borderColor: "#9CA3AF",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  rememberText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },

  mainBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#8B8B8B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  mainBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
  },

  socialBtn: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  socialIcon: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EA4335",
    marginRight: 12,
  },

  socialIconFb: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1877F2",
    marginRight: 12,
  },

  socialIconApple: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginRight: 12,
  },

  socialText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#374151",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  bottomText: {
    color: "#6B7280",
    fontWeight: "400",
    fontSize: 14,
  },

  link: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },
});
