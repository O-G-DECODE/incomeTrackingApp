import { deleteProduct, getAllProducts } from "@/database/productOperation";
import { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    Button,
    Modal,
    TextInput
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { Product } from "@/types/product";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [modalVisibility, setModelVisibility] = useState(false)

    const [editProductName, setEditProductName] = useState("");
    const [editFullPrice, setEditFullPrice] = useState("");
    const [editHalfPrice, setEditHalfPrice] = useState("");
    const [editQuarterPrice, setEditQuarterPrice] = useState("");

    const [selectProduct, setSelectProduct] = useState<Product | null>(null);


    const loadProduct = async () => {
        try {
            const productList = await getAllProducts();
            setProducts(productList);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            await loadProduct();
        } catch (error) {
            alert("Product not deleted")
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadProduct();

            return () => {
                // Optional cleanup
            };
        }, [])
    );

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            {"\n"}
                            {item.productName}
                            {"\n"}
                            ₹{item.fullPrice}
                            {"\n"}
                            {item.halfPrice !== null
                                ? `Half : ₹${item.halfPrice}`
                                : ""}
                            {"\n"}
                            {item.quarterPrice !== null
                                ? `Quarter : ₹${item.quarterPrice}`
                                : ""}
                            {"\n"}
                        </Text>
                        <Button
                            title="Delete"
                            onPress={() => Alert.alert('Delete Product', "Are you sure to delete product",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => handleDelete(item.id),
                                    },
                                ]
                            )}
                        />
                        <Button
                            title="Edit"
                            onPress={() => {
                                setSelectProduct(item)
                                setModelVisibility(true)
                            }}
                        />
                        <Modal
                            visible={modalVisibility}
                            animationType="slide"
                            transparent={true}
                        >
                            <View>
                                <Text> Edit Text</Text>

                                <TextInput
                                placeholder="Product Name"
                                value={editProductName}
                                onChangeText={setEditProductName}
                                />
                                <TextInput
                                placeholder="Full Price"
                                value={editFullPrice}
                                onChangeText={setEditFullPrice}
                                />
                                <TextInput
                                placeholder="Half price"
                                value={editHalfPrice}
                                onChangeText={setEditHalfPrice}
                                />
                                <TextInput
                                placeholder="Quarter price"
                                value={editQuarterPrice}
                                onChangeText={setEditQuarterPrice}
                                />

                                <Button
                                title="Cancel"
                                onPress={() => setModelVisibility(false)}
                                />

                                <Button
                                title="Update"  
                                />
                            </View>
                        </Modal>
                    </View>
                )}
            />

        </View>

    );
}