import AddProductForm from "@/components/ui/addProductForm";
import { useState } from "react";
import { Button, View } from "react-native";

export default function Admin() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [openShop, setOpenShop] = useState(false);

  return (
   <View style={{ flex: 1, padding: 20 }}>
      { !showAddProduct ? (
        <>
          <Button
            title="Add Product"
            onPress={() => {
              console.log("Button Pressed");
              setShowAddProduct(true)}}
          />

          <Button
            title="Open Shop"
            onPress={() => setOpenShop(true)}
          />
        </>
      ) : (
        <AddProductForm
          onClose={() => setShowAddProduct(false)}
        />
      )}
    </View>
  );
}