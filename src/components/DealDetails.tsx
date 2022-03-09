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
        <TouchableOpacity onPress={this.props.onBack} style={styles.backButton}>
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
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.cause}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.price}>{deal.cause.name}</Text>
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
        </View>
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 0,
  },
  backButton: {
    color: "#0645ad",
    marginBottom: 10,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
  info: {
    padding: 10,
    backgroundColor: "rgb(255,113,0)",
    color: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    padding: 10,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
    padding: 10,
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  description: {
    borderColor: "#eee",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});

export default DealDetails;
