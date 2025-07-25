import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import SubHeader from "../components/SubHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TEXT_STYLES } from "../styles/globalStyles";
import CommonButton from "../components/CommonButton";
import CommonInput from "../components/CommonInput";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about pregnancy." },
  ]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/chatWithBot`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Please answer only in the context of pregnancy and reply in a maximum of 5 lines:\n${input}`,
          }),
        }
      );
      console.log("input", input);

      const data = await res.json();
      const botMsg = { from: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to the bot." },
      ]);
    }

    setInput("");

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <>
      <SubHeader title="AI Assistant" />

      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust 80 to your SubHeader height if needed
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatBox}
            contentContainerStyle={{}}
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.from === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.from === "user" ? styles.userText : styles.botText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your question..."
            />
            <CommonButton
              label="Send"
              onPress={sendMessage}
              style={styles.sendButton}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  chatBox: { flex: 1 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    marginTop: 12,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingVertical: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing16,
    backgroundColor: COLORS.white,
    fontFamily: TEXT_STYLES.bodyBase.fontFamily,
    fontSize: 16,
    color: COLORS.gray900,
    flex: 4, // 80%
    marginRight: 6,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.pink500,
    borderTopRightRadius: 0,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#000",
  },
  botText: {
    color: "#000",
  },
  sendButton: {
    width: "20%",
  },
});
