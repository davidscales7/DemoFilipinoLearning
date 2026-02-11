import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useProfileStore } from "../../store/useProfileStore";

const ProfileHeader = () => {
  const theme = useTheme();

  const username = useProfileStore((s) => s.username);
  const setUsername = useProfileStore((s) => s.setUsername);
  const streak = useProfileStore((s) => s.streak);
  const bumpStreakForToday = useProfileStore((s) => s.bumpStreakForToday);

  const [tempName, setTempName] = useState("");

  useEffect(() => {
    bumpStreakForToday();
  }, [bumpStreakForToday]);

  const greeting = useMemo(() => {
    const hours = new Date().getHours();
    return hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
  }, []);

  // If no username yet, show a tiny local “setup”
  if (!username) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <View style={{ flex: 1 }}>
          <Text style={[theme.typography.subtitle, { marginBottom: 8 }]}>
            Welcome! 👋 What should we call you?
          </Text>

          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter a name"
              placeholderTextColor={theme.colors.textSecondary}
              style={[
                styles.input,
                { borderColor: theme.colors.border ?? "#E5E7EB", color: theme.colors.textPrimary },
              ]}
            />

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => setUsername(tempName)}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 10 }]}>
            (Saved locally on this device)
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <Text style={styles.avatar}>👤</Text>

        <View>
          <Text style={[theme.typography.subtitle, { marginBottom: 4 }]}>
            {greeting}, {username}! 👋
          </Text>

          <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
            🔥 {streak}-day streak • ⭐ Beginner
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    justifyContent: "space-between",
  },
  avatar: {
    fontSize: 46,
    marginRight: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveBtnText: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default ProfileHeader;
