import { AppCard, Screen } from "../../theme/components";
import { useTheme } from "../../theme/ThemeProvider";

export default function FilipinoAccolades() {
  const theme = useTheme();

  return (
    <Screen>
      <AppCard color={theme.colors.success}>
        <Text style={theme.typography.subtitle}>Lessons Completed: 5</Text>
      </AppCard>

      <AppCard color={theme.colors.error}>
        <Text style={theme.typography.subtitle}>Quizzes Completed: 2</Text>
      </AppCard>
    </Screen>
  );
}
