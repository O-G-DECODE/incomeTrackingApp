import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { months } from "@/constants/month";
import { loadMonthlyReport } from "@/database/reportOperation/loadMonthlyReport";
import { MonthlyReport } from "@/types/dailyReport";

export function MonthlySales() {
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
    const [monthlyReport, setMonthlyReport] = useState<MonthlyReport[]>([]);

    useEffect(() => {
        async function fetchData() {
            const year = new Date().getFullYear();
            const monthNumber = months.indexOf(selectedMonth) + 1;
            const data = await loadMonthlyReport(year, monthNumber);
            setMonthlyReport(data as MonthlyReport[]);
        }

        fetchData();
    }, [selectedMonth]);

    const grandTotal = monthlyReport.reduce((sum, item) => sum + item.totalAmount, 0);

    const renderItem = ({ item }: { item: MonthlyReport }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.badgeText}>{item.size.toUpperCase()}</Text>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.detailText}>
                    Qty: <Text style={styles.boldText}>{item.totalCount}</Text>
                </Text>
                <Text style={styles.detailText}>
                    Unit Price: <Text style={styles.boldText}>₹{item.price}</Text>
                </Text>
                <Text style={styles.totalText}>₹{item.totalAmount}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Styled Picker Bar */}
            <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Month:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        style={styles.picker}
                    >
                        {months.map((month) => (
                            <Picker.Item key={month} label={month} value={month} />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Scrollable Items List */}
            <FlatList
                data={monthlyReport}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No sales records found for this month.</Text>
                    </View>
                }
            />

            {/* Footer Summary Bar */}
            <View style={styles.footer}>
                <Text style={styles.footerLabel}>Grand Total</Text>
                <Text style={styles.footerValue}>₹{grandTotal}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#475569",
        marginRight: 8,
    },
    pickerContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        justifyContent: "center",
        overflow: "hidden",
    },
    picker: {
        height: 44,
        color: "#0F172A",
    },
    listContainer: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#2563EB",
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        overflow: "hidden",
    },
    cardDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 8,
    },
    detailText: {
        fontSize: 13,
        color: "#64748B",
    },
    boldText: {
        color: "#1E293B",
        fontWeight: "600",
    },
    totalText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0F172A",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    footerLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#94A3B8",
    },
    footerValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#38BDF8",
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyText: {
        color: "#94A3B8",
        fontSize: 14,
    },
});