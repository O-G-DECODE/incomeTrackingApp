import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";

import type { Product } from "@/types/product";
import { updateProduct } from "@/database/productOperation";
import { showError } from "@/utils/alert";

interface EditProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditProductModal({
  visible,
  product,
  onClose,
  onUpdated,
}: EditProductModalProps) {
    
  const [productName, setProductName] = useState("");
  const [fullPrice, setFullPrice] = useState("");
  const [halfPrice, setHalfPrice] = useState("");
  const [quarterPrice, setQuarterPrice] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setFullPrice(product.fullPrice.toString());
      setHalfPrice(product.halfPrice?.toString() ?? "");
      setQuarterPrice(product.quarterPrice?.toString() ?? "");
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!product) return;

    if (productName.trim() === "" || fullPrice.trim() === "") {
      Alert.alert("Validation", "Please fill all required fields.");
      return;
    }

    try {
      await updateProduct(
        product.id,
        productName,
        Number(fullPrice),
        halfPrice.trim() === "" ? null : Number(halfPrice),
        quarterPrice.trim() === "" ? null : Number(quarterPrice)
      );

      Alert.alert("Success", "Product updated.");

      onUpdated();
      onClose();
    } catch (error) {
      console.log(error);
      showError(error)
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View>

        <Text>Edit Product</Text>

        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />

        <TextInput
          placeholder="Full Price"
          keyboardType="numeric"
          value={fullPrice}
          onChangeText={setFullPrice}
        />

        <TextInput
          placeholder="Half Price"
          keyboardType="numeric"
          value={halfPrice}
          onChangeText={setHalfPrice}
        />

        <TextInput
          placeholder="Quarter Price"
          keyboardType="numeric"
          value={quarterPrice}
          onChangeText={setQuarterPrice}
        />

        <Button
          title="Cancel"
          onPress={onClose}
        />

        <Button
          title="Update"
          onPress={handleUpdate}
        />

      </View>
    </Modal>
  );
}