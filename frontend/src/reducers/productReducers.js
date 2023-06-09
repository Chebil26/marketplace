import {
  PRODCUT_LIST_REQUEST,
  PRODCUT_LIST_SUCCSESS,
  PRODCUT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCTS_BY_STORE_REQUEST,
  PRODUCTS_BY_STORE_SUCCESS,
  PRODUCTS_BY_STORE_FAIL,
  SIMILAR_PRODUCTS_REQUEST,
  SIMILAR_PRODUCTS_SUCCESS,
  SIMILAR_PRODUCTS_FAIL,
} from '../constants/productConstants';

export const ProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODCUT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODCUT_LIST_SUCCSESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case PRODCUT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const productByStoreReducer = (
  state = { loading: true, products: [], page: 1, pages: 1 },
  action
) => {
  switch (action.type) {
    case PRODUCTS_BY_STORE_REQUEST:
      return { loading: true, products: [], page: 1, pages: 1 };
    case PRODUCTS_BY_STORE_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCTS_BY_STORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const similarProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SIMILAR_PRODUCTS_REQUEST:
      return { loading: true, products: [] };

    case SIMILAR_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };

    case SIMILAR_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
