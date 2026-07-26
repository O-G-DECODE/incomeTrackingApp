import { Alert } from "react-native";

export function showError(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  Alert.alert("Error", message);
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void
) {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "OK",
      onPress: onConfirm,
    },
  ]);
}