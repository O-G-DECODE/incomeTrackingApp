import { deleteProduct } from "@/database/productOperation";
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
import { loadProducts } from "@/database/productService";


export default function Products() {

    const [products, setProducts] = useState<Product[]>([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [selectProduct, setSelectProduct] = useState<Product | null>(null);

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            await loadProducts(setProducts);
        } catch (error) {
            showError(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadProducts(setProducts);

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
            onUpdated={()=> loadProducts(setProducts)}
            />

        </View>

    );
}