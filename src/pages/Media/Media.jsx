import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";

const Media = () => {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data);
      });
  }, []);
  if(loading){
    return <div className='min-h-[600px] flex justify-center items-center'>
        <span className="loading loading-bars loading-lg"></span>
    </div>
}
  return (
    <div className="container min-h-[670px] lg:w-2/5 w-5/6">
        <div className="grid  grid-cols-1 my-10">
     {
        posts.map(post=><Post setLoader={setLoader} loader={loader} key={post._id} post={post}/>)
     }
    </div>
    </div>
  );
};

export default Media;
