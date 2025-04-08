import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  _ScrollView,
} from "react-native";
import { Send } from "react-native-feather";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  // Scroll to end when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      // For inverted lists, scrollToEnd actually means scrolling to top
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  // Handle keyboard appearance
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        if (messages.length > 0) {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [messages.length]);

  // Function to call backend
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response, // Updated to match your backend
        role: "assistant",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Error: Unable to get response.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.assistantMessageText,
          ]}
        >
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
        >
          <View style={styles.contentContainer}>
            <View style={styles.chatContainer}>
              {messages.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateTitle}>
                    Welcome to Supportive Chat
                  </Text>
                  <Text style={styles.emptyStateText}>
                    Share what's on your mind, and I'm here to listen and
                    support you.
                  </Text>
                </View>
              ) : (
                <FlatList
                  ref={flatListRef}
                  data={[...messages].reverse()}
                  renderItem={renderMessage}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.messageList}
                  inverted
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  initialNumToRender={20}
                  maxToRenderPerBatch={10}
                  windowSize={21}
                  onContentSizeChange={() =>
                    flatListRef.current?.scrollToOffset({
                      offset: 0,
                      animated: false,
                    })
                  }
                  onLayout={() =>
                    flatListRef.current?.scrollToOffset({
                      offset: 0,
                      animated: false,
                    })
                  }
                  maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                    autoscrollToTopThreshold: 10,
                  }}
                />
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type your message here..."
                  multiline
                  maxLength={500}
                  placeholderTextColor="#888"
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                  blurOnSubmit={Platform.OS === "ios"}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    (!input.trim() || isLoading) && styles.sendButtonDisabled,
                  ]}
                  onPress={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Send stroke="#fff" width={16} height={16} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAE5D6" },
  contentContainer: { flex: 1, justifyContent: "space-between" },
  keyboardAvoidingView: { flex: 1 },
  chatContainer: {
    flex: 1,
    margin: 15,
    padding: 5,
    backgroundColor: "rgba(244, 223, 205, 0.3)",
    borderRadius: 20,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#B76E79",
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: { fontSize: 16, lineHeight: 22 },
  userMessageText: { color: "#fff" },
  assistantMessageText: { color: "#333" },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#EAE5D6",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingRight: 4,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
    maxHeight: 120, // Limit max height for multi-line input
  },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: "#B76E79",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  sendButtonDisabled: { backgroundColor: "#D4A5AC" },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: "90%",
  },
});
