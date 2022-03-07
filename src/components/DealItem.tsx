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
      <View style={styles.deal}>
        <Image
          style={styles.image}
          source={{
            uri: deal.media[0],
          }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View>
            <Text style={styles.cause}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.price}>{deal.cause.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc",
  },
  info: {
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "rgb(187 184 184)",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
});

export default DealItem;
