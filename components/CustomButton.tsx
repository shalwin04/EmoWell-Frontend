import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      //   activeOpacity={0.8}
      style={{
        backgroundColor: "primary",
        padding: 8,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: "black",
        width: 80,
        alignSelf: "flex-end",
      }}
      className={`justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-lg font-pRegular ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
