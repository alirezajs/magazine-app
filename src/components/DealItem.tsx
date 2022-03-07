import { Component, ReactNode } from "react";
import { Deals } from "../models";

import { StyleSheet, Text, Image, View } from "react-native";
import { priceDisplay } from "../util";
interface DealItemProps {
  deal: Deals;
}
interface DealItemState {}

class DealItem extends Component<DealItemProps, DealItemState> {
  constructor(props: DealItemProps) {
    super(props);
  }
  render(): ReactNode {
    const deal = this.props.deal;
    return (
      <View>
        <Image
          style={styles.image}
          source={{
            uri: deal.media[0],
          }}
        />
        <View>
          <Text>{deal.title}</Text>
          <Text>{deal.cause.name}</Text>
          <Text>{priceDisplay(deal.price)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
  },
});

export default DealItem;
