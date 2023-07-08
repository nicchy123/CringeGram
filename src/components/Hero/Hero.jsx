import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import Post from "../Post/Post";
import { PropsProvider } from "../../Contexts/CommonPropsProovider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loader, setLoader } = useContext(PropsProvider);
  useEffect(() => {
    fetch("http://localhost:5000/mostLikedPosts")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPost(data);
      });
  }, [loader]);

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
            toast.success("Your Content Posted");
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
        <div className="flex justify-between items-center gap-5">
          <input
            type="file"
            accept="image/*"
            className=" lg:w-full sm:w-3/4
           file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3  file:cursor-pointer file:shadow-lg file:shadow-blue-60/500 bg-gradient-to-br from-gray-400  t0-gray-700 text-white/80 rounded-full cursor-pointer shadow-sm shadow-gray-700/60 file:border-none file:roumded-full file:text-white"
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading && user ? "Posting" : "Post"}
          </button>
        </div>
      </form>
      <div className="my-10 lg:w-3/6">
        {posts.map((post) => (
          <Post
            setLoader={setLoader}
            loader={loader}
            key={post._id}
            post={post}
          />
        ))}

      </div>
        <Link to="/media">
      <button className="btn btn-outline px-20">
        See All
      </button>
        </Link>
    </div>
  );
};

export default Hero;
