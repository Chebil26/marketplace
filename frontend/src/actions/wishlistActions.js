import axios from 'axios';

import {
  CREATE_WISHLIST_SUCCESS,
  CREATE_WISHLIST_FAILURE,
  FETCH_WISHLISTS_SUCCESS,
  FETCH_WISHLISTS_FAILURE,
  FETCH_WISHLIST_DETAIL_SUCCESS,
  FETCH_WISHLIST_DETAIL_FAILURE,
  CREATE_WISHLIST_REQUEST,
  FETCH_WISHLIST_DETAIL_REQUEST,
  FETCH_WISHLISTS_REQUEST,
} from '../constants/wishlistConstants';

export const createWishlist = (wishlistData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_WISHLIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/wishlist/create/`,
      wishlistData,
      config
    );

    dispatch({
      type: CREATE_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_WISHLIST_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchWishlists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_WISHLISTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/wishlist/`,
      config
    );

    dispatch({
      type: FETCH_WISHLISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_WISHLISTS_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchWishlistDetail =
  (wishlistId) => async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_WISHLIST_DETAIL_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/wishlist/${wishlistId}/`,
        config
      );

      dispatch({
        type: FETCH_WISHLIST_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_WISHLIST_DETAIL_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
