import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addPost} from './actions';
import { v4 as uuid } from 'uuid';

function PostForm({ add, update, postId, editing, setEditing, post }) {
  const dispatch = useDispatch();
  const INITIAL_FORM_DATA = post ?
    post[1]
    : {
      title: "",
      description: "",
      body: "",
      comments: []
    };
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleSubmit = e => {
    if (!editing) {
    e.preventDefault();
    let newPost = { ...formData, id: uuid() };
  dispatch(addPost({...newPost}));
  history.push('/');
  setFormData(INITIAL_FORM_DATA);
} else {
  e.preventDefault();
  update(postId, formData);
  setEditing(false);
  history.push(`/${postId}`);
}
}


  // const handleSubmit = e => {
  //   if (!editing) {
  //     e.preventDefault();
  //     dispatch({ type: action, payload: { ...formData }});
  //     // add({ ...formData });
  //     history.push('/');
  //     setFormData(INITIAL_FORM_DATA);
  //   } else {
  //     e.preventDefault();
  //     update(postId, formData);
  //     setEditing(false);
  //     history.push(`/${postId}`);
  //   }
  // }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCancel = () => {
    history.push('/');
    setFormData(INITIAL_FORM_DATA);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="body">Body:</label>
        <input
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
        <button>Save</button>
      </form>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default PostForm;