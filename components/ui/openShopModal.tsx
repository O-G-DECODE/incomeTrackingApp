import { loadProducts } from "@/database/productService";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { Button, TouchableOpacity, View,Text, Pressable, FlatList } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function OpenShop({
    onClose,
}:{
    onClose : () => void
}
){
    
    const [ showDatePicker, setShowDatePicker] = useState(false)
    const [businessDate, setBusinessDate] = useState(new Date());
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<number[]>([])

    useEffect(()=>{
        loadProducts(setProducts)
    },[]);

    const openDatePicker = () => {
         setShowDatePicker(true)
    }

    const selectDatePicker = (
    event: DateTimePickerEvent,
     selectedDate?: Date
     ) => {
      setShowDatePicker(false);

       if (selectedDate) {
     setBusinessDate(selectedDate);
    }
     };
    
    const toggleProduct = (id : number) =>{
        setSelectedProduct((previous) => {
            if(previous.includes(id)){
                return previous.filter((productId) => productId !== id);
                
            }
            return[... previous, id];
        });
    };

    return(
        <View>

        <TouchableOpacity onPress={openDatePicker}>
          <Text>📅 {businessDate.toDateString()}</Text>

          {showDatePicker && (
  <DateTimePicker
    value={businessDate}
    mode="date"
    display="default"
    onChange={selectDatePicker}
  />
)}
          </TouchableOpacity>

          <FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const selected = selectedProduct.includes(item.id);

    return (
      <Pressable
        onPress={() => toggleProduct(item.id)}
      >
        <Text>
          {selected ? "☑" : "☐"} {item.productName}
        </Text>

        <Text>₹{item.fullPrice}</Text>
      </Pressable>
    );
  }}
/>
<Text>
    Selected Products: {selectedProduct.length}
</Text>

<Button
 title="Start Shop"
 onPress={onClose}
 />
<Button
  title="Close"
  onPress={onClose}
  />
        </View>
    )
}