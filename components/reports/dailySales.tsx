import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { loadDailyReport } from "@/database/reportOperation/loadDailyReport";
import { DailyReport } from "@/types/dailyReport";

export function DailySales() {
    const [dailyReport, setDailyReport] = useState<DailyReport[]>([]);

    useEffect(() => {
        async function fetchData() {
            const today = new Date().toISOString().split("T")[0];
            const data = await loadDailyReport(today);
            setDailyReport(data as DailyReport[]);
        }

        fetchData();
    }, []);

    const grandTotal = dailyReport.reduce((sum, item) => sum + item.totalAmount, 0);

    const renderItem = ({ item }: { item: DailyReport }) => (
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
                    Price: <Text style={styles.boldText}>₹{item.price}</Text>
                </Text>
                <Text style={styles.totalText}>₹{item.totalAmount}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dailyReport}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No daily sales recorded today.</Text>
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
        color: "#16A34A",
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
        color: "#22C55E",
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