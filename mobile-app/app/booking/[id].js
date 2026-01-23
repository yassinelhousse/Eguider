import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";

import { api } from "../../src/api/client";
import { colors } from "../../src/theme/colors";

export default function BookingFormScreen() {
  const { id } = useLocalSearchParams(); // tourId
  const router = useRouter();

  const [tour, setTour] = useState(null);
  const [loadingTour, setLoadingTour] = useState(true);

  // form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("1");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // Fetch tour info (to show title + price)
  const fetchTour = async () => {
    try {
      setLoadingTour(true);
      const res = await api.get(`/tours/${id}`);
      setTour(res.data);
    } catch (err) {
      console.log("❌ booking fetch tour error:", err?.message);
    } finally {
      setLoadingTour(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  // Convert Date -> YYYY-MM-DD for backend DATEONLY
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event, selectedDate) => {
    // Android: event.type === "dismissed" if canceled
    if (Platform.OS === "android") setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    // Simple validations
    if (!fullName.trim()) return Alert.alert("Missing", "Enter your name");
    if (!phone.trim()) return Alert.alert("Missing", "Enter your phone");
    if (!email.trim()) return Alert.alert("Missing", "Enter your email");

    const guestsNumber = Number(guests);
    if (!guestsNumber || guestsNumber < 1) {
      return Alert.alert("Invalid", "Guests must be 1 or more");
    }

    try {
      setSubmitting(true);

      // MVP: hardcoded userId = 1
      const payload = {
        
        tourId: Number(id),
        date: formatDate(date),
      };

      await api.post("/bookings", payload);

      Alert.alert(
        "✅ Booking Created",
        "Your booking has been created successfully!",
        [
          { text: "View Tours", onPress: () => router.push("/(tabs)/home") },
          { text: "Stay Here", style: "cancel" },
        ],
      );


    } catch (err) {
      console.log("❌ booking submit error:", err?.message);
      Alert.alert("❌ Error", "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTour) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading booking form...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Booking Form</Text>

        <View style={{ width: 42 }} />
      </View>

      {/* Tour info */}
      <View style={styles.tourBox}>
        <Text style={styles.tourTitle}>{tour?.title || "Tour"}</Text>
        <Text style={styles.tourSub}>📍 {tour?.city}</Text>
        <Text style={styles.tourPrice}>Total: ${tour?.price}</Text>
      </View>

      {/* Date */}
      <Text style={styles.label}>Date</Text>
      <Pressable
        style={styles.inputBox}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.inputText}>{formatDate(date)}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}

      {/* Guests */}
      <Text style={styles.label}>Guests</Text>
      <View style={styles.guestsRow}>
        <Pressable
          style={styles.counterBtn}
          onPress={() => {
            const n = Number(guests) || 1;
            if (n > 1) setGuests(String(n - 1));
          }}
        >
          <Text style={styles.counterText}>−</Text>
        </Pressable>

        <View style={styles.guestsBox}>
          <Text style={styles.guestsValue}>{guests}</Text>
        </View>

        <Pressable
          style={styles.counterBtn}
          onPress={() => {
            const n = Number(guests) || 1;
            setGuests(String(n + 1));
          }}
        >
          <Text style={styles.counterText}>+</Text>
        </Pressable>
      </View>

      {/* Name */}
      <Text style={styles.label}>Full Name</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
      </View>

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+212 ..."
          placeholderTextColor={colors.muted}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

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

      {/* Continue */}
      <Pressable
        style={[styles.continueBtn, submitting && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.continueText}>
          {submitting ? "Booking..." : "Continue"}
        </Text>
      </Pressable>
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  tourBox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  tourTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  tourSub: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },

  tourPrice: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
  },

  label: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },

  inputBox: {
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.grayBtn,
    paddingHorizontal: 14,
    justifyContent: "center",
  },

  input: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  inputText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  guestsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  counterBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.grayBtn,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    fontSize: 22,
    fontWeight: "900",
  },

  guestsBox: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  guestsValue: {
    fontSize: 16,
    fontWeight: "900",
  },

  continueBtn: {
    marginTop: 18,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
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
});
