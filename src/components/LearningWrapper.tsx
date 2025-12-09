import React from "react";
import { View } from "react-native";
import Sidebar from "./Sidebar/Sidebar";
import TopBar from "./Layout/TopBar";

const LearningWrapper = ({ children, title = "Lesson" }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      
      {/* Sidebar stays always visible */}
      <Sidebar />

      <View style={{ flex: 1 }}>
        {/* Top bar always visible — includes ProgressRing */}
        <TopBar title={title} />

        {/* Actual screen content */}
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default LearningWrapper;
