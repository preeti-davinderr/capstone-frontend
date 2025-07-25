import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";
import SubHeader from "../components/SubHeader";

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  image: any;
  url: string;
}

const ArticlesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trimester } = route.params as { trimester: string };

  // Trimester-specific articles based on the document
  const getArticlesByTrimester = (trimester: string): Article[] => {
    switch (trimester) {
      case "First Trimester Care":
        return [
          {
            id: "1",
            title: "Your Guide to a Healthy Pregnancy",
            description: "Comprehensive information on prenatal care and lifestyle choices for the first trimester",
            readTime: "8 min read",
            image: require("../assets/development/week (5).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/guide-healthy-pregnancy.html",
          },
          {
            id: "2",
            title: "Oral Health and Pregnancy",
            description: "The significance of maintaining oral hygiene during pregnancy and dental care tips",
            readTime: "5 min read",
            image: require("../assets/development/week (8).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/oral-health-pregnancy.html",
          },
          {
            id: "3",
            title: "Folate: An Important Nutrient for Pregnancy",
            description: "The role of folic acid in preventing neural tube defects and dietary sources",
            readTime: "6 min read",
            image: require("../assets/development/week (10).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/folate-important-nutrient.html",
          },
          {
            id: "4",
            title: "Prenatal Care Initiation",
            description: "Early prenatal visits and establishing a comprehensive care plan",
            readTime: "7 min read",
            image: require("../assets/development/week (12).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/prenatal-care.html",
          },
        ];
      case "Second Trimester Care":
        return [
          {
            id: "5",
            title: "Healthy Eating When Pregnant and Breastfeeding",
            description: "Guidance on dietary choices and nutritional requirements for the second trimester",
            readTime: "9 min read",
            image: require("../assets/development/week (18).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/healthy-eating-pregnant-breastfeeding.html",
          },
          {
            id: "6",
            title: "Family-Centred Maternity and Newborn Care: National Guidelines",
            description: "Prenatal screenings and care practices for the second trimester",
            readTime: "10 min read",
            image: require("../assets/development/week (22).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/family-centred-maternity-care.html",
          },
          {
            id: "7",
            title: "Healthy Weight Gain During Pregnancy",
            description: "Information on recommended weight gain ranges and management",
            readTime: "6 min read",
            image: require("../assets/development/week (24).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/healthy-weight-gain.html",
          },
          {
            id: "8",
            title: "Routine Screenings and Tests",
            description: "Understanding the 18-22 week ultrasound and other prenatal tests",
            readTime: "7 min read",
            image: require("../assets/development/week (26).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/routine-screenings.html",
          },
        ];
      case "Third Trimester Care":
        return [
          {
            id: "9",
            title: "Immunization in Pregnancy and Breastfeeding",
            description: "The safety and importance of vaccines during pregnancy including influenza and Tdap",
            readTime: "8 min read",
            image: require("../assets/development/week (32).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/immunization-pregnancy-breastfeeding.html",
          },
          {
            id: "10",
            title: "Preparation for Birth",
            description: "Birth plans, recognizing signs of labor, and hospital preparations",
            readTime: "9 min read",
            image: require("../assets/development/week (35).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/preparation-birth.html",
          },
          {
            id: "11",
            title: "Fetal Movement Monitoring",
            description: "Tracking fetal movements and when to seek medical advice",
            readTime: "5 min read",
            image: require("../assets/development/week (38).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/fetal-movement-monitoring.html",
          },
          {
            id: "12",
            title: "Mental Health During Pregnancy",
            description: "Addressing emotional well-being and support systems in the third trimester",
            readTime: "7 min read",
            image: require("../assets/development/week (40).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/mental-health-pregnancy.html",
          },
        ];
      default:
        return [];
    }
  };

  const articles = getArticlesByTrimester(trimester);

  const handleArticlePress = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this link. Please check your internet connection.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open link. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <SubHeader title={trimester} />

      {/* Articles Section */}
      <View style={styles.articlesSection}>
        <Text style={styles.sectionTitle}>Articles for You</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {articles.map((article) => (
            <TouchableOpacity 
              key={article.id} 
              style={styles.articleCard}
              onPress={() => handleArticlePress(article.url, article.title)}
            >
              <Image source={article.image} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDescription}>{article.description}</Text>
                <View style={styles.articleFooter}>
                  <Text style={styles.articleReadTime}>{article.readTime}</Text>
                  <Ionicons name="open-outline" size={16} color={COLORS.purple500} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  articlesSection: {
    flex: 1,
    paddingHorizontal: SPACING.spacing16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.displayH2,
    marginTop: SPACING.spacing20,
    marginBottom: SPACING.spacing16,
  },
  articleCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing16,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    marginRight: SPACING.spacing12,
  },
  articleContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  articleTitle: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  articleDescription: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing8,
  },
  articleFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  articleReadTime: {
    ...TEXT_STYLES.caption,
    color: COLORS.gray500,
  },
});

export default ArticlesScreen; 