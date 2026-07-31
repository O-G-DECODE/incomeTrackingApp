
import { getOpenShopProducts } from '@/database/productOperation';
import { useEffect, useState } from 'react';
import { Text, View , FlatList} from 'react-native';


export default function HomeScreen(){
  
  const [shopProduct, setShopProduct] = useState<any[]>([])
  useEffect(() => {
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
    loadShopProduct();
  },[])

  
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

    
