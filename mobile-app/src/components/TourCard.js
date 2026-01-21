import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { colors } from "../theme/colors";

export default function TourCard({ tour, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground
        source={{ uri: tour.images?.[0] }}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{tour.title}</Text>

          <View style={styles.row}>
            <Text style={styles.sub}>{tour.city}</Text>
            <Text style={styles.sub}>From {tour.price}$</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 170,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 12,
    backgroundColor: colors.overlay,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sub: {
    color: "white",
    fontSize: 12,
  },
});
