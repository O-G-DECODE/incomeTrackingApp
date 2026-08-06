import { loadDailyReport } from "@/database/reportOperation/loadDailyReport";
import { DailyReport } from "@/types/dailyReport"
import { useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native"

export function DailySales(){

    const [dailyReport, setDailyReport] = useState<DailyReport[]>([]);

    useEffect( () => {
        async function fetchData(){
             const today = new Date().toISOString().split("T")[0];
             const data = await loadDailyReport(today)
             setDailyReport( data as DailyReport[])
        }
        fetchData()
    },[]);
    
    return (
        <View>
         <Text> Hello Daily Sales </Text>
        <FlatList
        data={dailyReport}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item}) => (
            <View style={{ padding: 10 }}>
                    <Text>{item.productName}</Text>
                    <Text>Size: {item.size}</Text>
                    <Text>Qty: {item.totalCount}</Text>
                    <Text>Price: ₹{item.price}</Text>
                    <Text>Total: ₹{item.totalAmount}</Text>
                </View>
        )}
        />

        </View>
    )
}