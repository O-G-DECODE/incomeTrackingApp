import { getAllProducts } from "@/database/productOperation";
import { useEffect, useState } from "react";
import { View , Text} from "react-native";
import type { Product } from "@/types/product";
import { FlatList } from "react-native";

export default function Products(){

const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProduct = async() => {
            try{
                const productList = await getAllProducts();
                setProducts(productList); 
            }catch(error){
                alert("something went wrong")
                console.log(error)
            }
        }
        loadProduct()  
        },[]
    
    );
    
    
    return(
      <View>
  <FlatList
    data={products}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
  <View>
    <Text>
        {item.productName} 
        {item.fullPrice}</Text>
  </View>
)}

  />
</View>
    )
}