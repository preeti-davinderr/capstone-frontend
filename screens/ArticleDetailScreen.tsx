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

interface ArticleDetailRouteParams {
  title: string;
  description: string;
  readTime: string;
  image: any;
}

const ArticleDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description, readTime, image } = route.params as ArticleDetailRouteParams;
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Get recommendations based on current article
  const getRecommendations = () => {
    const allArticles = [
      {
        title: "Your Guide to a Healthy Pregnancy",
        description: "Comprehensive information on prenatal care and lifestyle choices",
        readTime: "8 min read",
        iconImage: require("../assets/article/img (1).png"),
      },
      {
        title: "Oral Health and Pregnancy",
        description: "The significance of maintaining oral hygiene during pregnancy",
        readTime: "5 min read",
        iconImage: require("../assets/article/img (2).png"),
      },
      {
        title: "Folic Acid & Neural Tube Defects",
        description: "The role of folic acid in preventing neural tube defects",
        readTime: "6 min read",
        iconImage: require("../assets/article/img (3).png"),
      },
      {
        title: "Healthy Eating When Pregnant & Breastfeeding",
        description: "Guidance on dietary choices and nutritional requirements",
        readTime: "9 min read",
        iconImage: require("../assets/article/img (4).png"),
      },
      {
        title: "Family-Centred Maternity & Newborn Care",
        description: "National Guidelines for prenatal care and practices",
        readTime: "10 min read",
        iconImage: require("../assets/article/img (5).png"),
      },
      {
        title: "Healthy Weight Gain During Pregnancy",
        description: "PDF guide on recommended weight gain ranges",
        readTime: "6 min read",
        iconImage: require("../assets/article/img (1).png"),
      },
      {
        title: "Immunization in Pregnancy & Breastfeeding",
        description: "Safety and importance of vaccines during pregnancy",
        readTime: "8 min read",
        iconImage: require("../assets/article/img (2).png"),
      },
    ];

    // Filter out current article and return 2 random recommendations
    const filteredArticles = allArticles.filter(article => article.title !== title);
    return filteredArticles.slice(0, 2);
  };

  const getArticleContent = () => {
    switch (title) {
      case "Your Guide to a Healthy Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you get closer to meeting your little one, preparing for birth becomes an important part of your journey. Let's explore how getting ready—both physically and emotionally—can help you feel more confident and in control when the big day arrives.
              </Text>
            </View>

            {/* Preparing for birth */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preparing for birth</Text>
              <Text style={styles.sectionText}>
                As your due date approaches, your focus naturally shifts to labor and birth. This is a time when mental and physical preparation can make a significant difference in your birth experience.
              </Text>
            </View>

            {/* What can I do to prepare for birth? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What can I do to prepare for birth?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Secure support from your partner, a relative, or friend</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Plan for childcare if you have other children</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Pack a hospital bag if you're planning a hospital birth</Text>
                </View>
              </View>
            </View>

            {/* What are the early signs of labour? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are the early signs of labour?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Baby "dropping" (head moving into pelvis) in the last few weeks</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Changes in vaginal discharge (mucus plug release, brownish/bloody discharge) in the last few days</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Water breaking (though often during labor)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Irregular, periodic contractions, sometimes starting as back pain</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Diarrhea</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Oral Health and Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you embark on this incredible journey, taking care of your oral health becomes more important than ever. Let's explore why a healthy mouth plays a vital role in your prenatal care routine.
              </Text>
            </View>

            {/* Oral health and Pregnancy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Oral health and Pregnancy</Text>
              <Text style={styles.sectionText}>
                Hormonal changes during pregnancy can affect your oral health, making you more susceptible to gum disease. Pregnancy gingivitis is common and can cause red, swollen, and tender gums that may bleed when you brush or floss.
              </Text>
              <Text style={styles.sectionText}>
                If left untreated, gingivitis can progress to periodontitis, a more serious form of gum disease. Research suggests that periodontitis may be associated with poor pregnancy outcomes, including pre-term delivery and low birth-weight babies.
              </Text>
            </View>

            {/* Taking care of your oral health */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taking care of your oral health</Text>
              <Text style={styles.sectionTitle}>To clean your mouth properly, you should:</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>floss daily</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>drink fluoridated water where available</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>brush your teeth twice a day for at least 2 minutes, using a soft toothbrush and fluoride toothpaste</Text>
                </View>
              </View>
            </View>

            {/* Morning sickness and oral health */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Morning sickness and oral health</Text>
              <Text style={styles.sectionText}>
                Morning sickness can expose your teeth to stomach acid, which can lead to demineralization, tooth decay, and erosion. The acid can wear away the protective enamel on your teeth.
              </Text>
              <Text style={styles.sectionTitle}>To clean your mouth properly, you should:</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>rinse your mouth with water or a fluoride mouth wash immediately after vomiting</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>after rinsing your mouth, wait for at least 30 minutes before brushing your teeth to further reduce the acid in your mouth</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>brush your teeth</Text>
                </View>
              </View>
            </View>

            {/* Visit your oral health professional */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Visit your oral health professional</Text>
              <Text style={styles.sectionText}>
                Schedule a dental checkup during your first trimester to address any existing oral health issues. Be sure to inform your dental professional that you're pregnant, as this may affect treatment recommendations.
              </Text>
              <Text style={styles.sectionText}>
                Routine dental care, including cleanings and fillings, is generally safe during pregnancy. However, elective procedures and X-rays should be postponed until after delivery.
              </Text>
            </View>
          </>
        );

      case "Folic Acid & Neural Tube Defects":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you embark on this incredible journey, understanding the nutrients your body needs becomes more important than ever. Let's explore why folic acid deserves a special place in your prenatal care routine.
              </Text>
            </View>

            {/* What is folic acid? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is folic acid?</Text>
              <Text style={styles.sectionText}>
                Folic acid is a B vitamin that occurs naturally in foods like leafy green vegetables, citrus fruits, and beans. It's also available as a synthetic form in supplements and fortified foods.
              </Text>
              <Text style={styles.sectionText}>
                This essential nutrient plays a crucial role in cell division and growth, making it particularly important during pregnancy when your baby's cells are rapidly developing.
              </Text>
            </View>

            {/* Why is it important during pregnancy? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why is it important during pregnancy?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Prevents neural tube defects: Adequate folic acid intake reduces the risk of spina bifida and anencephaly by up to 70%</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Supports brain development: Essential for proper formation of your baby's brain and spinal cord</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reduces pregnancy complications: May help prevent preterm birth and low birth weight</Text>
                </View>
              </View>
            </View>

            {/* How much should I take? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How much should I take?</Text>
              <View style={styles.dosageBox}>
                <Text style={styles.dosageText}>Before pregnancy: 400 mcg daily</Text>
                <Text style={styles.dosageText}>During pregnancy: 600-800 mcg daily</Text>
                <Text style={styles.dosageText}>While breastfeeding: 500 mcg daily</Text>
              </View>
              <Text style={styles.disclaimerText}>
                Always consult with your healthcare provider for personalized recommendations based on your individual needs and medical history.
              </Text>
            </View>

            {/* Best food sources */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best food sources</Text>
              <View style={styles.foodSourcesGrid}>
                <View style={[styles.foodSourceCard, { backgroundColor: '#E8F5E8' }]}>
                  <Text style={styles.foodSourceText}>Leafy Greens</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.foodSourceText}>Citrus Fruits</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Legumes</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Fortified Grains</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Healthy Eating When Pregnant & Breastfeeding":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Mama-to-be, what you eat matters—but so does how you eat. Understanding safe food positioning and posture during meals can aid digestion, reduce heartburn, and support your growing baby.
              </Text>
            </View>

            {/* What is food poisoning? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is food poisoning?</Text>
              <Text style={styles.sectionText}>
                Food poisoning occurs when you consume food or beverages contaminated with harmful bacteria, viruses, parasites, or toxins. These contaminants can cause illness ranging from mild stomach upset to severe complications.
              </Text>
              <Text style={styles.sectionText}>
                Food can become contaminated at any point during production, processing, storage, or preparation. Common sources include undercooked meat, unpasteurized dairy products, and improperly washed fruits and vegetables.
              </Text>
            </View>

            {/* Food poisoning and pregnant people */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Food poisoning and pregnant people</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Pregnant women are more susceptible to foodborne illnesses due to changes in their immune system</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Certain bacteria like Listeria can pass through the placenta and harm the developing baby</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Food poisoning during pregnancy can lead to miscarriage, premature birth, or stillbirth</Text>
                </View>
              </View>
            </View>

            {/* Food to avoid */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Food to avoid</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Hot dogs straight from the package, without further heating</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw sprouts, such as alfalfa, clover, radish, and mung beans</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw or lightly cooked eggs, or egg products that contain raw eggs</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw seafood, such as sushi</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw or unpasteurized dairy products</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Unpasteurized fruit juice and cider</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Family-Centred Maternity & Newborn Care":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As your body transforms to support new life, gentle exercise can boost your strength, ease discomfort, and prepare you for labor. Let's explore how staying active can benefit both you and your baby during this special journey.
              </Text>
            </View>

            {/* Exercise during pregnancy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Exercise during pregnancy</Text>
              <Text style={styles.sectionText}>
                Exercise is part of a healthy lifestyle for pregnant women. Regular physical activity can provide many benefits during pregnancy.
              </Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping your body be strong and fit for labour and birth</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping you sleep better</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping prevent you from gaining excess weight</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Boosting your mood and your energy level</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping with constipation</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reducing backache</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reducing the likelihood of getting gestational diabetes</Text>
                </View>
              </View>
            </View>

            {/* How much exercise should I get while I'm pregnant? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How much exercise should I get while I'm pregnant?</Text>
              <Text style={styles.sectionText}>
                Unless you have a complication that prevents you from exercising, all pregnant women should be physically active throughout pregnancy. Pregnant women should accumulate at least 150 minutes of moderate intensity physical activity each week.
              </Text>
            </View>

            {/* What are the best choices for exercise in pregnancy? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are the best choices for exercise in pregnancy?</Text>
              <Text style={styles.sectionText}>
                Most pregnant women should strive for 30 minutes of moderate exercise most days of the week.
              </Text>
              <Text style={styles.sectionText}>
                Choose activities that minimize your risk of contact with others or falling.
              </Text>
              <Text style={styles.sectionText}>
                Good options are exercises that you are already accustomed to like walking, swimming, low-impact aerobics, stationary cycling, and moderate strength training.
              </Text>
              <Text style={styles.sectionText}>
                Adding yoga or gentle stretching can also be beneficial.
              </Text>
              <Text style={styles.sectionText}>
                It's important to warm up, cool down, and stay hydrated.
              </Text>
            </View>
          </>
        );

      case "Healthy Weight Gain During Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, new mama! As you begin this beautiful new chapter, taking care of your health remains just as important—especially in the postpartum period. Let's explore how caring for yourself supports both your recovery and your baby's well-being.
              </Text>
            </View>

            {/* What is Postpartum? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is Postpartum?</Text>
              <Text style={styles.sectionText}>
                The postpartum period, also known as the fourth trimester, begins immediately after childbirth and typically lasts for six weeks. This is a time of significant physical and emotional changes as your body recovers from pregnancy and childbirth.
              </Text>
              <Text style={styles.sectionText}>
                During this period, you may experience Postpartum Depression (PPD), which can begin anytime within the first year after giving birth. It's important to recognize the signs and seek help if needed.
              </Text>
            </View>

            {/* Important facts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Important facts</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Your body undergoes significant physical changes as it returns to its pre-pregnancy state</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Bonding with your baby is crucial for both your emotional well-being and your baby's development</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Having a strong support system is essential during this challenging time</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Emotional ups and downs are normal, but persistent feelings of sadness or anxiety should be addressed</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Maintaining a healthy diet is important for your recovery and milk production if breastfeeding</Text>
                </View>
              </View>
            </View>

            {/* Best food sources */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best food sources</Text>
              <View style={styles.foodSourcesGrid}>
                <View style={[styles.foodSourceCard, { backgroundColor: '#E8F5E8' }]}>
                  <Text style={styles.foodSourceText}>Leafy Greens</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.foodSourceText}>Citrus Fruits</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Legumes</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Fortified Grains</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Immunization in Pregnancy & Breastfeeding":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you embark on this incredible journey, understanding the nutrients your body needs becomes more important than ever. Let's explore why folic acid deserves a special place in your prenatal care routine.
              </Text>
            </View>

            {/* What is folic acid? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is folic acid?</Text>
              <Text style={styles.sectionText}>
                Folic acid is a B vitamin that occurs naturally in foods like leafy green vegetables, citrus fruits, and beans. It's also available as a synthetic form in supplements and fortified foods.
              </Text>
              <Text style={styles.sectionText}>
                This essential nutrient plays a crucial role in cell division and growth, making it particularly important during pregnancy when your baby's cells are rapidly developing.
              </Text>
            </View>

            {/* Why is it important during pregnancy? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why is it important during pregnancy?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Prevents neural tube defects: Adequate folic acid intake reduces the risk of spina bifida and anencephaly by up to 70%</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Supports brain development: Essential for proper formation of your baby's brain and spinal cord</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reduces pregnancy complications: May help prevent preterm birth and low birth weight</Text>
                </View>
              </View>
            </View>

            {/* How much should I take? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How much should I take?</Text>
              <View style={styles.dosageBox}>
                <Text style={styles.dosageText}>Before pregnancy: 400 mcg daily</Text>
                <Text style={styles.dosageText}>During pregnancy: 600-800 mcg daily</Text>
                <Text style={styles.dosageText}>While breastfeeding: 500 mcg daily</Text>
              </View>
              <Text style={styles.disclaimerText}>
                Always consult with your healthcare provider for personalized recommendations based on your individual needs and medical history.
              </Text>
            </View>

            {/* Best food sources */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best food sources</Text>
              <View style={styles.foodSourcesGrid}>
                <View style={[styles.foodSourceCard, { backgroundColor: '#E8F5E8' }]}>
                  <Text style={styles.foodSourceText}>Leafy Greens</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.foodSourceText}>Citrus Fruits</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Legumes</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Fortified Grains</Text>
                </View>
              </View>
            </View>
          </>
        );
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you get closer to meeting your little one, preparing for birth becomes an important part of your journey. Let's explore how getting ready—both physically and emotionally—can help you feel more confident and in control when the big day arrives.
              </Text>
            </View>

            {/* Preparing for birth */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preparing for birth</Text>
              <Text style={styles.sectionText}>
                As your due date approaches, your focus naturally shifts to labor and birth. This is a time when mental and physical preparation can make a significant difference in your birth experience.
              </Text>
            </View>

            {/* What can I do to prepare for birth? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What can I do to prepare for birth?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Secure support from your partner, a relative, or friend</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Plan for childcare if you have other children</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Pack a hospital bag if you're planning a hospital birth</Text>
                </View>
              </View>
            </View>

            {/* What are the early signs of labour? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are the early signs of labour?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Baby "dropping" (head moving into pelvis) in the last few weeks</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Changes in vaginal discharge (mucus plug release, brownish/bloody discharge) in the last few days</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Water breaking (though often during labor)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Irregular, periodic contractions, sometimes starting as back pain</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Diarrhea</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Moving for Two: Safe and Gentle Exercises for Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As your body transforms to support new life, gentle exercise can boost your strength, ease discomfort, and prepare you for labor. Let's explore how staying active can benefit both you and your baby during this special journey.
              </Text>
            </View>

            {/* Exercise during pregnancy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Exercise during pregnancy</Text>
              <Text style={styles.sectionText}>
                Exercise is part of a healthy lifestyle for pregnant women. Regular physical activity can provide many benefits during pregnancy.
              </Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping your body be strong and fit for labour and birth</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping you sleep better</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping prevent you from gaining excess weight</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Boosting your mood and your energy level</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Helping with constipation</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reducing backache</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reducing the likelihood of getting gestational diabetes</Text>
                </View>
              </View>
            </View>

            {/* How much exercise should I get while I'm pregnant? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How much exercise should I get while I'm pregnant?</Text>
              <Text style={styles.sectionText}>
                Unless you have a complication that prevents you from exercising, all pregnant women should be physically active throughout pregnancy. Pregnant women should accumulate at least 150 minutes of moderate intensity physical activity each week.
              </Text>
            </View>

            {/* What are the best choices for exercise in pregnancy? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are the best choices for exercise in pregnancy?</Text>
              <Text style={styles.sectionText}>
                Most pregnant women should strive for 30 minutes of moderate exercise most days of the week.
              </Text>
              <Text style={styles.sectionText}>
                Choose activities that minimize your risk of contact with others or falling.
              </Text>
              <Text style={styles.sectionText}>
                Good options are exercises that you are already accustomed to like walking, swimming, low-impact aerobics, stationary cycling, and moderate strength training.
              </Text>
              <Text style={styles.sectionText}>
                Adding yoga or gentle stretching can also be beneficial.
              </Text>
              <Text style={styles.sectionText}>
                It's important to warm up, cool down, and stay hydrated.
              </Text>
            </View>
          </>
        );

      case "Eating Right: The Importance of Food Positioning During Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Mama-to-be, what you eat matters—but so does how you eat. Understanding safe food positioning and posture during meals can aid digestion, reduce heartburn, and support your growing baby.
              </Text>
            </View>

            {/* What is food poisoning? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is food poisoning?</Text>
              <Text style={styles.sectionText}>
                Food poisoning occurs when you consume food or beverages contaminated with harmful bacteria, viruses, parasites, or toxins. These contaminants can cause illness ranging from mild stomach upset to severe complications.
              </Text>
              <Text style={styles.sectionText}>
                Food can become contaminated at any point during production, processing, storage, or preparation. Common sources include undercooked meat, unpasteurized dairy products, and improperly washed fruits and vegetables.
              </Text>
            </View>

            {/* Food poisoning and pregnant people */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Food poisoning and pregnant people</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Pregnant women are more susceptible to foodborne illnesses due to changes in their immune system</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Certain bacteria like Listeria can pass through the placenta and harm the developing baby</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Food poisoning during pregnancy can lead to miscarriage, premature birth, or stillbirth</Text>
                </View>
              </View>
            </View>

            {/* Food to avoid */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Food to avoid</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Hot dogs straight from the package, without further heating</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw sprouts, such as alfalfa, clover, radish, and mung beans</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw or lightly cooked eggs, or egg products that contain raw eggs</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw seafood, such as sushi</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Raw or unpasteurized dairy products</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Unpasteurized fruit juice and cider</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Oral health: Why It's Crucial for a Healthy Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you embark on this incredible journey, taking care of your oral health becomes more important than ever. Let's explore why a healthy mouth plays a vital role in your prenatal care routine.
              </Text>
            </View>

            {/* Oral health and Pregnancy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Oral health and Pregnancy</Text>
              <Text style={styles.sectionText}>
                Hormonal changes during pregnancy can affect your oral health, making you more susceptible to gum disease. Pregnancy gingivitis is common and can cause red, swollen, and tender gums that may bleed when you brush or floss.
              </Text>
              <Text style={styles.sectionText}>
                If left untreated, gingivitis can progress to periodontitis, a more serious form of gum disease. Research suggests that periodontitis may be associated with poor pregnancy outcomes, including pre-term delivery and low birth-weight babies.
              </Text>
            </View>

            {/* Taking care of your oral health */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taking care of your oral health</Text>
              <Text style={styles.sectionTitle}>To clean your mouth properly, you should:</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>floss daily</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>drink fluoridated water where available</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>brush your teeth twice a day for at least 2 minutes, using a soft toothbrush and fluoride toothpaste</Text>
                </View>
              </View>
            </View>

            {/* Morning sickness and oral health */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Morning sickness and oral health</Text>
              <Text style={styles.sectionText}>
                Morning sickness can expose your teeth to stomach acid, which can lead to demineralization, tooth decay, and erosion. The acid can wear away the protective enamel on your teeth.
              </Text>
              <Text style={styles.sectionTitle}>To clean your mouth properly, you should:</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>rinse your mouth with water or a fluoride mouth wash immediately after vomiting</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>after rinsing your mouth, wait for at least 30 minutes before brushing your teeth to further reduce the acid in your mouth</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>brush your teeth</Text>
                </View>
              </View>
            </View>

            {/* Visit your oral health professional */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Visit your oral health professional</Text>
              <Text style={styles.sectionText}>
                Schedule a dental checkup during your first trimester to address any existing oral health issues. Be sure to inform your dental professional that you're pregnant, as this may affect treatment recommendations.
              </Text>
              <Text style={styles.sectionText}>
                Routine dental care, including cleanings and fillings, is generally safe during pregnancy. However, elective procedures and X-rays should be postponed until after delivery.
              </Text>
            </View>
          </>
        );

      case "The Folic Acid Factor: Why It's Crucial for a Healthy Pregnancy":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you embark on this incredible journey, understanding the nutrients your body needs becomes more important than ever. Let's explore why folic acid deserves a special place in your prenatal care routine.
              </Text>
            </View>

            {/* What is folic acid? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is folic acid?</Text>
              <Text style={styles.sectionText}>
                Folic acid is a B vitamin that occurs naturally in foods like leafy green vegetables, citrus fruits, and beans. It's also available as a synthetic form in supplements and fortified foods.
              </Text>
              <Text style={styles.sectionText}>
                This essential nutrient plays a crucial role in cell division and growth, making it particularly important during pregnancy when your baby's cells are rapidly developing.
              </Text>
            </View>

            {/* Why is it important during pregnancy? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why is it important during pregnancy?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Prevents neural tube defects: Adequate folic acid intake reduces the risk of spina bifida and anencephaly by up to 70%</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Supports brain development: Essential for proper formation of your baby's brain and spinal cord</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Reduces pregnancy complications: May help prevent preterm birth and low birth weight</Text>
                </View>
              </View>
            </View>

            {/* How much should I take? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How much should I take?</Text>
              <View style={styles.dosageBox}>
                <Text style={styles.dosageText}>Before pregnancy: 400 mcg daily</Text>
                <Text style={styles.dosageText}>During pregnancy: 600-800 mcg daily</Text>
                <Text style={styles.dosageText}>While breastfeeding: 500 mcg daily</Text>
              </View>
              <Text style={styles.disclaimerText}>
                Always consult with your healthcare provider for personalized recommendations based on your individual needs and medical history.
              </Text>
            </View>

            {/* Best food sources */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best food sources</Text>
              <View style={styles.foodSourcesGrid}>
                <View style={[styles.foodSourceCard, { backgroundColor: '#E8F5E8' }]}>
                  <Text style={styles.foodSourceText}>Leafy Greens</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.foodSourceText}>Citrus Fruits</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Legumes</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Fortified Grains</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "Your Postpartum Journey: Healing with Care":
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, new mama! As you begin this beautiful new chapter, taking care of your health remains just as important—especially in the postpartum period. Let's explore how caring for yourself supports both your recovery and your baby's well-being.
              </Text>
            </View>

            {/* What is Postpartum? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is Postpartum?</Text>
              <Text style={styles.sectionText}>
                The postpartum period, also known as the fourth trimester, begins immediately after childbirth and typically lasts for six weeks. This is a time of significant physical and emotional changes as your body recovers from pregnancy and childbirth.
              </Text>
              <Text style={styles.sectionText}>
                During this period, you may experience Postpartum Depression (PPD), which can begin anytime within the first year after giving birth. It's important to recognize the signs and seek help if needed.
              </Text>
            </View>

            {/* Important facts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Important facts</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Your body undergoes significant physical changes as it returns to its pre-pregnancy state</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Bonding with your baby is crucial for both your emotional well-being and your baby's development</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Having a strong support system is essential during this challenging time</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Emotional ups and downs are normal, but persistent feelings of sadness or anxiety should be addressed</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Maintaining a healthy diet is important for your recovery and milk production if breastfeeding</Text>
                </View>
              </View>
            </View>

            {/* Best food sources */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best food sources</Text>
              <View style={styles.foodSourcesGrid}>
                <View style={[styles.foodSourceCard, { backgroundColor: '#E8F5E8' }]}>
                  <Text style={styles.foodSourceText}>Leafy Greens</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF3E0' }]}>
                  <Text style={styles.foodSourceText}>Citrus Fruits</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Legumes</Text>
                </View>
                <View style={[styles.foodSourceCard, { backgroundColor: '#FFF8E1' }]}>
                  <Text style={styles.foodSourceText}>Fortified Grains</Text>
                </View>
              </View>
            </View>
          </>
        );

      default:
        return (
          <>
            {/* Introduction */}
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                Congratulations, mama-to-be! As you get closer to meeting your little one, preparing for birth becomes an important part of your journey. Let's explore how getting ready—both physically and emotionally—can help you feel more confident and in control when the big day arrives.
              </Text>
            </View>

            {/* Preparing for birth */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preparing for birth</Text>
              <Text style={styles.sectionText}>
                As your due date approaches, your focus naturally shifts to labor and birth. This is a time when mental and physical preparation can make a significant difference in your birth experience.
              </Text>
            </View>

            {/* What can I do to prepare for birth? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What can I do to prepare for birth?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Secure support from your partner, a relative, or friend</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Plan for childcare if you have other children</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Pack a hospital bag if you're planning a hospital birth</Text>
                </View>
              </View>
            </View>

            {/* What are the early signs of labour? */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are the early signs of labour?</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Baby "dropping" (head moving into pelvis) in the last few weeks</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Changes in vaginal discharge (mucus plug release, brownish/bloody discharge) in the last few days</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Water breaking (though often during labor)</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Irregular, periodic contractions, sometimes starting as back pain</Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>Diarrhea</Text>
                </View>
              </View>
            </View>
          </>
        );
    }
  };

  const handleRecommendationPress = (article: any) => {
    navigation.navigate('ArticleDetail' as never, {
      title: article.title,
      description: article.description,
      readTime: article.readTime,
      image: article.iconImage || require("../assets/AppIcon.png"),
    } as never);
    
    // Scroll to top after a short delay to ensure navigation is complete
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <SubHeader title="Articles" />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Article Content */}
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleDescription}>{description}</Text>
          
          <View style={styles.readTimeContainer}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray500} />
            <Text style={styles.readTime}>{readTime}</Text>
          </View>

          {/* Main Article Content */}
          <View style={styles.mainArticleContent}>
            {getArticleContent()}

            {/* You might like section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>You might like...</Text>
              <View style={styles.recommendationCards}>
                {getRecommendations().map((article, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.recommendationCard}
                    onPress={() => handleRecommendationPress(article)}
                  >
                    <View style={styles.recommendationImageContainer}>
                      {article.iconImage ? (
                        <Image source={article.iconImage} style={styles.recommendationImage} />
                      ) : (
                        <Image source={require("../assets/AppIcon.png")} style={styles.recommendationImage} />
                      )}
                    </View>
                    <View style={styles.recommendationContent}>
                      <Text style={styles.recommendationTitle}>{article.title}</Text>
                      <Text style={styles.recommendationDescription}>{article.description}</Text>
                      <Text style={styles.recommendationReadTime}>{article.readTime}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* References */}
            <View style={styles.references}>
              <Text style={styles.referencesText}>
                References: American College of Obstetricians and Gynecologists, CDC Guidelines on Folic Acid Supplementation, Journal of Maternal-Fetal Medicine.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
  },
  articleImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  articleContent: {
    padding: SPACING.spacing24,
    paddingTop: SPACING.spacing24,
  },
  mainArticleContent: {
    paddingTop: SPACING.spacing16,
  },
  articleTitle: {
    ...TEXT_STYLES.headingH2,
    color: COLORS.gray900,
    marginBottom: SPACING.spacing8,
  },
  articleDescription: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing16,
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing24,
  },
  readTime: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray500,
    marginLeft: SPACING.spacing4,
  },
  introBox: {
    backgroundColor: COLORS.purple100,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing24,
  },
  introText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray900,
    lineHeight: 24,
  },
  section: {
    marginBottom: SPACING.spacing24,
  },
  sectionTitle: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing12,
  },
  sectionText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    lineHeight: 24,
    marginBottom: SPACING.spacing12,
  },
  bulletList: {
    marginTop: SPACING.spacing8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.spacing8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.purple500,
    marginTop: 8,
    marginRight: SPACING.spacing12,
  },
  bulletText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    lineHeight: 24,
    flex: 1,
  },
  recommendationCards: {
    marginTop: SPACING.spacing12,
  },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    marginBottom: SPACING.spacing12,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recommendationImageContainer: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.spacing12,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.sm,
  },
  recommendationContent: {
    flex: 1,
    justifyContent: "center",
  },
  recommendationTitle: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  recommendationDescription: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing4,
  },
  recommendationReadTime: {
    ...TEXT_STYLES.caption,
    color: COLORS.gray500,
  },
  references: {
    marginTop: SPACING.spacing32,
    paddingTop: SPACING.spacing20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray300,
  },
  referencesText: {
    ...TEXT_STYLES.caption,
    color: COLORS.gray500,
    textAlign: "center",
  },
  dosageBox: {
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
  },
  dosageText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  disclaimerText: {
    ...TEXT_STYLES.caption,
    color: COLORS.gray500,
    fontStyle: 'italic',
  },
  foodSourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.spacing12,
  },
  foodSourceCard: {
    width: '48%',
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    marginBottom: SPACING.spacing8,
    alignItems: 'center',
  },
  foodSourceText: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray900,
    fontWeight: '500',
  },
});

export default ArticleDetailScreen; 