import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { DailySales } from "@/components/reports/dailySales";
import { MonthlySales } from "@/components/reports/monthlySales";

export default function Bills() {
    const [selectedScreen, setSelectedScreen] = useState<'dailyCollection' | 'monthlyCollection'>('dailyCollection');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Segmented Tab Switcher */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedScreen === 'dailyCollection' && styles.activeTabButton,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedScreen('dailyCollection')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedScreen === 'dailyCollection' && styles.activeTabText,
                            ]}
                        >
                            Daily Sales
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedScreen === 'monthlyCollection' && styles.activeTabButton,
                        ]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedScreen('monthlyCollection')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedScreen === 'monthlyCollection' && styles.activeTabText,
                            ]}
                        >
                            Monthly Sales
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content View */}
                <View style={styles.content}>
                    {selectedScreen === 'dailyCollection' ? <DailySales /> : <MonthlySales />}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#E2E8F0",
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748B",
    },
    activeTabText: {
        color: "#0F172A",
    },
    content: {
        flex: 1,
    },
});