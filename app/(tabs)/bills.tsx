import { loadProducts } from "@/database/productService";
import { Product } from "@/types/product";
import { Text ,FlatList, View } from "react-native";
import { useEffect, useState } from "react";



export default function Bills(){

    const [products, setProducts] = useState<Product[]>([])
    
    useEffect(()=>{
        loadProducts(setProducts);
    }, []) ;

    return(
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item }) => (
                    <View> 
                        
                        <Text>"\n"{item.productName} { item.fullPrice} </Text>
                    </View>
                )
          
                }
            />
        </View>
    )
}