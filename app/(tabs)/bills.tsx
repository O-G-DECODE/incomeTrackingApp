import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getDailySalesReport } from "@/database/productOperation/getDailySalesReport";

export default function Bills() {

  const businessDate = new Date().toISOString().split("T")[0];

  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const data = await getDailySalesReport(businessDate);
    setReport(data);
  }

  const grandTotal = report.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Sales Report
      </Text>

      <Text>{businessDate}</Text>

      <FlatList
        data={report}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 8,
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}
          >
            <Text>{item.productName}</Text>
            <Text>
              {item.size} × {item.count}
            </Text>
            <Text>₹{item.price}</Text>
            <Text>Total : ₹{item.total}</Text>
          </View>
        )}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Grand Total : ₹{grandTotal}
      </Text>

    </View>
  );
}