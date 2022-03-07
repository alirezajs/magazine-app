import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { debounce } from "lodash";

interface SearchBarProps {
  dealsSearch: (searchTerm: string) => void;
}
interface SearchBarState {
  searchTerm: string;
}

export default class SearchBar extends Component<
  SearchBarProps,
  SearchBarState
> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: "",
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  debouncedSearchDeals = debounce((search) => this.props.dealsSearch(search), 300);

  onChangeText(searchTerm: string) {
    this.setState(
      {
        searchTerm,
      },
      () => {
        this.debouncedSearchDeals(this.state.searchTerm);
      }
    );
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.onChangeText}
          placeholder="Search"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});
