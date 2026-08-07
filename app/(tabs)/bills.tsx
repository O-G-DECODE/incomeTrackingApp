import { loadProducts } from "@/database/productService";
import { Product } from "@/types/product";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { DailySales } from "@/components/reports/dailySales";
import { MonthlySales } from "@/components/reports/monthlySales";

export default function Bills() {

    const [products, setProducts] = useState<Product[]>([])
    const [selectedScreen, setSelectedScreen] = useState<'dailyCollection' | 'monthlyCollection'>('dailyCollection')

    useEffect(() => {
        loadProducts(setProducts);
    }, []);

    return (
        <View style={{flex:1, padding: 20 }}>

            <TouchableOpacity
                onPress={() => {
                    setSelectedScreen('dailyCollection')
                }}>
                <Text> Daily Sales</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setSelectedScreen('monthlyCollection')
                }}>
                <Text> Monthly Sales</Text>
            </TouchableOpacity>
            {
                selectedScreen === 'dailyCollection' ? (
                    <DailySales />
                ) : (<MonthlySales />
                )
            }

        </View>
    )
}