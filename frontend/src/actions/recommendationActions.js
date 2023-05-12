import axios from 'axios';
import {
  BOOK_RECOMMENDATIONS_REQUEST,
  BOOK_RECOMMENDATIONS_SUCCESS,
  BOOK_RECOMMENDATIONS_FAIL,
  CLEAR_BOOK_RECOMMENDATIONS,
} from '../constants/recommendationConstants';

export const getBookRecommendations = (productName) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_RECOMMENDATIONS_REQUEST });

    const { data } = await axios.get(`/api/recommendation/book_recommendation/${productName}`);

    dispatch({ type: BOOK_RECOMMENDATIONS_SUCCESS, payload: data.recommendations });
  } catch (error) {
    dispatch({
      type: BOOK_RECOMMENDATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const clearBookRecommendations = () => {
  return {
    type: CLEAR_BOOK_RECOMMENDATIONS,
  };
};
