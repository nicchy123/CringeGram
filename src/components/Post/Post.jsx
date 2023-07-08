import React, { useContext, useState } from "react";
import { AiOutlineUser, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiComment, BiShare } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PropsProvider } from "../../Contexts/CommonPropsProovider";
const Post = ({ post,  }) => {
  const { text, image, date, userImage, name, _id, likes } = post;
  const [liked, setLiked] = useState(false);
const {loader,setLoader} = useContext(PropsProvider)
  const handleLike = (id) => {
    if (!liked) {
      fetch(`http://localhost:5000/likes/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLiked(!liked);
          setLoader(!loader);
        });
    } else {
      fetch(`http://localhost:5000/cancleLikes/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLiked(!liked);
          setLoader(!loader);
        });
    }
    
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center mb-2">
          {userImage ? (
            <img
              className="w-8 h-8 rounded-full object-cover mr-2"
              src={userImage}
              alt="Profile"
            />
          ) : (
            <AiOutlineUser className="w-8 h-8 rounded-full object-cover mr-2" />
          )}
          <div className="flex-1">
            <h3 className="text-sm font-medium">{name ? name : "not found"}</h3>
            <p className="text-xs text-gray-500">
              Posted on {date ? date : "not found"}
            </p>
          </div>
        </div>
        <div>
          <Link to={`/media/${_id}`}>
            <BsArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <p className="text-sm text-gray-700 my-2">
        {text.slice(0, 6)}.....{" "}
        <button>
          <Link to={`/media/${_id}`}>See More</Link>
        </button>
      </p>
      {image && <img src={image} alt="" />}
      {likes > 0 && (
        <h1 className="flex justify-start items-center gap-1">
          <AiFillLike className="text-blue-500 w-4 h-4" />
          {likes}
        </h1>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => [handleLike(_id), setLiked(!liked)]}
          className="flex items-center gap-2 justify-center   text-sm text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          {!liked ? (
            <AiOutlineLike className="w-5 h-5" />
          ) : (
            <AiFillLike className="w-5 h-5 text-blue-600" />
          )}
          {liked ? "Liked" : "Like"}
        </button>
        <Link to={`/media/${_id}`}>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 focus:outline-none">
            <BiComment className="w-5 h-5" />
            Comment
          </button>
        </Link>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 focus:outline-none">
          <BiShare className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
