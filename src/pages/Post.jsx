import { Container } from "../components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postServices } from "../appwrite";
import { useSelector } from "react-redux";
import { Button } from "../components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const Post = () => {

  console.log("here");
  

  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.userData);
  console.log("user" , user);
  
  useEffect(() => {
    postServices.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        console.log("post not found");
        alert("post not found");
        navigate("/");
      }
    });
  }, [navigate, slug]);

  const isAuthor = user && post.userId === user.$id;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      postServices
        .deletePost(post.$id)
        .then(() => {
          alert("Post deleted successfully!");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error in deleting post:", err);
          alert("Failed to delete post. Please try again.");
        });
    }
  };

  return (
    <Container>
      <img
        src={post.fileURL}
        alt="blog"
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1>{post.title}</h1>
      <p>{parse(post.content)}</p>
      {isAuthor ? (
        <div>
          <Link to={`/edit-post/${post.$id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={handleDelete} bgColor="bg-red-500">
            Delete
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Post;
