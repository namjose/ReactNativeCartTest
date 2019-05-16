/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import images from "../../res/images";
import styles from "./styles";
import axios from "../../library/api";
import palette from "../../res/palette";
import PlaceholderLoading from "./PlaceholderLoading";

const intitialProduct = {
  name: "Dragon Fruit",
  price: 3.4,
  photo_url: "/shop/products/2/photo",
  category_url: "/shop/categories/Exotic",
  vendor_url: "/shop/vendors/32"
};

const renderItem = item => {
  const { name, price, index } = item;
  const imgID = index % 5;
  return (
    <View style={styles.item}>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image source={images.fruits[imgID]} resizeMode="center" />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.primaryText}>{name.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.secondaryText}>
            Apple is the best thing ever in my whole life
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: palette.secondaryColor,
              fontSize: 20
            }}
          >
            {numeral(price).format("$0.0")}
            <Text style={styles.secondaryText}> / kg</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default class ItemCard extends React.Component {
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
    const { product_url } = this.props.item;
    axios
      .get(product_url)
      .then(response => {
        const product = response.data;
        this.setState({ product, isLoading: false });
      })
      .catch(error => {
        this.setState({ product: intitialProduct, isLoading: true });
      });
  };

  render() {
    /* props isRefreshing from CartScreen - FlatList each time being refresh */
    const { item, index, isRefreshing } = this.props;
    const { product, isLoading } = this.state;
    const { product_url } = item;

    return (
      <View>
        {isLoading || isRefreshing ? (
          <View
            style={{
              height: 140,
              margin: 10,
              padding: 30,
              flexDirection: "row",
              justifyContent: "center",
              elevation: 3,
              backgroundColor: "#fff",
              borderRadius: 12
            }}
          >
            <PlaceholderLoading />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Detail", { product_url, index });
            }}
          >
            {renderItem({ ...product, index })}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
