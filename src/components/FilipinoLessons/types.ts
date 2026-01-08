import { MaterialCommunityIcons } from "@expo/vector-icons";

export type IconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

export type Lesson = {
  title: string;
  icon: IconName; // ✅ NOT string
  color: string;
  locked: boolean;
  completed?: boolean;
  onPress: () => void;
};

export type Chapter = {
  number: number;
  title: string;
  lessons: Lesson[];
};
