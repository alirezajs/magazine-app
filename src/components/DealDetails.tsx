import { Component, ReactNode } from "react";
import { Deals } from "../models";

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

import { priceDisplay } from "../util";
import ajax from "../ajax";
interface DealItemProps {
  initialDealData: Deals;
  onBack: () => void;
}
interface DealItemState {
  deal: Deals;
  imageIndex: number;
}

class DealDetails extends Component<DealItemProps, DealItemState> {
  constructor(props: DealItemProps) {
    super(props);

    this.state = {
      deal: this.props.initialDealData,
      imageIndex: 0,
    };
  }
  width: number = 0;
  imageXPos = new Animated.Value(0);

  imagePanResponser = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      this.imageXPos.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      this.width = Dimensions.get("window").width;
      if (Math.abs(gestureState.dx) > this.width * 0.4) {
        const direction = Math.sign(gestureState.dx);
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => this.handleSwipe(-1 * direction));
      }
      else{
        Animated.spring(this.imageXPos, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  handleSwipe(indexDirection: number) {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      return;
    }

    this.setState(
      (prevSate) => ({
        imageIndex: indexDirection + prevSate.imageIndex,
      }),
      () => {
        this.imageXPos.setValue(indexDirection * this.width);
        Animated.spring(this.imageXPos, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    );
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
        <Animated.Image
          {...this.imagePanResponser.panHandlers}
          style={[{ left: this.imageXPos }, styles.image]}
          source={{
            uri: deal.media[this.state.imageIndex],
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
    backgroundColor: "#fff",
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
