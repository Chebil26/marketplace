import axios from "axios"

import { 
    
    STORE_LIST_REQUEST,
    STORE_LIST_SUCCSESS,
    STORE_LIST_FAIL,

    STORE_DETAILS_REQUEST,
    STORE_DETAILS_SUCCESS,
    STORE_DETAILS_FAIL,

    STORE_BY_USER_REQUEST,
    STORE_BY_USER_SUCCESS,
    STORE_BY_USER_FAIL,


} from "../constants/storeConstants"

export const listStores = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: STORE_LIST_REQUEST })

        const { data } = await axios.get(`/api/stores/`)

        dispatch({
            type: STORE_LIST_SUCCSESS,
            payload: data
        })

        
    }catch(error){
        dispatch({
            type: STORE_LIST_FAIL,
            payload: error.response && error.response.data.message.detail
            ? error.response.data.message.detail
            : error.message,
        })
    }
}



export const listStoreDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STORE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/stores/${id}/`)

        dispatch({
            type: STORE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listStoreByUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STORE_BY_USER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log(userInfo.token)
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const { data } = await axios.get(
            `/api/stores/user/`,
            config
        )
        dispatch({
            type: STORE_BY_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_BY_USER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}