import React, { useEffect } from 'react';
import TitleList from './TitleList';
import { useSelector } from 'react-redux';
import { getAllPostsFromAPI } from './actions';
import { useDispatch } from 'react-redux';

function Home() {
  
  const dispatch = useDispatch();
  useEffect(() => {
      async function getAllPosts() {
      dispatch(getAllPostsFromAPI());
    }
    getAllPosts();
  }, [dispatch]);


  const store = useSelector(store => store);
  console.log("STORE", store)
  const singlePost = Object.entries(store).map(p => <TitleList post={p} key={p[0]} />);
  //singlePost to object
  return (
    <div className="Home" style={{ marginTop: '40px' }}>
      <div className="Home-title" style={{ margin: '20px' }}>
        <h4>Welcome to Microblog, our innovative site for communicating on the information superhighway.</h4>
        <hr></hr>
        {singlePost}
      </div>
    </div>
  );
}

export default Home;