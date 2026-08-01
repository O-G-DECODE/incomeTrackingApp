
import { getOpenShopProducts } from '@/database/productOperation';
import { useCallback, useState } from 'react';
import { Text, View , FlatList} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import SaleCounterCard from "@/components/ui/SalesCounterCard";

export default function HomeScreen(){
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [shopProduct, setShopProduct] = useState<any[]>([])
  
  useFocusEffect(
  useCallback(() => {
    loadShopProduct();
  }, [])
);
const increaseCount = (productId: number, size: string) => {
  const key = `${productId}-${size}`;

  setCounts(prev => ({
    ...prev,
    [key]: (prev[key] ?? 0) + 1,
  }));
};

const decreaseCount = (productId: number, size: string) => {
  const key = `${productId}-${size}`;

  setCounts(prev => ({
    ...prev,
    [key]: Math.max((prev[key] ?? 0) - 1, 0),
  }));
};
    async function loadShopProduct() {
      try{
        const businessDate = new Date().toISOString().split("T")[0]
        const rows = await getOpenShopProducts(businessDate);
        setShopProduct(rows)
        console.log(rows)
      }catch(error){
        console.log(error)
      }
      
    }
  
  return(

    <View style={ {padding:50, flex:1}}>  
  
      
      <Text> Todays Product</Text>

      <FlatList
  data={shopProduct}
  keyExtractor={(item) => item.productId.toString()}
  renderItem={({ item }) => (
    <SaleCounterCard
      product={item}

      fullCount={counts[`${item.productId}-FULL`] ?? 0}
      halfCount={counts[`${item.productId}-HALF`] ?? 0}
      quarterCount={counts[`${item.productId}-QUARTER`] ?? 0}

      onIncreaseFull={() =>
        increaseCount(item.productId, "FULL")
      }

      onDecreaseFull={() =>
        decreaseCount(item.productId, "FULL")
      }

      onIncreaseHalf={() =>
        increaseCount(item.productId, "HALF")
      }

      onDecreaseHalf={() =>
        decreaseCount(item.productId, "HALF")
      }

      onIncreaseQuarter={() =>
        increaseCount(item.productId, "QUARTER")
      }

      onDecreaseQuarter={() =>
        decreaseCount(item.productId, "QUARTER")
      }
    />
  )}
/>
      
    </View>
  )}

    
