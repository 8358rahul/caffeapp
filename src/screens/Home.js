import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { categoryData } from "../constants/categoryData";
import { restaurantData } from "../constants/restaurantData";
import { addToCart, decreaseCart, getTotals, } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from '@jamsch/react-native-toastify';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';
const Home = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const { cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [cart_item_ids, setcart_item_ids] = React.useState([]);
  React.useEffect(() => {
    dispatch(getTotals());
    if (cart.length > 0) {
      let cart_item_id = cart.map(item => item.id);
      setcart_item_ids(cart_item_id)
    }
    else {
      setcart_item_ids([])
    }


  }, [cart]);

  function checkIsItemInCart(id) {
    let flag = cart_item_ids.find((i) => i == id);
    if (flag) {
      return true;
    } else {
      return false;
    }
  }


  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50, marginVertical: 5, }}> 
       <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center", }}
        > 
          <Text style={{ ...FONTS.h3, color: COLORS.primary, fontWeight: '900', }}>Our Menu</Text>
        </View> 
      </View>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => {
            setSelectedCategory(item);
            setRestaurants(
              restaurantData.filter((a) => a.category.includes(item.name))
            );


          }}
        >
          <View
            style={{
              width: 50,
              height: 50,

              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >


            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>


          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          justifyContent: "center",
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          marginHorizontal: 16,


        }}

      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ ...FONTS.h2, color: COLORS.primary, fontWeight: '900', }}>Main</Text>
            <Text style={{ ...FONTS.h2, color: COLORS.primary, fontWeight: '900', }}>Categories</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

            <Button icon={icons.dollar} mode="elevated" onPress={() => navigation.navigate('ConfirmOrder')}>
              <Text style={{ ...FONTS.h2 }}>{cartTotalAmount}</Text>
            </Button>
            <Button icon="cart" mode="elevated" onPress={() => navigation.navigate('ConfirmOrder')}>
              <Text style={{ ...FONTS.h2 }}>{cartTotalQuantity}</Text>
            </Button>
          </View>
        </View>

        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />

      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <View
        style={{
          marginBottom: SIZES.padding * 2,
          width: "100%",
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          ...styles.shadow,

        }}
      >
        {/* Image */}
        <View
          style={{
            flex: 1,
            marginBottom: SIZES.padding,
            borderRadius: 20,
            flexDirection: "row"

          }}
        >
          <Image
            source={item.photo}
            // resizeMode="cover"
            style={{
              width: "40%",
              height: 150,
              borderRadius: SIZES.radius,
            }}
          />


          {/* Restaurant Info */}

          <View
            style={{
              marginTop: SIZES.padding - 10,
              marginLeft: 10,
              flex: 1
            }}
          >
            <FontAwesome5 name="utensils" size={20} color={COLORS.primary} style={{ marginLeft: '80%', }} />

            <Text style={{ ...FONTS.body3, color: COLORS.black }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, }}>
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>Rs.{item.price}</Text>
              <Text style={{ ...FONTS.body4, marginLeft: 20, color: COLORS.black }}>Kcal-{item.calories}</Text>
            </View>

            <Text style={{ ...FONTS.body4, color: COLORS.black }}
              numberOfLines={3}
            >{item.description}</Text>

          </View>
        </View>
        {!checkIsItemInCart(item.id) ?
          <TouchableOpacity
            style={{
              width: "40%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: '#ffe5c7',
              marginTop: -20,
              borderColor: '#fa8f14',
              borderWidth: 1,
            }}
            onPress={() => {
              dispatch(addToCart(item))

            }}>
            <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: '900' }}>ADD</Text>
          </TouchableOpacity>
          :
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '40%',
            marginTop: -20,
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            borderColor: '#fa8f14',
            borderWidth: 1,
          }}>

            <TouchableOpacity
              style={{
                width: "50%",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
              onPress={() => {
                dispatch(addToCart(item))
              }}>
              <Text style={{ fontSize: SIZES.font * 1.5, color: COLORS.white, fontWeight: '900', }}>+</Text>
            </TouchableOpacity>
            {cart.map((i) => (
              (i.id == item.id) ?
                <View key={item.id}>
                  <Text style={{ fontSize: SIZES.font * 1.5, color: COLORS.white, fontWeight: '900', }}>{i.cartQuantity}</Text>
                </View>
                : null
            ))}

            <TouchableOpacity
              style={{
                width: "50%",
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
              onPress={() => {
                dispatch(decreaseCart(item))
              }}
            >
              <Text style={{ fontSize: SIZES.font * 1.5, color: COLORS.white, fontWeight: '900', }}>-</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );

    return (

      <View  >
        <ToastContainer position="top-left" />
        <FlatList
          data={restaurants}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 50,
          }}
        />
      </View>

    );
  }

  return (

    <SafeAreaView style={styles.container}>
      {/* {renderHeader()} */}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
