import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Create the async thunk for creating a product
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/blogs/create/`, {}, config);

      return data;
    } catch (error) {
      // Use rejectWithValue to handle errors
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);



const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postListRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postListSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    postListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createPostRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.posts.push(action.payload);
    },
    createPostFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },

  extraReducers: (builder) => {
    // Handle the createProduct async thunk
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.payload;
      });
  },
});

// export const createPostt = (postData) => async (dispatch) => {
//   dispatch(createPostRequest());
//   try {
//     const response = await axios.post('/api/blogs/posts/', postData);
//     dispatch(createPostSuccess(response.data));
//   } catch (error) {
//     dispatch(createPostFail(error.message));
//   }
// };


export const getPosts = () => async (dispatch) => {
    dispatch(postListRequest());
  
    try {
      const response = await axios.get('/api/blogs/posts/');
      dispatch(postListSuccess(response.data));
    } catch (error) {
      dispatch(postListFail(error.message));
    }
};

export const {
  postListRequest,
  postListSuccess,
  postListFail,
  createPostRequest,
  createPostSuccess,
  createPostFail,
} = postSlice.actions

export default postSlice.reducer;
