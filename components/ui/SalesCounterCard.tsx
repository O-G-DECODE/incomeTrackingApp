import { View, Text, Pressable } from "react-native";
import { ShopProduct } from "@/types/shopProducts";

interface SaleCounterCardProps {
  product: ShopProduct;

  fullCount: number;
  halfCount: number;
  quarterCount: number;

  onIncreaseFull: () => void;
  onDecreaseFull: () => void;

  onIncreaseHalf: () => void;
  onDecreaseHalf: () => void;

  onIncreaseQuarter: () => void;
  onDecreaseQuarter: () => void;
}

function CounterRow({
  label,
  price,
  count,
  onIncrease,
  onDecrease,
}: {
  label: string;
  price: number;
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Text>
        {label} ₹{price}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={onDecrease}
          style={{
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text>-</Text>
        </Pressable>

        <Text
          style={{
            marginHorizontal: 15,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {count}
        </Text>

        <Pressable
          onPress={onIncrease}
          style={{
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SaleCounterCard(props: SaleCounterCardProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {props.product.productName}
      </Text>

      <CounterRow
        label="Full"
        price={props.product.fullPrice}
        count={props.fullCount}
        onIncrease={props.onIncreaseFull}
        onDecrease={props.onDecreaseFull}
      />

      {props.product.halfPrice !== null && (
        <CounterRow
          label="Half"
          price={props.product.halfPrice}
          count={props.halfCount}
          onIncrease={props.onIncreaseHalf}
          onDecrease={props.onDecreaseHalf}
        />
      )}

      {props.product.quarterPrice !== null && (
        <CounterRow
          label="Quarter"
          price={props.product.quarterPrice}
          count={props.quarterCount}
          onIncrease={props.onIncreaseQuarter}
          onDecrease={props.onDecreaseQuarter}
        />
      )}
    </View>
  );
}