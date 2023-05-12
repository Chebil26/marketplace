import {
    BOOK_RECOMMENDATIONS_REQUEST,
    BOOK_RECOMMENDATIONS_SUCCESS,
    BOOK_RECOMMENDATIONS_FAIL,
    CLEAR_BOOK_RECOMMENDATIONS
  } from '../constants/recommendationConstants';
  
  export const bookRecommendationsReducer = (state = { recommendations: [] }, action) => {
    switch (action.type) {
    case BOOK_RECOMMENDATIONS_REQUEST:
        return { loading: true, recommendations: [] };

    case BOOK_RECOMMENDATIONS_SUCCESS:
        return { loading: false, recommendations: action.payload };

    case BOOK_RECOMMENDATIONS_FAIL:
        return { loading: false, error: action.payload };

    case CLEAR_BOOK_RECOMMENDATIONS:
        return { ...state, recommendations: null };
    default:
        return state;
    }
  };
  