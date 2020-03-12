import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';

function PostView({ remove, update, setEditing, setPosts, post, add }) { //update??
  const { postId } = useParams();
  const history = useHistory();
  const store = useSelector(store => store);
  const {title, description, body, comments} = store[postId];

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRemove = () => {
    remove(postId)
    history.push('/');
  };

  const removeComment = comment => {
    let newCommentsArr = comments.filter(c => c !== comment);
    setPosts(posts => {
      let postCopy = { ...posts };
      postCopy[postId].comments = newCommentsArr;
      return postCopy
    });
  };

  return (
    <div>
      <div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{body}</p>
          <button onClick={handleEdit}>Edit Form</button>
          <button onClick={handleRemove}>Delete</button>
        </div>
        <div>
          <h2>Comments</h2>
          {comments.map(c => <Comment key={uuid()} comment={c} remove={removeComment} />)}
          <CommentForm post={post} add={add} />
        </div>
      </div>
    </div>
  );
}

export default PostView;