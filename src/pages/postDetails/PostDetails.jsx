import React, { useContext, useEffect, useState } from "react";
import {
  AiFillCaretRight,
  AiFillLike,
  AiOutlineLike,
  AiOutlineUser,
} from "react-icons/ai";
import { BiComment, BiShare } from "react-icons/bi";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { PropsProvider } from "../../Contexts/CommonPropsProovider";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const postDetails = useLoaderData();
  const [commentText, setComment] = useState("");
  const { text, image, date, userImage, name, _id, likes } = postDetails;
  const { loader, setLoader } = useContext(PropsProvider);
  const [liked, setLiked] = useState(false);
  const [refresher,setREfresher] = useState(false)
  const [comments, setComments] = useState([]);
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

  const handleComment = () => {
    const comment = {
      comment: commentText,
      postId: _id,
      name: user?.displayName,
      photo: user?.photoURL,
    };
    if (commentText.length > 0) {
      fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.getElementById("comment").value= ""
          setComment("")
          setREfresher(()=>!refresher)
        });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/comment/${_id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [refresher]);

  return (
    <div className="min-h-[600px]">
      <div className="bg-white rounded-lg shadow p-4 container lg:w-3/6 my-10 lg:mb-32">
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
              <h3 className="text-sm font-medium">
                {name ? name : "not found"}
              </h3>
              <p className="text-xs text-gray-500">
                Posted on {date ? date : "not found"}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-700 my-2">{text}</p>
        {image && <img src={image} alt="" />}
       
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              handleLike(_id), setLiked(!liked);
            }}
            className="flex items-center gap-2 justify-center   text-sm text-gray-500 hover:text-blue-500 focus:outline-none"
          >
            {likes > 0 && (
          <h1 className="flex justify-start items-center gap-1">
            <AiFillLike className="text-blue-500 w-4 h-4" />
            {likes}
          </h1>
        )}
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 focus:outline-none">
            <BiComment className="w-5 h-5" />
            Comment
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 focus:outline-none">
            <BiShare className="w-5 h-5" />
            Share
          </button>
        </div>
        <div>
          <div className="flex justify-start items-center gap-3 my-8 ">
            {user?.photoURL ? (
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            ) : (
              <AiOutlineUser className="w-10 h-10 p-1 rounded-full object-cover border" />
            )}
            <input
            id="comment"
              onChange={(e) =>  setComment(e.target.value)}
              type="text"
              className="border border-black outline-none rounded-full p-2 w-full "
              placeholder="Write a comment....."
            />
            <AiFillCaretRight
              onClick={handleComment}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </div>
        <div>
          {comments.map((comment) => (
            <div className="flex justify-start gap-3" key={comment._id}>
              <div>
                {comment.photo?comment.photo: <AiOutlineUser className="w-10 h-10 p-1 rounded-full object-cover border"/>}
              </div>
             <div>
              <h3> <span className="mr-4 font-bold">{comment.name?comment.name: "Name Not Found"}</span > <span  className="text-sm">{comment.date}</span></h3>
             <p className="text-sm">{comment.comment}</p>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
