import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.top}>
          <Text style={styles.logo}>Eguider</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.small}>Plan your</Text>
          <Text style={styles.big}>Luxurious</Text>
          <Text style={styles.big}>Vacation</Text>

          <Pressable style={styles.btn} onPress={() => router.push("/home")}>
            <Text style={styles.btnText}>Explore</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 20,
    justifyContent: "space-between",
  },
  top: {
    marginTop: 60,
  },
  logo: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
  },
  bottom: {
    marginBottom: 60,
  },
  small: {
    color: "white",
    fontSize: 18,
  },
  big: {
    color: "white",
    fontSize: 38,
    fontWeight: "900",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.75)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "800",
    fontSize: 16,
  },
});
