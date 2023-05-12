import axios from "axios"
import {
    READING_CHALLENGE_CREATE_REQUEST,
    READING_CHALLENGE_CREATE_SUCCESS,
    READING_CHALLENGE_CREATE_FAIL,
    READING_CHALLENGE_CREATE_RESET,

    READING_CHALLENGE_UPDATE_REQUEST,
    READING_CHALLENGE_UPDATE_SUCCESS,
    READING_CHALLENGE_UPDATE_FAIL,
    READING_CHALLENGE_UPDATE_RESET,

    READING_CHALLENGE_INCREMENT_REQUEST,
    READING_CHALLENGE_INCREMENT_SUCCESS,
    READING_CHALLENGE_INCREMENT_FAIL,
    READING_CHALLENGE_INCREMENT_RESET,




    
    READING_CHALLENGE_DETAILS_REQUEST,
    READING_CHALLENGE_DETAILS_SUCCESS,
    READING_CHALLENGE_DETAILS_FAIL,

} from "../constants/challengeConstants"


export const readingChallengeByUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: READING_CHALLENGE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/challenges/reading-challenge/`,
            config
        )

        dispatch({
            type: READING_CHALLENGE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: READING_CHALLENGE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const createReadingChallenge = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: READING_CHALLENGE_CREATE_REQUEST
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
            `/api/challenges/reading-challenge-create/`,
            {},
            config
        )

        dispatch({
            type: READING_CHALLENGE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: READING_CHALLENGE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateReadingChallenge = (readingChallenge) => async (dispatch, getState) => {
    try {
        dispatch({
            type: READING_CHALLENGE_UPDATE_REQUEST
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
            `/api/challenges/reading-challenge-update/`,
            readingChallenge,
            config
        )
        dispatch({
            type: READING_CHALLENGE_UPDATE_SUCCESS,
            payload: data,
        })


        // dispatch({
        //     type: PRODUCT_DETAILS_SUCCESS,
        //     payload: data
        // })


    } catch (error) {
        dispatch({
            type: READING_CHALLENGE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const incrementReadingChallenge = (readingChallenge) => async (dispatch, getState) => {
    try {
        dispatch({
            type: READING_CHALLENGE_INCREMENT_REQUEST
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
            `/api/challenges/reading-challenge-increment/`,
            readingChallenge,
            config
        )
        dispatch({
            type: READING_CHALLENGE_INCREMENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: READING_CHALLENGE_INCREMENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

