import { ADD_POST, UPDATE_POST, GET_POST, GET_ALL_POSTS, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from './actionTypes';

const INITIAL_STATE = {};
// data structure of the store.
// { postId: {
//     body: "body string", 
//     title: "title string", 
//     description: "description string",
//     comments: [
//       {id: commentId, comment: "comment string"}
//      ] 
//    }
// }

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      console.log("get all posts", action.payload)
      return {...state, ...action.payload}; //added action.payload

    case GET_POST:
      console.log("In get a single post", action.payload)
      return { [action.payload.id]: action.payload };
      // return { post: action.payload };

    case ADD_POST:
      return { ...state, [action.payload.id]: action.payload };

    case UPDATE_POST:
      return {
        ...state, [action.payload.id]: {
          ...action.payload,
          comments: state[action.payload.id].comments
        }
      };

    case DELETE_POST:
      let stateCopy = { ...state };
      delete stateCopy[action.payload];
      return stateCopy;

    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.postId]:
        {
          ...state[action.payload.postId],
          comments: [...state[action.payload.postId].comments,
          {
            comment: action.payload.comment,
            id: action.payload.id
          }]
        }
      }

    case DELETE_COMMENT:
      return {
        ...state,
        [action.payload.postId]:
        {
          ...state[action.payload.postId],
          comments: [...state[action.payload.postId].comments.filter(c => {
            // console.log("C.ID", c)
            // console.log("Action.payload.Id", action.payload)
            return c.id !== action.payload.id
          })]
        }
      }

    default:
      console.warn("Unable to find action type: ", action.type)
      return state;
  }
}

export default rootReducer;