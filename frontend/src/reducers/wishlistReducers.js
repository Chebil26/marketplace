// reducers.js
import {
  CREATE_WISHLIST_SUCCESS,
  CREATE_WISHLIST_FAILURE,
  FETCH_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS_FAILURE,
  FETCH_WISHLIST_DETAIL_SUCCESS,
  FETCH_WISHLIST_DETAIL_FAILURE,
} from '../constants/wishlistConstants';

// Reducer function for createWishlist
export const createWishlistReducer = (
  state = { wishlist: null, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
        error: null,
      };
    case CREATE_WISHLIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer function for fetchWishlists
export const fetchWishlistsReducer = (
  state = { wishlists: [], error: null },
  action
) => {
  switch (action.type) {
    case FETCH_WISHLISTS_SUCCESS:
      return {
        ...state,
        wishlists: action.payload,
        error: null,
      };
    case FETCH_WISHLISTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer function for fetchWishlistDetail
export const fetchWishlistDetailReducer = (
  state = { wishlist: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_WISHLIST_DETAIL_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
        error: null,
      };
    case FETCH_WISHLIST_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
