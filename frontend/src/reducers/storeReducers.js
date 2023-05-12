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



export const storeListReducer = (state ={ stores: [] }, action) => {
    switch(action.type){
        case STORE_LIST_REQUEST:
            return { loading:true, stores: []}

        case STORE_LIST_SUCCSESS:
            return { loading:false, stores: action.payload }

        case STORE_LIST_FAIL:
            return { loading:false, stores: action.payload}

        default:
            return state

        
    }
}


export const storeDetailsReducer = (state = { store: [] }, action) => {
    switch (action.type) {
        case STORE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case STORE_DETAILS_SUCCESS:
            return { loading: false, store: action.payload }

        case STORE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const storeByUserReducer = (state = { store: [] }, action) => {
    switch (action.type) {
        case STORE_BY_USER_REQUEST:
            return { loading: true, ...state }

        case STORE_BY_USER_SUCCESS:
            return { loading: false, store: action.payload }

        case STORE_BY_USER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



