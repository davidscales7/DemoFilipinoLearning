import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

import AppLayout from "../../components/Layout/AppLayout";
import { AppCard } from "../../theme/components";
import { useTheme } from "../../theme/ThemeProvider";

type ApiState = {
  accolades: string[];
  quizAccolades: string[];
  flashCardAccolades: string[];
};

const FilipinoAccolades: React.FC = () => {
  const theme = useTheme();

  const [data, setData] = useState<ApiState>({
    accolades: [],
    quizAccolades: [],
    flashCardAccolades: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [aRes, qRes, fRes] = await Promise.all([
          fetch("http://localhost:3000/accolades", { method: "GET", headers }),
          fetch("http://localhost:3000/quizAccolades", { method: "GET", headers }),
          fetch("http://localhost:3000/flashCardAccolades", { method: "GET", headers }),
        ]);

        const parseOrThrow = async (res: Response) => {
          const json = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(json?.error || "Failed to fetch accolades");
          return json;
        };

        const aJson = await parseOrThrow(aRes);
        const qJson = await parseOrThrow(qRes);
        const fJson = await parseOrThrow(fRes);

        setData({
          accolades: aJson.accolades || [],
          quizAccolades: qJson.quizAccolades || [],
          flashCardAccolades: fJson.flashCardAccolades || [],
        });
      } catch (e: any) {
        setError(e?.message ?? "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const sections = useMemo(
    () => [
      { title: "Lessons", icon: "📘", items: data.accolades, color: theme.colors.secondary },
      { title: "Quizzes", icon: "🧠", items: data.quizAccolades, color: theme.colors.accent },
      { title: "Flashcards", icon: "🃏", items: data.flashCardAccolades, color: theme.colors.primary },
    ],
    [data, theme.colors]
  );

  if (loading) {
    return (
      <AppLayout title="Accolades">
        <View style={{ alignItems: "center", marginTop: theme.spacing.xl }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: theme.spacing.md, color: theme.colors.textSecondary }}>
            Loading accolades...
          </Text>
        </View>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="Accolades">
        <AppCard color={theme.colors.accent}>

          <Text style={[theme.typography.subtitle, { textAlign: "center" }]}>Oops</Text>
          <Text style={{ textAlign: "center", marginTop: 6, color: theme.colors.textSecondary }}>
            {error}
          </Text>
        </AppCard>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Accolades">
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        <Text style={[theme.typography.body, { textAlign: "center", color: theme.colors.textSecondary, marginBottom: theme.spacing.lg }]}>
          Earn accolades by completing lessons, quizzes, and flashcards.
        </Text>

        <View style={{ gap: theme.spacing.md }}>
          {sections.map((sec) => (
            <View key={sec.title} style={{ gap: theme.spacing.sm }}>
              <Text style={[theme.typography.subtitle, { marginLeft: theme.spacing.xs }]}>
                {sec.icon} {sec.title}
              </Text>

              {sec.items.length ? (
                sec.items.map((label, idx) => (
                  <AppCard key={`${sec.title}-${idx}`} color={sec.color}>
                    <Text style={{ textAlign: "center", color: theme.colors.textLight ?? "#fff", fontWeight: "700" }}>
                      {label}
                    </Text>
                  </AppCard>
                ))
              ) : (
                <Text style={{ textAlign: "center", color: theme.colors.textSecondary }}>
                  No {sec.title.toLowerCase()} accolades yet.
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default FilipinoAccolades;
