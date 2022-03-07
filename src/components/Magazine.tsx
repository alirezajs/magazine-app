import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import ajax from "../ajax";

import { Deals } from "../models";
import DealList from "./DealList";

interface MagazineState {
  deals: Deals[];
}
interface MagazineProp {}

export default class Magazine extends Component<MagazineProp, MagazineState> {
  constructor(props: MagazineProp) {
    super(props);
    this.state = {
      deals: [],
    };
  }
  async componentDidMount() {
    const deals = await ajax.fetchAllDeal();
    this.setState({
      deals,
    });
  }
  render(): React.ReactNode {
    const deals = this.state.deals;
    return (
      <View style={styles.container}>
        {deals && deals.length > 0 ? (
          <DealList deals={this.state.deals} />
        ) : (
          <Text style={styles.header}>BackSale</Text>
        )}
      </View>
    );
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
