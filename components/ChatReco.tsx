import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, EFFECTS, RADIUS, SPACING, TEXT_STYLES } from "../styles/globalStyles";

type Props = {
  bpReading: {
    systolic: string;
    diastolic: string;
    status: string;
  } | null;
  weightReading: {
    value: string;
    unit: "kg" | "lbs";
    date: string;
  } | null;
};

export default function HealthRecoAI({ bpReading, weightReading }: Props) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  // const AI_RECO_API_KEY = "";
  const AI_RECO_API_KEY = process.env.AI_RECO_API_KEY; // Replace with env variable securely

  

  const getAdvice = async () => {
    if (!bpReading && !weightReading) return;
    setLoading(true);
    setAdvice("");

    const bp = bpReading ? `${bpReading.systolic}/${bpReading.diastolic}` : "unknown";
    const weight = weightReading ? `${weightReading.value}` : "unknown";

    const prompt = `I am pregnant. My blood pressure is ${bp}, weight is ${weight}kg. Can you give me pregnancy-specific diet and exercise recommendations in 3-4 short lines only?`;

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AI_RECO_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "system",
              content: "You are a helpful pregnancy health assistant. Respond briefly in 3-4 short lines.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setAdvice(json.choices[0].message.content);
      } else {
        setAdvice(`Error ${res.status}: ${json.error?.message || "Unknown error"}`);
      }
    } catch (e) {
      setAdvice("Network error.");
    }

    setLoading(false);
  };

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (bpReading || weightReading) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        getAdvice();
      }, 500);
    }
  }, [bpReading, weightReading]);

  // Split advice into lines for bullet display
  const adviceLines = advice ? advice.split("\n").filter(line => line.trim() !== "") : [];

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.gray700} />
      ) : adviceLines.length > 0 ? (
        adviceLines.map((line, index) => (
          <View key={index} style={styles.bulletContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.adviceText}>{line.trim()}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.adviceText}>
          AI recommendations will appear here when data is available.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 20,
    marginRight: 8,
    // color: COLORS.gray800,
  },
  adviceText: {
    ...TEXT_STYLES.bodyBase,
    // color: COLORS.gray800,
    flex: 1,
    lineHeight: 20,
  },
});
