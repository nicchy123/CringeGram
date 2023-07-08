import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import Post from "../Post/Post";
const Hero = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPost] = useState([])
  const [loading, setLoading] =useState(true)


  useEffect(()=>{
    fetch("http://localhost:5000/mostLikedPosts")
    .then(res=>res.json())
    .then(data=>{
      setLoading(false)
      setPost(data)
    })
  },[])

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!user) return toast.error("Please signin to continue");
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgHostKey
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const post = {
          image: imgData?.data?.url,
          text,
          name: user?.displayName,
          userImage: user?.photoURL,
          likes: 0,
        };
        fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            event.target.reset();
            setText("");
            setLoading(false);
          });
      });
    
    
    
    };
  return (
    <div className="flex flex-col  items-center my-10 min-h-[600px] container">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/2 mx-4"
        onSubmit={handleSubmit}
      >
        <textarea
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="What's on your mind?"
          value={text}
          onChange={handleTextChange}
        />
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleImageChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading && user ? "Posting" : "Post"}
        </button>
      </form>
      <div className="my-10 lg:w-3/6">
{
  posts.map(post=><Post post={post}/>)
}
      </div>
    </div>
  );
};

export default Hero;
