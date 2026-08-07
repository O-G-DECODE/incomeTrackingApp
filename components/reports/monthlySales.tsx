import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { months } from "@/constants/month";
import { loadMonthlyReport } from "@/database/reportOperation/loadMonthlyReport";
import { MonthlyReport } from "@/types/dailyReport";

export function MonthlySales() {
    // Store the selected month (default: current month)
    const currentMonth = new Date().getMonth(); // 0-11

    const [selectedMonth, setSelectedMonth] = useState(
        months[currentMonth]
    );

    // Store the report data
    const [monthlyReport, setMonthlyReport] = useState<MonthlyReport[]>([]);

    useEffect(() => {
        async function fetchData() {
            const year = new Date().getFullYear();
            const monthNumber = months.indexOf(selectedMonth) + 1;

            console.log("Selected Month:", selectedMonth);
            console.log("Month Number:", monthNumber);

            const data = await loadMonthlyReport(year, monthNumber);

            console.log("Monthly Data:", data);

            setMonthlyReport(data as MonthlyReport[]);
        }

        fetchData();
    }, [selectedMonth]);

    const grandTotal = monthlyReport.reduce(
        (sum, item) => sum + item.totalAmount,
        0
    );
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 15,
                }}
            >
                Monthly Sales Report
            </Text>

            {/* Month Picker */}
            <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
                {months.map((month) => (
                    <Picker.Item
                        key={month}
                        label={month}
                        value={month}
                    />
                ))}
            </Picker>
            <Text>Total Records: {monthlyReport.length}</Text>
            {/* Report List */}
            {monthlyReport.map((item, index) => (
                <View
                    key={index}
                    style={{
                        padding: 10,
                        marginVertical: 5,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 8,
                    }}
                >
                    <Text>{item.productName}</Text>
                    <Text>{item.size}</Text>
                    <Text>{item.totalCount}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.totalAmount}</Text>
                </View>
            ))}

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Grand Total: ₹{grandTotal}
            </Text>

        </View>
    );
}