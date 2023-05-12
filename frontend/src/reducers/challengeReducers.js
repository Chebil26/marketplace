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


    
    
    
    export const readingChallengeDetailsReducer = (state = { readingChallenge: [] }, action) => {
        switch (action.type) {
            case READING_CHALLENGE_DETAILS_REQUEST:
                return { loading: true, ...state }
    
            case READING_CHALLENGE_DETAILS_SUCCESS:
                return { loading: false, readingChallenge: action.payload }
    
            case READING_CHALLENGE_DETAILS_FAIL:
                return { loading: false, error: action.payload }
    
            default:
                return state
        }
    }

    

export const readingChallengeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case READING_CHALLENGE_CREATE_REQUEST:
            return { loading: true}

        case READING_CHALLENGE_CREATE_SUCCESS:
            return { loading: false, success: true , readingChallenge: action.payload}

        case READING_CHALLENGE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case READING_CHALLENGE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const readingChallengeUpdateReducer = (state = {  }, action) => {
    switch (action.type) {
        case READING_CHALLENGE_UPDATE_REQUEST:
            return { loading: true }

        case READING_CHALLENGE_UPDATE_SUCCESS:
            return { loading: false, success: true, readingChallenge: action.payload }

        case READING_CHALLENGE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case READING_CHALLENGE_UPDATE_RESET:
            return { readingChallenge: {} }

        default:
            return state
    }
}


export const readingChallengeIncrementReducer = (state = {  }, action) => {
    switch (action.type) {
        case READING_CHALLENGE_INCREMENT_REQUEST:
            return { loading: true }

        case READING_CHALLENGE_INCREMENT_SUCCESS:
            return { loading: false, success: true, readingChallenge: action.payload }

        case READING_CHALLENGE_INCREMENT_FAIL:
            return { loading: false, error: action.payload }

        case READING_CHALLENGE_INCREMENT_RESET:
            return { readingChallenge: {} }

        default:
            return state
    }
}  