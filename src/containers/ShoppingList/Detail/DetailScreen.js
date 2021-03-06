import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import numeral from "numeral";
import axios from "../../../library/api";
import styles from "./styles";
import palette from "../../../assets/palette";
import Description from "./Description";
import CountButton from "./CountButton";
import AddProductButton from "../../../components/Buttons/AddProductButton";
import LoadingScreen from "../../../components/Loading/LoadingScreen";

const initialProduct = {
  name: "Strawberries",
  price: 7.1,
  photo_url: "/shop/products/92/photo"
};

const INITIAL_API_URL = "/shop/products/92";

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true
    };
  }

  componentDidMount = () => {
    this._getData();
  };

  _getData = () => {
    /* get product data as param navigated from List Screen */
    const { navigation } = this.props;
    const product = navigation.getParam("product", initialProduct);
    this.setState({ product, isLoading: false });
  };

  _handlePlus = () => {
    this.setState(prevState => ({
      product: { ...prevState.product, count: prevState.product.count + 1 }
    }));
  };

  _handleSubtract = () => {
    const { count } = this.state.product;
    if (count > 0) {
      this.setState(prevState => ({
        product: { ...prevState.product, count: prevState.product.count - 1 }
      }));
    }
  };

  _handleMainButtonClick = () => {
    this.setState(prevState => ({
      product: { ...prevState.product, count: 0 }
    }));
  };

  _renderTotalPrice = () => {
    const { count, price } = this.state.product;
    const totalPrice = count * price;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <Text style={styles.mediumSizeText}>PRICE</Text>
        <Text style={{ fontWeight: "bold", color: palette.secondaryColor }}>
          $
          <Text style={styles.totalPriceText}>
            {numeral(totalPrice).format("0.0")}
          </Text>
        </Text>
      </View>
    );
  };

  render() {
    const { product, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.item}>
            <Description {...product} />
            <CountButton
              count={product.count}
              _handlePlus={this._handlePlus}
              _handleSubtract={this._handleSubtract}
            />
            {this._renderTotalPrice()}
            <AddProductButton
              product={product}
              _handleButtonClick={this._handleMainButtonClick}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
