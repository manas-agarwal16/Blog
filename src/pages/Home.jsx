import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postServices } from "../appwrite";
import { Link } from "react-router-dom";
import { PostCard } from "../components";
import { Container } from "../components";
import {Button} from "../components"

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postServices.allPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (posts.length == 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className=" text-3xl m-10" >No blogs posted yet</h1>
          <Link to={"./add-post"}>
            <Button text="Add Post"></Button>
          </Link>
        </div>
      </>
    );
  }
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
