import { deleteProduct, getAllProducts, updateProduct } from "@/database/productOperation";
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
import EditProductModel from "@/components/ui/editProductModel";
import { showConfirm, showError } from "@/utils/alert";

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
            showError(error)
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            await loadProduct();
        } catch (error) {
            showError(error)
            console.log(error)
        }
    }

    const handleUpdate = async ()=> {
        if(!selectProduct) return;

        try{
            await updateProduct(
                selectProduct.id,
                editProductName,
                Number(editFullPrice),
                editHalfPrice.trim() == "" ? null : Number(editHalfPrice),
                editQuarterPrice.trim() == "" ? null : Number(editQuarterPrice)
            )
            Alert.alert("Edit product success")
            setModelVisibility(false)
            await loadProduct()
        }catch(error){
            showError(error)
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
                            onPress={() => {
                                showConfirm(
                                    "Delete Product",
                                    "Are you sure want to delete product",
                                    () => handleDelete
                                )        
                            }}
                        />
                        <Button
                            title="Edit"
                            onPress={() => {
                                setSelectProduct(item)
                                setModelVisibility(true)
                            }}
                        />

                    </View>
                )}
            />
            <EditProductModel
            visible={modalVisibility}
            product={selectProduct}
            onClose={()=> setModelVisibility(false)}
            onUpdated={loadProduct}
            />

        </View>

    );
}