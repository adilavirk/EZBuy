import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../type";

// define types
interface StoreState {
  productData: ProductType[];
  userInfo: null | string;
  orderData: ProductType[];
  favoriteData: ProductType[];
}
const initialState: StoreState = {
  productData: [],
  userInfo: null,
  orderData: [],
  favoriteData: [],
};

export const proSlice = createSlice({
  name: "pro",
  initialState,
  reducers: {
    // 1st reducer
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item?._id === action.payload._id
      );
      //   if product already exists then only increase its quantity.do not add the entire product again in the cart.
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      }
      //   if it is new product then push the product in the productData array.
      else {
        state.productData.push(action.payload);
      }
      //
    },
    // 2nd reducer
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item._id === action.payload._id
      );
      //   if product exists already only then increase its quantity
      existingProduct && existingProduct.quantity++;
    },
    // 3rd reducer
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductType) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        // quantity cannot be decrease less than 1
        existingProduct.quantity === 1;
      } else {
        // if quantity is greater then only then it will be decrease
        existingProduct && existingProduct.quantity--;
      }
    },
    // 4th reducer
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },

    // 5th reducer
    resetCart: (state) => {
      state.productData = [];
    },
    // 6th reducer
    addToFavorite: (state, action) => {
      const existingProduct = state.favoriteData.find(
        (item: ProductType) => item._id === action.payload._id
      );
      if (existingProduct) {
        state.favoriteData = state.favoriteData.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    // 7th reducer

    deleteFavorite: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => item._id !== action.payload
      );
    },

    // 8th reducer
    resetFavorite: (state) => {
      state.favoriteData = [];
    },

    // 9th reducer
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    //10th Reducer
    deleteUser: (state) => {
      state.userInfo = null;
    },
    //11th Reducer
    addOrder: (state, action) => {
      const existingOrder = state.orderData.find(
        (item: ProductType) => item._id === action.payload._id
      );
      if (existingOrder) {
        state.orderData.push(action.payload);
      } else {
        state.orderData = action.payload;
      }
    },
    // 12th Reducer
    resetOrder: (state) => {
      state.orderData = [];
    },
  },
  //
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  deleteUser,
  addOrder,
  resetOrder,
  addToFavorite,
  resetFavorite,
  deleteFavorite,
} = proSlice.actions;
export default proSlice.reducer;
