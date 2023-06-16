import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  ProductListReducer,
  productByStoreReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
  similarProductsReducer,
} from './reducers/productReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
} from './reducers/orderReducers';

import { cartReducer } from './reducers/cartReducers';
import { bookRecommendationsReducer } from './reducers/recommendationReducers';

import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  storeByUserReducer,
  storeDetailsReducer,
  storeListReducer,
} from './reducers/storeReducers';

import {
  readingChallengeCreateReducer,
  readingChallengeDetailsReducer,
  readingChallengeIncrementReducer,
  readingChallengeUpdateReducer,
} from './reducers/challengeReducers';

import counterReducer from './features/counterSlice';
import postReducer from './features/postSlice';

import {
  commentCreateReducer,
  commentListReducer,
  postCreateReducer,
  postDetailsReducer,
  postUpdateReducer,
} from './reducers/blogReducers';

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  productReviewCreate: productReviewCreateReducer,
  productByStore: productByStoreReducer,
  similarProducts: similarProductsReducer,

  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,

  bookRecommendations: bookRecommendationsReducer,

  storeList: storeListReducer,
  storeDetails: storeDetailsReducer,
  storeByUser: storeByUserReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  readingChallengeDetails: readingChallengeDetailsReducer,
  readingChallengeCreate: readingChallengeCreateReducer,
  readingChallengeUpdate: readingChallengeUpdateReducer,
  readingChallengeIncrement: readingChallengeIncrementReducer,

  counter: counterReducer,

  post: postReducer,

  postCreate: postCreateReducer,
  postDetails: postDetailsReducer,
  postUpdate: postUpdateReducer,
  commentCreate: commentCreateReducer,
  commentList: commentListReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// const store = createStore(reducer, initialState,
//     composeWithDevTools(applyMiddleware(...middleware)))

const store = configureStore({
  reducer,
  middleware,
  devTools: true,
  preloadedState,
});

export default store;
