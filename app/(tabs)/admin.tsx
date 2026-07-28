import AddProductForm from "@/components/ui/addProductForm";
import OpenShop from "@/components/ui/openShopModal";
import { Button, View } from "react-native";
import { useState } from "react";

type Screen = "menu" | "addProduct" | "openShop";

export default function Admin() {
  const [screen, setScreen] = useState<Screen>("menu");

  if (screen === "addProduct") {
    return (
      <AddProductForm
        onClose={() => setScreen("menu")}
      />
    );
  }

  if (screen === "openShop") {
    return (
      <OpenShop
        onClose={() => setScreen("menu")}
      />
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 15 }}>
      <Button
        title="Add Product"
        onPress={() => setScreen("addProduct")}
      />

      <Button
        title="Open Shop"
        onPress={() => setScreen("openShop")}
      />
    </View>
  );
}