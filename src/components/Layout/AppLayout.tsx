import React from "react";
import { View } from "react-native";
import Sidebar from "../Sidebar/Sidebar";
import { Screen } from "../../theme/components";
import TopBar from "./TopBar";

const AppLayout = ({ title, children }) => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Screen>
        <TopBar title={title} />

        {children}
      </Screen>
    </View>
  );
};

export default AppLayout;
