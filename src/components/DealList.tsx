import { Component, ReactNode } from "react";
import { Deals } from "../models";

import { StyleSheet, FlatList, View, Text } from "react-native";

interface DealListState {}
interface DealListProp {
  deals: Deals[];
}

class DealList extends Component<DealListProp, DealListState> {
  constructor(props: DealListProp) {
    super(props);
  }
  render(): ReactNode {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    flex: 1,
  },
});

export default DealList;
