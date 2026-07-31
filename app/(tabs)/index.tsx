
import { getOpenShopProducts } from '@/database/productOperation';
import { useCallback, useState } from 'react';
import { Text, View , FlatList} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { loadProducts } from '@/database/productService';


export default function HomeScreen(){
  
  const [shopProduct, setShopProduct] = useState<any[]>([])
  
  useFocusEffect(
  useCallback(() => {
    loadShopProduct();
  }, [])
);

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
        keyExtractor={ (item) => 
        item.productId.toString()}
        renderItem={({item}) => (

          <View style = {{padding:20}} >
            <Text> {item.productName} Rupees {item.fullPrice} </Text>
            {item.halfPrice !== null &&(
              <Text>{item.productName} Rupees [H] {item.halfPrice}</Text>
            )}
            {item.quarterPrice !== null && (
              <Text>{item.productName} Repees [Q] {item.quarterPrice}</Text>
            )}
          </View>

        )}
      />
      
    </View>
  )}

    
