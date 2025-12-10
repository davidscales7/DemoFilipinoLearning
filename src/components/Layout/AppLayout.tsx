import React from "react";
import { View } from "react-native";
import Sidebar from "../Sidebar/Sidebar";
import { Screen } from "../../theme/components";
import TopBar from "./TopBar";

const AppLayout = ({
  title,
  children,
  animatedStartXP = null,
  animatedEndXP = null,
}) => {

console.log("APP LAYOUT MOUNTED");

  console.log("Title passed to AppLayout:", title);

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Sidebar />

      <Screen>
        <TopBar
          title={title}
          animatedStartXP={animatedStartXP}
          animatedEndXP={animatedEndXP}
        />

        {children}
      </Screen>
    </View>
  );
};

export default AppLayout;
