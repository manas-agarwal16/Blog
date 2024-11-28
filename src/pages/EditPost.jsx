import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postServices } from "../appwrite";
import { useParams } from "react-router-dom";
import { PostForm } from "../components";
import { Container } from "../components";

const EditPost = () => {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) postServices.getPost(slug).then((post) => setPost(post));
  }, [slug, navigate]);

  return post ? <Container> <PostForm post={post} /> </Container> : null;
};

export default EditPost;
