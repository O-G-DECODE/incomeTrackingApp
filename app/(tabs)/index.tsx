import { useCallback, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SaleCounterCard from "@/components/ui/SalesCounterCard";

import { getOpenShopProducts } from "@/database/productOperation/getOpenShopProduct";
import { getTodaySales } from "@/database/productOperation/getTodaySales";
import { saveTodaySales } from "@/database/productOperation/saveTodaySales";

import { ShopProduct } from "@/types/shopProducts";

export default function HomeScreen() {

  const [shopProduct, setShopProduct] = useState<ShopProduct[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    await loadShopProduct();
    await loadTodaySales();
  }

  async function loadShopProduct() {
    try {

      const businessDate =
        new Date().toISOString().split("T")[0];

      const rows =
        await getOpenShopProducts(businessDate);

      setShopProduct(rows);

    } catch (error) {
      console.log(error);
    }
  }

  async function loadTodaySales() {

    try {

      const businessDate =
        new Date().toISOString().split("T")[0];

      const rows =
        await getTodaySales(businessDate);

      const loadedCounts: Record<string, number> = {};

      rows.forEach((sale: any) => {

        loadedCounts[
          `${sale.productId}-${sale.size}`
        ] = sale.count;

      });

      setCounts(loadedCounts);

    } catch (error) {
      console.log(error);
    }

  }

  function increaseCount(
    productId: number,
    size: string
  ) {

    const key = `${productId}-${size}`;

    setCounts(prev => ({
      ...prev,
      [key]: (prev[key] ?? 0) + 1,
    }));

  }

  function decreaseCount(
    productId: number,
    size: string
  ) {

    const key = `${productId}-${size}`;

    setCounts(prev => ({
      ...prev,
      [key]: Math.max(
        (prev[key] ?? 0) - 1,
        0
      ),
    }));

  }

  async function handleSaveSales() {

    try {

      const businessDate =
        new Date().toISOString().split("T")[0];

      await saveTodaySales(
        businessDate,
        counts
      );

      alert("Sales Saved");

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Today's Products
      </Text>

      <FlatList
        data={shopProduct}
        keyExtractor={(item) =>
          item.productId.toString()
        }
        renderItem={({ item }) => (

          <SaleCounterCard

            product={item}

            fullCount={
              counts[
                `${item.productId}-FULL`
              ] ?? 0
            }

            halfCount={
              counts[
                `${item.productId}-HALF`
              ] ?? 0
            }

            quarterCount={
              counts[
                `${item.productId}-QUARTER`
              ] ?? 0
            }

            onIncreaseFull={() =>
              increaseCount(
                item.productId,
                "FULL"
              )
            }

            onDecreaseFull={() =>
              decreaseCount(
                item.productId,
                "FULL"
              )
            }

            onIncreaseHalf={() =>
              increaseCount(
                item.productId,
                "HALF"
              )
            }

            onDecreaseHalf={() =>
              decreaseCount(
                item.productId,
                "HALF"
              )
            }

            onIncreaseQuarter={() =>
              increaseCount(
                item.productId,
                "QUARTER"
              )
            }

            onDecreaseQuarter={() =>
              decreaseCount(
                item.productId,
                "QUARTER"
              )
            }

          />

        )}
      />

      <Button
        title="Save Sales"
        onPress={handleSaveSales}
      />

    </View>

  );
}