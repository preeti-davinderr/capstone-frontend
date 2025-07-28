import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { COLORS, SPACING, RADIUS } from "../styles/globalStyles";

interface Article {
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  url: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <>
    {articles.map((article, index) => (
      <TouchableOpacity
        key={index}
        style={styles.articleCard}
        onPress={async () => {
          try {
            await Linking.openURL(article.url);
          } catch (err) {
            Alert.alert('Could not open link', 'Please check your internet connection or try again later.');
          }
        }}
        accessibilityRole="link"
        accessibilityLabel={`Read article: ${article.title}`}
      >
        <View style={styles.articleLabel}>
          <Text>Article</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleSubtitle}>{article.subtitle}</Text>
          <Text style={styles.articleMeta}>
            {article.readTime} • {article.date}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </>
);

const styles = StyleSheet.create({
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.spacing12,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  articleLabel: {
    backgroundColor: COLORS.purple100,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.spacing4,
    paddingHorizontal: SPACING.spacing8,
    marginRight: SPACING.spacing12,
    alignSelf: 'flex-start',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  articleSubtitle: {
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing4,
  },
  articleMeta: {
    fontSize: 12,
    color: COLORS.gray500,
  },
});

export default ArticleList;
