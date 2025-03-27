import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Send } from "react-native-feather";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export default function ChatSceeen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffffff');
      StatusBar.setTranslucent(false);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, this would call your API
      const response = await fetchAIResponse(userMessage.content);

      // Add AI response to the chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Optionally, display an error message in the chat here.
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate API call to your backend
  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    // Replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("It's completely normal to feel anxious sometimes");
      }, 1500); // Simulate network delay
    });
  };

  // Render an individual message
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EAE5D6' }} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1 }}>
          {/* Header Tab */}
          <View style={styles.headerContainer}>
            <Text className="font-playBold text-2xl text-burgundy text-center">Supportive Chat</Text>
            <View style={styles.headerLine}>
              <View style={styles.headerLineInner} />
            </View>
          </View>

          {/* Chat Container */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          >
            <View className="flex-1 px-4">
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(244, 223, 205, 0.3)",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                {messages.length === 0 ? (
                  <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateTitle}>
                      Welcome to Supportive Chat
                    </Text>
                    <Text style={styles.emptyStateText}>
                      Share what's on your mind, and I'm here to listen and support you.
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messageList}
                  />
                )}

                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={input}
                      onChangeText={setInput}
                      placeholder="Type your message here..."
                      multiline
                      maxLength={500}
                      placeholderTextColor="#666"
                      returnKeyType="send"
                      onSubmitEditing={handleSend}
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
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#EAE5D6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    position: 'relative',
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#B76E79',
    opacity: 0.8,
    shadowColor: '#B76E79',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLineInner: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#D4A5AC',
    opacity: 0.6,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  messageList: {
    padding: 16,
    flexGrow: 1,
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
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#fff",
  },
  assistantMessageText: {
    color: "#333",
  },
  inputContainer: {
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 120,
    color: "#333",
    minHeight: 40,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#B76E79",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#D4A5AC",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
