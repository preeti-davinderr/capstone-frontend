import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonButton from "../../components/CommonButton";
import {
  COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
} from "../../styles/globalStyles";
import CommonDateInput from "../../components/CommonDateInput";
import CommonInput from "../../components/CommonInput";

const pages = [
  {
    icon: require("../../assets/splash/heart.png"),
    title: "MOMents",
    subtitleLines: [
      "Your journey through pregnancy, beautifully documented and lovingly supported",
    ],
    buttonLabel: "Continue",
  },
  {
    icon: require("../../assets/splash/person.png"),
    title: "Let's Get Personal",
    subtitle: "Help us customize your experience",
    buttonLabel: "Almost Done",
  },
  {
    icon: require("../../assets/splash/star.png"),
    title: "You’re All Set!",
    subtitle:
      "Your pregnancy journey is unique and beautiful. We're here to support you every step of the way with personalized insights, gentle reminders, and a safe space to capture your precious moments.",
    quote:
      "“Every moment matters. Every feeling is valid. You’ve got this, mama!”",
    buttonLabel: "Let’s Start Your Journey",
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();

  const [nickName, setName] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isFirstPregnancy, setIsFirstPregnancy] = useState<null | boolean>(
    null
  );

  const page = pages[step];

  const handleNext = async () => {
    if (step === 1) {
      if (!nickName || !dueDate || isFirstPregnancy === null) {
        alert("Please complete all fields.");
        return;
      }
      const userData = {
        nickName,
        dueDate: dueDate.toISOString(),
        isFirstPregnancy,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      console.log("Saving user to AsyncStorage:", userData);
    }

    if (step < 2) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem("hasOnboarded", "true");
      navigation.replace("SignIn");
      // navigation.replace("MainApp");
    }
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            step === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const renderStep0 = () => (
    <>
      <Text style={styles.title}>{page.title}</Text>

      {page.subtitleLines?.length === 1 && (
        <Text style={styles.subtitle}>{page.subtitleLines[0]}</Text>
      )}

      <View style={styles.cardColumn}>
        {[
          {
            icon: require("../../assets/splash/baby.png"),
            label: "Track your baby's growth week by week",
          },
          {
            icon: require("../../assets/splash/camera.png"),
            label: "Capture and share precious moments",
          },
          {
            icon: require("../../assets/splash/share.png"),
            label: "Share special moments with family",
          },
        ].map((item, idx) => (
          <View key={idx} style={styles.featureCard}>
            <Image source={item.icon} style={styles.cardIcon} />
            <Text style={styles.cardText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderStep1 = () => (
    <>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.subtitle}>{page.subtitle}</Text>

      <Text style={styles.question}>What should we call you?</Text>
      <CommonInput
        placeholder="Your name"
        value={nickName}
        onChangeText={setName}
      />

      <Text style={styles.question}>When is your due date?</Text>
      <CommonDateInput date={dueDate} onChange={(d) => setDueDate(d)} />

      <Text style={styles.question}>Is this your first pregnancy?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setIsFirstPregnancy(true)}
        >
          <View
            style={[
              styles.radioOuter,
              isFirstPregnancy === true && styles.radioChecked,
            ]}
          >
            {isFirstPregnancy === true && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>Yes, This is my first time</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setIsFirstPregnancy(false)}
        >
          <View
            style={[
              styles.radioOuter,
              isFirstPregnancy === false && styles.radioChecked,
            ]}
          >
            {isFirstPregnancy === false && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>No, I have conceived before</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.subtitle}>{page.subtitle}</Text>
      {page.quote && (
        <View style={styles.quoteCard}>
          <Image source={pages[0].icon} style={styles.iconSmall} />
          <Text style={styles.quote}>{page.quote}</Text>
        </View>
      )}
    </>
  );

  return (
    <>
      <StatusBar backgroundColor={COLORS.peach400} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.topPeachArea} />

        {/* Card Content */}
        <View style={styles.whiteCard}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View style={styles.iconInside}>
              <Image source={page.icon} style={styles.icon} />
            </View>

            <ScrollView
              contentContainerStyle={{
                ...styles.scrollContent,
                paddingBottom: SPACING.spacing16,
              }}
              keyboardShouldPersistTaps="handled"
            >
              {step === 0 && renderStep0()}
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
            </ScrollView>
            {/* </View> */}

            <View
              style={[
                styles.footer,
                {
                  paddingBottom: insets.bottom + SPACING.spacing24,
                },
              ]}
            >
              {renderDots()}
              <CommonButton label={page.buttonLabel} onPress={handleNext} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.peach400,
  },
  topPeachArea: {
    position: "absolute",
    top: 0,
    height: 200,
    left: 0,
    right: 0,
    backgroundColor: COLORS.peach400,
    zIndex: -1,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    borderTopLeftRadius: RADIUS.lg + 18,
    borderTopRightRadius: RADIUS.lg + 18,
    marginTop: 80,
    overflow: "hidden",
    paddingHorizontal: SPACING.spacing48,
    alignItems: "center", // ⬅️ add this
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  iconSmall: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: SPACING.spacing4,
  },
  iconInside: {
    marginTop: SPACING.spacing32,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderRadius: 64,
    width: 114,
    height: 114,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray100,
    ...EFFECTS.shadowLarge,
  },
  scrollContent: {
    paddingTop: SPACING.spacing32,
    width: "100%", // ⬅️ ensure width consistency
    maxWidth: 360, // ⬅️ set max width so it looks centered on wider phones
    alignItems: "center",
  },
  title: {
    ...TEXT_STYLES.displayH1,
    textAlign: "center",
    marginBottom: SPACING.spacing12,
  },
  subtitle: {
    ...TEXT_STYLES.subheading,
    textAlign: "center",
    marginBottom: SPACING.spacing8,
  },
  radioOption: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    padding: SPACING.spacing12,
    borderRadius: RADIUS.md,
  },
  radioSelected: {
    borderColor: COLORS.purple500,
    backgroundColor: COLORS.purple100,
  },
  quoteCard: {
    width: 300,
    height: 156,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    padding: SPACING.spacing8,
    justifyContent: "center",
    alignItems: "center",
    ...EFFECTS.softShadow,
    alignSelf: "center",
    marginTop: SPACING.spacing48,
  },
  quote: {
    ...TEXT_STYLES.lead,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: SPACING.spacing8,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: SPACING.spacing8,
    marginBottom: SPACING.spacing16,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.purple500,
  },
  inactiveDot: {
    width: 10,
    backgroundColor: "transparent",
    borderColor: COLORS.gray500,
    borderWidth: 1,
  },
  cardColumn: {
    width: "100%",
    marginTop: SPACING.spacing24,
    gap: SPACING.spacing16,
  },
  featureCard: {
    width: 300,
    height: 80,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.6)", // #FFFFFF99
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: SPACING.spacing16,
    ...EFFECTS.softShadow,
  },

  cardIcon: {
    width: 21,
    height: 30,
    resizeMode: "contain",
  },
  cardText: {
    ...TEXT_STYLES.bodySmall,
    fontWeight: "500",
    textAlign: "center",
  },
  question: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "500",
    marginTop: SPACING.spacing20,
    marginBottom: SPACING.spacing8,
    alignSelf: "flex-start",
  },
  radioGroup: {
    width: "100%",
    marginTop: SPACING.spacing4,
    gap: SPACING.spacing16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.spacing12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray900,
    justifyContent: "center",
    alignItems: "center",
  },
  radioChecked: {
    borderColor: COLORS.purple500,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.purple500,
  },
  radioLabel: {
    fontSize: 16,
    color: COLORS.gray900,
    fontFamily: TEXT_STYLES.bodySmall.fontFamily,
  },
});

export default OnboardingScreen;
