import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { postServices } from "../appwrite";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    postServices.allPosts().then((posts) => setPosts(posts.documents));
  }, [navigate]); //whenever route change

  return (
    <div>
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <li className="p-3" key={post.$id}>
              <PostCard
                fileURL={post.fileURL}
                title={post.title}
                postId={post.$id}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default AllPosts;
