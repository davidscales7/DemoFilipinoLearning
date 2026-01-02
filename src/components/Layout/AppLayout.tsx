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
  showXPBadge?: boolean; // ✅ control XP ring
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  children,
  animatedStartXP = null,
  animatedEndXP = null,
  showXPBadge = true, // ✅ DEFAULT ON
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
            showXPBadge={showXPBadge}
          />

          {children}
        </Screen>
      </View>
    </View>
  );
};

export default AppLayout;
