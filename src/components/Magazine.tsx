import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import ajax from "../ajax";

import { Deals } from "../models";
import DealDetails from "./DealDetails";
import DealList from "./DealList";

interface MagazineState {
  deals: Deals[];
  currentDetailId: string | null;
}
interface MagazineProp {}

export default class Magazine extends Component<MagazineProp, MagazineState> {
  constructor(props: MagazineProp) {
    super(props);
    this.state = {
      deals: [],
      currentDetailId: null,
    };

    this.setCurrentDeal = this.setCurrentDeal.bind(this);
    this.unSetCurrentDeal=this.unSetCurrentDeal.bind(this)
  }
  async componentDidMount() {
    const deals = await ajax.fetchAllDeal();
    this.setState({
      deals,
    });
  }
  setCurrentDeal(dealId: string) {
    this.setState({
      currentDetailId: dealId,
    });
  }

  unSetCurrentDeal() {
    this.setState({
      currentDetailId: null,
    });
  }

  currentDeal = () => {
    return this.state.deals.find(
      (item) => item.key === this.state.currentDetailId
    );
  };

  render(): React.ReactNode {
    const deals = this.state.deals;
    if (this.state.currentDetailId) {
      return (
        <DealDetails
          initialDealData={this.currentDeal()}
          onBack={this.unSetCurrentDeal}
        />
      );
    } else if (deals.length > 0) {
      return (
        <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>BackSale</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
  },
});
