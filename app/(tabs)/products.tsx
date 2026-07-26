import { deleteProduct, getAllProducts } from "@/database/productOperation";
import { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { Product } from "@/types/product";
import EditProductModel from "@/components/ui/editProductModel";
import { showConfirm, showError } from "@/utils/alert";

export default function Products() {

    const [products, setProducts] = useState<Product[]>([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [selectProduct, setSelectProduct] = useState<Product | null>(null);


    const loadProduct = async () => {
        try {
            const productList = await getAllProducts();
            setProducts(productList);
        } catch (error) {
            showError(error)
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            await loadProduct();
        } catch (error) {
            showError(error)
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
                            onPress={() => {
                                showConfirm(
                                    "Delete Product",
                                    "Are you sure want to delete product",
                                    () => handleDelete(item.id)
                                )        
                            }}
                        />
                        <Button
                            title="Edit"
                            onPress={() => {
                                setSelectProduct(item)
                                setModalVisible(true)
                            }}
                        />

                    </View>
                )}
            />
            <EditProductModel
            visible={modalVisible}
            product={selectProduct}
            onClose={()=> setModalVisible(false)}
            onUpdated={loadProduct}
            />

        </View>

    );
}