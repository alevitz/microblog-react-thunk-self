import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PostView from './PostView';
import PostForm from './PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPostFromAPI } from './actions';

function SinglePost() {
  const { postId } = useParams();
  const [editing, setEditing] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true)
  const post = useSelector(st => st[postId]);
 
  
  const dispatch = useDispatch();
  useEffect(() => {
    async function getPost() {
       dispatch(getPostFromAPI(postId))
      setLoadingPost(false);
      console.log("use effect is working")
    }
    if(loadingPost){
      getPost();
    }
  }, [dispatch, postId, loadingPost]);

  
  
  console.log("post", post)
  const updatedstore = useSelector(st => st);
      console.log("updatedstore", updatedstore);
      
      console.log(loadingPost)
  if(!post){
    return <p>Loading Post</p>;
  }

  
  console.log("hitting second return")
  console.log("post", post)
  return (
    <div className="SinglePost">
        { 
        
      post
        ?
         editing ?
          <PostForm post={post} postId={postId} editing={editing} setEditing={setEditing} />
         : <PostView setEditing={setEditing} post={post} />
        : <Redirect to='/' />}

      }
        </div>
        );

    }
export default SinglePost;
