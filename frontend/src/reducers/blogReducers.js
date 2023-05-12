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


export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true}

        case POST_CREATE_SUCCESS:
            return { loading: false, success: true , post: action.payload}

        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case POST_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const postUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUEST:
            return { loading: true }

        case POST_UPDATE_SUCCESS:
            return { loading: false, success: true, readingChallenge: action.payload }

        case POST_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case POST_UPDATE_RESET:
            return { readingChallenge: {} }

        default:
            return state
    }
}



export const postDetailsReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { loading: true, ...state }

        case POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload }

        case POST_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const commentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true}

        case COMMENT_CREATE_SUCCESS:
            return { loading: false, success: true , comment: action.payload}

        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case COMMENT_CREATE_RESET:
            return {}

        default:
            return state
    }
}



export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENT_LIST_REQUEST:
        return { loading: true, comments: [] };
      case COMMENT_LIST_SUCCESS:
        return { loading: false, comments: action.payload };
      case COMMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
