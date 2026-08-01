

import { addProduct } from '@/database/productOperation/addProduct';
import { showError } from '@/utils/alert';
import { isEmpty } from '@/utils/isEmpty';
import { isValidNumber } from '@/utils/isNumber';
import { useState} from 'react';
import { ScrollView, TextInput, Button, Alert, Text } from 'react-native';



export default function AddProductForm({
    onClose,
} : {
    onClose: () => void;
}) {

  let [productName, setProductName] = useState("")
  let [fullprice, setFullPrice] = useState("")
  let [halfPrice, setHalfPrice] = useState("")
  let [quarterPrice, setQuarterPrice] = useState("")


  const handleSubmit = async () => {
 
    if( isEmpty(productName) || isEmpty(fullprice)) {
      alert("Please fill the all fields")
      return;
    } 
    if (!isValidNumber(fullprice) ){
        alert("Price must be a number")
        return;
    }

    if(!isEmpty(halfPrice) && !isValidNumber(halfPrice)){
      alert("Half price must be a number")
      return
    }

    if(!isEmpty(quarterPrice) && !isValidNumber(quarterPrice)){
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
      showError(error)
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

      <Button
      title='Close'
      onPress={onClose}
      />

    </ScrollView>
  );
}
