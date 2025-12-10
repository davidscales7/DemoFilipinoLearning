import React from "react";
import { View } from "react-native";
import Sidebar from "../Sidebar/Sidebar";
import { Screen } from "../../theme/components";
import TopBar from "./TopBar";
import { useRoute } from "@react-navigation/native";

const AppLayout = ({
  title,
  children,
  animatedStartXP = null,
  animatedEndXP = null,
}) => {
  const route = useRoute();

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>

      <Sidebar />

      {/* Screen wrapper FIX */}
      <View style={{ flex: 1, overflow: "visible" }}>
        <Screen>

          {/* TopBar must NOT be clipped */}
          <View
            style={{
              zIndex: 10,
              paddingBottom: 10,
              overflow: "visible",
            }}
          >
            <TopBar
              
              title={title}
              animatedStartXP={animatedStartXP}
              animatedEndXP={animatedEndXP}
            />
          </View>

          {/* page content */}
          <View style={{ flex: 1, overflow: "visible" }}>
            {children}
          </View>

        </Screen>
      </View>

    </View>
  );
};

export default AppLayout;
