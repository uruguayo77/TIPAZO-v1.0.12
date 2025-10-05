import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { colors } from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta pantalla no existe.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>¡Ir a la pantalla principal!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40, // Added top padding
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});