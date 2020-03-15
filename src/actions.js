import { ADD_POST, GET_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from "./actionTypes";
import axios from 'axios';

const API_URL_POSTS = 'http://localhost:5000/api/posts';

export function getAllPostsFromAPI() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${API_URL_POSTS}`);
       console.log("RESPONSE GET ALL POSTS", res);
      dispatch(getAllPosts(res.data));
    } catch (err) {
      dispatch(handleError(err.res.data));
    }
  }
}

function getAllPosts(posts){
  return {
    type: GET_ALL_POSTS,
    payload: posts
  }
}

export function getPostFromAPI(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${API_URL_POSTS}/${id}`);
      console.log('response: ', res)
      dispatch(getPost(res.data));
    } catch (err) {
      dispatch(handleError(err.res.data));
    }
  }
}

function getPost(post){
  return {
    type: GET_POST,
    payload: post
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    payload: post
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: id
  }
}

export function addComment(commentData) {
  return {
    type: ADD_COMMENT,
    payload: commentData
  }
}
export function deleteComment(id, postId) {
  return {
    type: DELETE_COMMENT,
    payload: { id, postId }
  }
}

function handleError(error) {
  return {
    type: 'ERROR',
    error
  };
}



