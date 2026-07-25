
import { addProduct } from '@/database/productOperation';
import { useState} from 'react';
import { Platform, ScrollView, TextInput, Button, Alert, Text } from 'react-native';



export default function TabTwoScreen() {

  let [productName, setProductName] = useState("")
  let [fullprice, setFullPrice] = useState("")
  let [halfPrice, setHalfPrice] = useState("")
  let [quarterPrice, setQuarterPrice] = useState("")


  const handleSubmit = async () => {
 
    if(( productName.trim() == "" || fullprice.trim() == "")) {
      alert("Please fill the all fields")
      return;
    } 
    if (( isNaN(Number(fullprice))) ){
        alert("Price must be a number")
        return;
    }

    if(halfPrice.trim() !== "" && isNaN(Number(halfPrice))){
      alert("Half price must be a number")
      return
    }

    if(quarterPrice.trim() !== "" && isNaN(Number(quarterPrice))){
      alert("Quarter price must be a number")
      return
    }
 
    try{
      await addProduct(
      productName,
      Number(fullprice),
      halfPrice.trim() === "" ? null : Number(halfPrice),
      quarterPrice.trim() === "" ? null : Number(quarterPrice)
    );
    alert("Product inserted")
    handleClear()
    }catch(error){
      alert("failed to add product")
      console.log(error)
    }
  }

  const handleClear = () :void => {
     
    setProductName('')
    setFullPrice('')
    setHalfPrice('')
    setQuarterPrice('')

  }
  

  return (
    <ScrollView>

      <Text> Add Product </Text>

     <TextInput
      placeholder='Product Name'
      value={productName}
      onChangeText={setProductName}
      />

      <TextInput
      placeholder='Price (Full)'
      keyboardType="numeric"
      value={fullprice}
      onChangeText={setFullPrice}
      />

      <TextInput
      placeholder='Price (Half)'
      keyboardType="numeric"
      value={halfPrice}
      onChangeText={setHalfPrice}
      />
      
      <TextInput
      placeholder='Price (Quater)'
      keyboardType="numeric"
      value={quarterPrice}
      onChangeText={setQuarterPrice}
      />

      <Button 
      title='Submit' 
      onPress={handleSubmit} />

      <Button 
      title='Clear'
      onPress={handleClear} 
      />

    </ScrollView>
  );
}
