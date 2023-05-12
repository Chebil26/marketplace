import { createStore, combineReducers, applyMiddleware} from 'redux'
import {configureStore} from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProductListReducer, productDetailsReducer,
    productDeleteReducer, productCreateReducer,
    productUpdateReducer, productTopRatedReducer,
    productReviewCreateReducer} from './reducers/productReducers'

import { bookRecommendationsReducer } from './reducers/recommendationReducers'
import { cartReducer } from './reducers/cartReducers'

import { userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer
 } from './reducers/userReducers'

import { storeListReducer, storeDetailsReducer, storeByUserReducer } from './reducers/storeReducers'

import { readingChallengeCreateReducer, readingChallengeUpdateReducer,readingChallengeDetailsReducer, readingChallengeIncrementReducer } from './reducers/challengeReducers'

import counterReducer from './features/counterSlice'
import postReducer from './features/postSlice'

import { postCreateReducer, postUpdateReducer, postDetailsReducer, commentCreateReducer, commentListReducer } from './reducers/blogReducers'

const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productTopRated: productTopRatedReducer,
    productReviewCreate: productReviewCreateReducer,

    bookRecommendations: bookRecommendationsReducer,

    storeList: storeListReducer,
    storeDetails: storeDetailsReducer,
    storeByUser: storeByUserReducer,

    cart: cartReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,

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

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {
    cart:{cartItems: cartItemsFromStorage},
    userLogin:{userInfo: userInfoFromStorage}
} 

const preloadedState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
  };

const middleware = [thunk]

// const store = createStore(reducer, initialState,
//     composeWithDevTools(applyMiddleware(...middleware)))

const store = configureStore({
    reducer,
    middleware,
    devTools: true,
    preloadedState,
  })


export default store