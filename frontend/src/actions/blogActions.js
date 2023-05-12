import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_RESET,


    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAIL,


} from "../constants/blogConstants"
import axios from "axios"


export const createPost = (postData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/blogs/create/`,
            postData, // pass the postData as the data payload
            config
        )

        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listpostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/blogs/posts/${id}`)

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updatePost = (post) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/blogs/update/`,
            post,
            config
        )
        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data,
        })


        // dispatch({
        //     type: PRODUCT_DETAILS_SUCCESS,
        //     payload: data
        // })


    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const createComment = (postId, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMMENT_CREATE_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/blogs/posts/${postId}/comments/create/`,
        { content },
        config
      );
  
      dispatch({
        type: COMMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const listComments = (postId) => async (dispatch) => {
    try {
      dispatch({ type: COMMENT_LIST_REQUEST });
  
      const { data } = await axios.get(`/api/blogs/posts/${postId}/comments/`);
  
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };