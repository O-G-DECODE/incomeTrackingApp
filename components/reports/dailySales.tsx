import { loadDailyReport } from "@/database/reportOperation/loadDailyReport";
import { DailyReport } from "@/types/dailyReport"
import { useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native"

export function DailySales() {

    const [dailyReport, setDailyReport] = useState<DailyReport[]>([]);


    useEffect(() => {
        async function fetchData() {
            const today = new Date().toISOString().split("T")[0];
            const data = await loadDailyReport(today)
            setDailyReport(data as DailyReport[])

        }

        fetchData()

    }, []);
    const grandTotal = dailyReport.reduce(
        (sum, item) => sum + item.totalAmount,
        0
    );

    return (
        <View>
            <Text> Hello Daily Sales </Text>
            <FlatList
                data={dailyReport}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10 }}>
                        <Text>{item.productName}</Text>
                        <Text>Size: {item.size}</Text>
                        <Text>Qty: {item.totalCount}</Text>
                        <Text>Price: ₹{item.price}</Text>
                        <Text>Total: ₹{item.totalAmount}</Text>
                    </View>
                )}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Grand Total: ₹{grandTotal}
            </Text>

        </View>
    )
}