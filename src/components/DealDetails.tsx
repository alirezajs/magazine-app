import { Component, ReactNode } from "react";
import { Deals } from "../models";

import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { priceDisplay } from "../util";
import ajax from "../ajax";
interface DealItemProps {
  initialDealData: Deals;
  onBack: () => void;
}
interface DealItemState {
  deal: Deals;
}

class DealDetails extends Component<DealItemProps, DealItemState> {
  constructor(props: DealItemProps) {
    super(props);

    this.state = {
      deal: this.props.initialDealData,
    };
  }
  async componentDidMount() {
    const data = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: data,
    });
  }
  render(): ReactNode {
    const deal = this.state.deal;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text>Back</Text>
        </TouchableOpacity>
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
        {deal.user && (
          <View>
            <Image
              style={styles.avatar}
              source={{
                uri: deal.user.avatar,
              }}
            />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    borderColor: "#bbb",
    borderWidth: 1,
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
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  avatar: {
    width: "30%",
    height: 50,
  },
});

export default DealDetails;
