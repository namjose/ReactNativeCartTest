/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import images from "../../../assets/images";
import styles from "./styles";
import axios from "../../../library/api";
import palette from "../../../assets/palette";
import PlaceholderLoading from "./PlaceholderLoading";

const intitialProduct = {
  name: "Dragon Fruit",
  price: 3.4,
  photo_url: "/shop/products/2/photo",
  category_url: "/shop/categories/Exotic",
  vendor_url: "/shop/vendors/32"
};

const PHOTO_URL = "https://api.predic8.de/shop/products/92/photo";

const renderItem = item => {
  const { name, price, id } = item;
  return (
    <View style={styles.item}>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image source={images.fruits[id % 5]} resizeMode="center" />
      </View>
      <View
        style={{
          flex: 3
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={({ fontSize: 12 }, styles.description)}>
            Apple is my favourite fruit
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", color: palette.secondaryColor }}>
            ${price}
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
        const id = product_url.substring(product_url.lastIndexOf("/") + 1);
        const product = { id, ...response.data, count: 0 };
        this.setState({ product, isLoading: false });
      })
      .catch(error => {
        this.setState({ product: intitialProduct, isLoading: true });
      });
  };

  render() {
    /* props isRefreshing from ListScreen - FlatList each time being refresh */
    const { item, isRefreshing } = this.props;
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
              this.props.navigation.navigate("Detail", {
                product_url,
                product,
                id: product.id
              });
            }}
          >
            {renderItem(product)}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
