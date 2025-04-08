export const submitJournal = async ({
  title,
  content,
  mood_keyword,
  user_id,
}: {
  title: string;
  content: string;
  mood_keyword?: string;
  user_id: string;
}) => {
  const response = await fetch("http://192.168.20.216:3000/journal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, mood_keyword, user_id }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit journal");
  }

  return await response.json();
};
