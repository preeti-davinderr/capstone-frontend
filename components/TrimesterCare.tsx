import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";

interface TrimesterCareProps {
  title: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  image: any;
  url: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

const TrimesterCare: React.FC<TrimesterCareProps> = ({ title }) => {
  const navigation = useNavigation<any>();

  const handleTitlePress = () => {
    navigation.navigate("Articles", { trimester: title });
  };

  // Get articles based on trimester
  const getArticlesByTrimester = (trimester: string): Article[] => {
    switch (trimester) {
      case "First Trimester Care":
        return [
          {
            id: "1",
            title: "Your Guide to a Healthy Pregnancy",
            description: "Comprehensive information on prenatal care and lifestyle choices",
            readTime: "8 min read",
            image: require("../assets/development/week (5).webp"),
            url: "https://www.canada.ca/en/public-health/services/health-promotion/healthy-pregnancy/healthy-pregnancy-guide.html",
            icon: "pill",
            iconColor: COLORS.purple500,
            bgColor: COLORS.blush100,
          },
          {
            id: "2",
            title: "Oral Health and Pregnancy",
            description: "The significance of maintaining oral hygiene during pregnancy",
            readTime: "5 min read",
            image: require("../assets/development/week (8).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/oral-health-pregnancy.html",
            icon: "brain",
            iconColor: COLORS.purple500,
            bgColor: COLORS.purple100,
          },
          {
            id: "3",
            title: "Folic Acid & Neural Tube Defects",
            description: "The role of folic acid in preventing neural tube defects",
            readTime: "6 min read",
            image: require("../assets/development/week (10).webp"),
            url: "https://www.canada.ca/en/public-health/services/pregnancy/folic-acid.html",
            icon: "food-apple",
            iconColor: COLORS.peach400,
            bgColor: COLORS.white,
          },
        ];
      case "Second Trimester Care":
        return [
          {
            id: "4",
            title: "Healthy Eating When Pregnant & Breastfeeding",
            description: "Guidance on dietary choices and nutritional requirements",
            readTime: "9 min read",
            image: require("../assets/development/week (18).webp"),
            url: "https://food-guide.canada.ca/en/tips-for-healthy-eating/pregnant-breastfeeding/",
            icon: "food-apple",
            iconColor: COLORS.peach400,
            bgColor: COLORS.white,
          },
          {
            id: "5",
            title: "Family-Centred Maternity & Newborn Care",
            description: "National Guidelines for prenatal care and practices",
            readTime: "10 min read",
            image: require("../assets/development/week (22).webp"),
            url: "https://www.canada.ca/en/public-health/services/maternity-newborn-care-guidelines.html",
            icon: "heart",
            iconColor: COLORS.peach400,
            bgColor: COLORS.peach400,
          },
          {
            id: "6",
            title: "Healthy Weight Gain During Pregnancy",
            description: "PDF guide on recommended weight gain ranges",
            readTime: "6 min read",
            image: require("../assets/development/week (24).webp"),
            url: "https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/pdf/nutrition/prenatal/hwgdp-ppspg-eng.pdf",
            icon: "pill",
            iconColor: COLORS.purple500,
            bgColor: COLORS.blush100,
          },
        ];
      case "Third Trimester Care":
        return [
          {
            id: "7",
            title: "Immunization in Pregnancy & Breastfeeding",
            description: "Safety and importance of vaccines during pregnancy",
            readTime: "8 min read",
            image: require("../assets/development/week (32).webp"),
            url: "https://www.canada.ca/en/public-health/services/publications/healthy-living/canadian-immunization-guide-part-3-vaccination-specific-populations/page-4-immunization-pregnancy-breastfeeding.html",
            icon: "pill",
            iconColor: COLORS.purple500,
            bgColor: COLORS.blush100,
          },
          {
            id: "8",
            title: "Your Guide to a Healthy Pregnancy",
            description: "Week-by-week overview of pregnancy development",
            readTime: "12 min read",
            image: require("../assets/development/week (35).webp"),
            url: "https://www.canada.ca/en/public-health/services/health-promotion/healthy-pregnancy/healthy-pregnancy-guide.html",
            icon: "heart",
            iconColor: COLORS.peach400,
            bgColor: COLORS.peach400,
          },
        ];
      default:
        return [];
    }
  };

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

  const articles = getArticlesByTrimester(title);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTitlePress}>
        <Text style={styles.header}>{title}</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {articles.map((article, idx) => (
          <TouchableOpacity 
            key={article.id} 
            style={[styles.card, { backgroundColor: article.bgColor }]}
            onPress={() => handleArticlePress(article.url, article.title)}
          > 
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={article.icon as any} size={28} color={article.iconColor} />
            </View>
            <Text style={[styles.title, TEXT_STYLES.bodyBase]}>{article.title}</Text>
            <Text style={[styles.subtitle, TEXT_STYLES.bodySmall]}>{article.readTime}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.spacing16,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.displayH2,
    marginBottom: SPACING.spacing12,
    marginLeft: SPACING.spacing8,
  },
  card: {
    width: 170,
    borderRadius: 20,
    padding: SPACING.spacing16,
    marginRight: SPACING.spacing16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.gray300,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  title: {
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  subtitle: {
    color: COLORS.gray700,
  },
});

export default TrimesterCare; 