import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import ajax from "../ajax";

import { Deals } from "../models";
import DealDetails from "./DealDetails";
import DealList from "./DealList";
import SearchBar from "./SearchBar";

interface MagazineState {
  deals: Deals[];
  currentDetailId: string | null;
  dealsSearch: Deals[];
}
interface MagazineProp {}

export default class Magazine extends Component<MagazineProp, MagazineState> {
  constructor(props: MagazineProp) {
    super(props);
    this.state = {
      deals: [],
      currentDetailId: null,
      dealsSearch: [],
    };

    this.setCurrentDeal = this.setCurrentDeal.bind(this);
    this.unSetCurrentDeal = this.unSetCurrentDeal.bind(this);
    this.searchDeals = this.searchDeals.bind(this);
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

  searchDeals = async (searchTerm: string) => {
    let dealsSearch: Deals[] = [];
    if (searchTerm) {
      dealsSearch = await ajax.fetchDealsSearchResult(searchTerm);
    }
    this.setState({
      dealsSearch,
    });
  };

  render(): React.ReactNode {
    const deals = this.state.deals;
    if (this.state.currentDetailId) {
      return (
        <View style={styles.main}>
          <DealDetails
            initialDealData={this.currentDeal()}
            onBack={this.unSetCurrentDeal}
          />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.dealsSearch.length > 0
        ? this.state.dealsSearch
        : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar dealsSearch={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>BackSale</Text>
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
  main: {
    marginTop: 30,
  },
});
