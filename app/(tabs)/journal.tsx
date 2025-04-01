import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving entry:", entry);
    setEntry("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-primary">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="pb-2 border-b border-gray-200 mb-2">
            <View className="px-4 pb-2">
              <Text className="text-2xl font-bold text-gray-800">Journal</Text>
              <Text className="text-sm text-gray-600 mt-1">{currentDate}</Text>
            </View>
          </View>

          <View className="flex-1 px-4 py-2 pb-4">
            <TextInput
              className="flex-1 text-base text-gray-800 leading-relaxed bg-white rounded-lg p-4"
              multiline
              placeholder="Write your thoughts here..."
              value={entry}
              onChangeText={setEntry}
              textAlignVertical="top"
              style={styles.journalInput}
            />
          </View>

          <View className="px-4 pt-8 pb-6 flex items-center">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 rounded-full py-2 px-5 flex-row items-center self-center"
            >
              <Ionicons name="save-outline" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Save Entry</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  journalInput: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Noteworthy' : 'normal',
    fontSize: 18,
    lineHeight: 28,
    backgroundColor: '#fffef0',
    borderWidth: 1,
    borderColor: '#e0dfd0',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Journal;
