import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from './actions';
import Button from 'react-bootstrap/Button';

function PostView({ setEditing, setPosts, post }) {
  const { postId } = useParams();
  const history = useHistory();
  const store = useSelector(st => st);
  const dispatch = useDispatch();
  const { title, description, body, comments } = store[postId];

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRemove = () => {
    dispatch(deletePost(postId));
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
    <div className="PostView" style={{ marginTop: '40px' }}>
      <div className="PostView-BlogList">
        <h3>{title}</h3>
        <h4>{description}</h4>
        <p>{body}</p>
        <Button variant='primary' onClick={handleEdit} style={{ margin: '5px' }}>Edit Form</Button>
        <Button variant='danger' onClick={handleRemove} style={{ margin: '5px' }}>Delete</Button>
      </div>
      <hr></hr>
      <div className="PostView-CommentList" style={{ marginTop: '40px' }}>
        <h2>Comments</h2>
        {comments.map(c => <Comment key={c.id} comment={c.comment} id={c.id} remove={removeComment} postId={postId} />)}
        <CommentForm post={post} />
      </div>
    </div>
  );
}

export default PostView;