import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
  const { trimester, selectedWeek } = route.params as { trimester: string; selectedWeek: number };

  // Use selectedWeek from route params instead of calculating from AsyncStorage
  const currentWeek = selectedWeek || 5;

  // Get articles based on current week (trimester)
  const getArticlesByWeek = (week: number): Article[] => {
    // Determine trimester based on week
    if (week >= 1 && week <= 12) {
      // First Trimester
      return [
        {
          id: "1",
          title: "Your Guide to a Healthy Pregnancy",
          description: "Comprehensive information on prenatal care and lifestyle choices",
          readTime: "8 min read",
          image: require("../assets/article/img (1).png"),
          url: "",
        },
        {
          id: "2",
          title: "Oral Health and Pregnancy",
          description: "The significance of maintaining oral hygiene during pregnancy",
          readTime: "5 min read",
          image: require("../assets/article/img (2).png"),
          url: "",
        },
        {
          id: "3",
          title: "Folic Acid & Neural Tube Defects",
          description: "The role of folic acid in preventing neural tube defects",
          readTime: "6 min read",
          image: require("../assets/article/img (3).png"),
          url: "",
        },
      ];
    } else if (week >= 13 && week <= 26) {
      // Second Trimester
      return [
        {
          id: "4",
          title: "Healthy Eating When Pregnant & Breastfeeding",
          description: "Guidance on dietary choices and nutritional requirements",
          readTime: "9 min read",
          image: require("../assets/article/img (4).png"),
          url: "",
        },
        {
          id: "5",
          title: "Family-Centred Maternity & Newborn Care",
          description: "National Guidelines for prenatal care and practices",
          readTime: "10 min read",
          image: require("../assets/article/img (5).png"),
          url: "",
        },
        {
          id: "6",
          title: "Healthy Weight Gain During Pregnancy",
          description: "PDF guide on recommended weight gain ranges",
          readTime: "6 min read",
          image: require("../assets/article/img (1).png"),
          url: "",
        },
      ];
    } else if (week >= 27 && week <= 40) {
      // Third Trimester
      return [
        {
          id: "7",
          title: "Immunization in Pregnancy & Breastfeeding",
          description: "Safety and importance of vaccines during pregnancy",
          readTime: "8 min read",
          image: require("../assets/article/img (2).png"),
          url: "",
        },
        {
          id: "8",
          title: "Your Guide to a Healthy Pregnancy",
          description: "Week-by-week overview of pregnancy development",
          readTime: "12 min read",
          image: require("../assets/article/img (3).png"),
          url: "",
        },
      ];
    }
    return [];
  };

  const articles = getArticlesByWeek(currentWeek);

  const handleArticlePress = (article: Article) => {
    (navigation as any).navigate('ArticleDetail', {
      title: article.title,
      description: article.description,
      readTime: article.readTime,
      image: article.image,
    });
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
              onPress={() => handleArticlePress(article)}
            >
              <Image source={article.image} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDescription}>{article.description}</Text>
                <View style={styles.articleFooter}>
                  <Text style={styles.articleReadTime}>{article.readTime}</Text>
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
    paddingLeft: 0,
    paddingRight: 0,
  },
  articleTitle: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
    paddingLeft: 0,
    flexWrap: 'wrap',
  },
  articleDescription: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing8,
    paddingLeft: 0,
    flexWrap: 'wrap',
  },
  articleFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: 0,
  },
  articleReadTime: {
    ...TEXT_STYLES.caption,
    color: COLORS.gray500,
    paddingLeft: 0,
    flexWrap: 'wrap',
  },
});

export default ArticlesScreen; 