import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Sidebar from "../Sidebar/Sidebar";
import { Screen } from "../../theme/components";
import TopBar from "./TopBar";

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
  animatedStartXP?: number | null;
  animatedEndXP?: number | null;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  children,
  animatedStartXP = null,
  animatedEndXP = null,
}) => {
  const route = useRoute();

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Sidebar />

      <View style={{ flex: 1 }}>
        <Screen>
          <TopBar
            key={route.name}
            title={title}
            animatedStartXP={animatedStartXP}
            animatedEndXP={animatedEndXP}
            showXPBadge={false} // 🔒 ALWAYS OFF here
          />

          {children}
        </Screen>
      </View>
    </View>
  );
};

export default AppLayout;
