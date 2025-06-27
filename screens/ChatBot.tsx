import React, { useState } from "react";
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
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about pregnancy." },
  ]);
  const [input, setInput] = useState("");

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
          body: JSON.stringify({ message: input }),
        }
      );
      console.log(input, "innnn");

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
  };

  return (
    <>
      <Header title="AI assistant" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.chatBox}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, index) => (
            <Text
              key={index}
              style={msg.from === "bot" ? styles.bot : styles.user}
            >
              {msg.from === "bot" ? "🤖" : "👩"} {msg.text}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your question..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  chatBox: { flex: 1, marginBottom: 10 },
  bot: { color: "blue", marginVertical: 4 },
  user: { color: "black", textAlign: "right", marginVertical: 4 },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 40 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,

    marginRight: 8,
    borderRadius: 8,
  },
});
