
import { loadProducts } from '@/database/productService';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


export default function HomeScreen(){
  
  const [shopProduct, setShopProduct] = useState<any[]>([])
  useEffect(() => {
    async function loadShopProduct() {
      const date = businessDate.toISOString().split("T")[0];
      const rows = await getOpenShopProducts(date);
    }
    
  })
  return(
    <View>    
      
    </View>
  );
}
  
    
