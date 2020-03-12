import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';

const INITIAL_POSTS_STATE = {};

function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS_STATE);

  // const add = post => {
  //   let newPost = { ...post, id: uuid() };
  //   useDispat
  //   });
  // }

  const update = (id, updatedPost) => {
    setPosts(posts => {
      let postCopy = { ...posts };
      postCopy[id] = updatedPost;
      return postCopy;
    });
  }

  const addComment = (id, comment) => { //added this function to add comments
    setPosts(posts => {
      const postCopy = { ...posts };
      postCopy[id].comments = [...postCopy[id].comments, comment];
      return postCopy;
    });
  };

  const remove = id => {
    delete posts[id]
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes
          posts={posts}
          update={update}
          remove={remove}
          addComment={addComment}
          setPosts={setPosts}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
