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
      source={require("../assets/images/Rectangle.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View>
          <Pressable
            style={styles.btnlogin}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.btnloginText}>Login</Text>
          </Pressable>
        </View>
        

        <View style={styles.bottom}>
        <View style={styles.font}>
          <Text style={styles.small}>Plan your</Text>
          <Text style={styles.big}>Luxurious</Text>
          <Text style={styles.big}>Vacation</Text>
        </View>

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
    justifyContent: "center",
    
   

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
    backgroundColor: "#8B8B8B",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "800",
    fontSize: 16,
  },
  btnlogin: {
    alignSelf: "flex-end",
    backgroundColor: "#8B8B8B",
    padding: 10,
    borderRadius: 14,
    marginTop: 15,
  },
  btnloginText: {
    fontWeight: "800",
    fontSize: 14,
  },
  font:{
    marginBottom: 100,
    fontSize: 8,
  }

});
