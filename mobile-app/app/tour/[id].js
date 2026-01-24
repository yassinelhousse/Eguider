import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "../../src/api/client";
import { colors } from "../../src/theme/colors";

const { width } = Dimensions.get("window");

export default function TourDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [tour, setTour] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // reviews
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sendingReview, setSendingReview] = useState(false);

  const fetchTour = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/tours/${id}`);
      setTour(res.data);
    } catch (err) {
      console.log("❌ Tour details error:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/tour/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log(
        "❌ fetch reviews error:",
        err?.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchTour();
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    try {
      if (!rating || rating < 1 || rating > 5) {
        return Alert.alert("❌ Invalid", "Please select a rating");
      }

      if (!comment.trim()) {
        return Alert.alert("❌ Invalid", "Please write a comment");
      }

      setSendingReview(true);

      await api.post("/reviews", {
        tourId: Number(id),
        rating: rating,
        comment,
      });

      Alert.alert("✅ Success", "Review added!");
      setComment("");
      setRating(5);

      fetchReviews();
    } catch (err) {
      console.log(
        "❌ submit review error:",
        err?.response?.data || err.message,
      );
      Alert.alert("❌ Error", "Failed to add review");
    } finally {
      setSendingReview(false);
    }
  };

  const onScrollImages = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setActiveIndex(index);
  };

  const renderStars = (currentRating, onPress) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => onPress && onPress(star)}
            disabled={!onPress}
          >
            <Text style={styles.starIcon}>
              {star <= currentRating ? "★" : "☆"}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading tour...</Text>
      </View>
    );
  }

  if (!tour) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Tour not found ❌</Text>
      </View>
    );
  }

  const images = Array.isArray(tour.images) ? tour.images : [tour.images];

  return (
    <ScrollView style={styles.container}>
      {/* Top Image Slider */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollImages}
          scrollEventThrottle={16}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Back Button */}
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        {/* Dots */}
        <View style={styles.dots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                activeIndex === i ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{tour.title}</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.city}>📍 {tour.city}</Text>
          <Text style={styles.price}>${tour.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.muted}>• {tour.durationHours || 4} hours</Text>
          <Text style={styles.muted}>• Guided</Text>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {tour.description || "No description available."}
        </Text>

        <View style={styles.guideBox}>
          <Text style={styles.guideTitle}>Guide</Text>
          <Text style={styles.guideName}>
            {tour.User?.name || "Unknown guide"}
          </Text>
        </View>

        {/* REVIEWS SECTION */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {reviews.length > 0 && (
              <View style={styles.averageRatingBox}>
                <Text style={styles.averageRatingNumber}>
                  {calculateAverageRating()}
                </Text>
                <Text style={styles.averageRatingStar}>★</Text>
                <Text style={styles.reviewCount}>
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </Text>
              </View>
            )}
          </View>

          {/* Add Review Form */}
          <View style={styles.reviewForm}>
            <Text style={styles.formTitle}>Write a Review</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderStars(rating, setRating)}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Comment</Text>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Share your experience with this tour..."
                multiline
                numberOfLines={4}
                style={styles.textArea}
                textAlignVertical="top"
              />
            </View>

            <Pressable
              style={[
                styles.submitBtn,
                sendingReview && styles.submitBtnDisabled,
              ]}
              onPress={submitReview}
              disabled={sendingReview}
            >
              <Text style={styles.submitBtnText}>
                {sendingReview ? "Submitting..." : "Submit Review"}
              </Text>
            </Pressable>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {reviews.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>💭</Text>
                <Text style={styles.emptyStateText}>No reviews yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Be the first to review this tour!
                </Text>
              </View>
            ) : (
              reviews.map((r) => (
                <View key={r.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewUserAvatar}>
                      <Text style={styles.reviewUserInitial}>
                        {(r.User?.name || "U").charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>
                        {r.User?.name || "Anonymous User"}
                      </Text>
                      {renderStars(r.rating)}
                    </View>
                  </View>
                  {r.comment ? (
                    <Text style={styles.reviewComment}>{r.comment}</Text>
                  ) : null}
                </View>
              ))
            )}
          </View>
        </View>

        {/* BOOK Button */}
        <Pressable
          style={styles.bookBtn}
          onPress={() => router.push(`/booking/${tour.id}`)}
        >
          <Text style={styles.bookText}>BOOK THIS TOUR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  imageContainer: {
    height: 420,
    backgroundColor: "#000",
  },

  image: {
    width: width,
    height: 420,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 20,
    fontWeight: "900",
  },

  dots: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },

  dotActive: {
    backgroundColor: "white",
    width: 18,
  },

  dotInactive: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  card: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 18,
    marginTop: -30,
    paddingBottom: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  city: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "600",
  },

  price: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  muted: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },

  guideBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.grayBtn,
  },

  guideTitle: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },

  guideName: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  bookBtn: {
    marginTop: 24,
    backgroundColor: colors.black,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  bookText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
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

  errorText: {
    color: "red",
    fontWeight: "800",
  },

  // REVIEWS SECTION
  reviewsSection: {
    marginTop: 24,
  },

  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  averageRatingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  averageRatingNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
  },

  averageRatingStar: {
    fontSize: 18,
    color: "#FFB800",
  },

  reviewCount: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
    marginLeft: 4,
  },

  // REVIEW FORM
  reviewForm: {
    marginTop: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },

  formTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 16,
  },

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },

  starsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  starIcon: {
    fontSize: 28,
    color: "#FFB800",
  },

  textArea: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },

  submitBtn: {
    backgroundColor: colors.black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },

  submitBtnDisabled: {
    opacity: 0.6,
  },

  submitBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.5,
  },

  // REVIEWS LIST
  reviewsList: {
    marginTop: 20,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyStateText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },

  emptyStateSubtext: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },

  reviewCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  reviewUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  reviewUserInitial: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
  },

  reviewUserInfo: {
    flex: 1,
  },

  reviewUserName: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 4,
  },

  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontWeight: "500",
  },
});
