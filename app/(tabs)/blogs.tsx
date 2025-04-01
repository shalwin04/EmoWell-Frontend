import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const blogs = [
  {
    id: 1,
    title: 'Managing Anxiety',
    description: 'Learn effective ways to cope with anxiety and stress in your daily life.',
    image: 'https://picsum.photos/300/200',
  },
  {
    id: 2,
    title: 'Mindfulness Tips',
    description: 'Practice mindfulness to improve your mental well-being and reduce stress.',
    image: 'https://picsum.photos/300/201',
  },
  {
    id: 3,
    title: 'Healthy Sleep Habits',
    description: 'Develop good sleep routines for better mental health and daily energy.',
    image: 'https://picsum.photos/300/202',
  },
  {
    id: 4,
    title: 'Dealing with Stress',
    description: 'Effective strategies to manage stress and maintain work-life balance.',
    image: 'https://picsum.photos/300/203',
  },
];

export default function BlogsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary px-4 pt-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4 mt-0">Latest Articles</Text>
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap justify-between">
          {blogs.map((blog) => (
            <TouchableOpacity
              key={blog.id}
              className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-lg"
              onPress={() => router.push(`/blog/${blog.id}`)}
            >
              <View className="relative">
                <Image 
                  source={{ uri: blog.image }} 
                  className="w-full h-36 rounded-lg"
                />
                <View className="absolute inset-0 bg-black/20 rounded-lg" />
              </View>
              <Text className="text-lg font-semibold mt-2 text-gray-900">{blog.title}</Text>
              <Text className="text-sm text-gray-700 mt-1" numberOfLines={2}>{blog.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

