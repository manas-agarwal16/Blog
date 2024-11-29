import React, { useEffect } from "react";
import { Input, Select, CustomEditor, Button } from "./index";
import { useForm } from "react-hook-form";
import { authServices, postServices } from "../appwrite/index";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();

  const handlePost = async (data) => {
    console.log("post data : " , data);
    if (post) {
      try {
        const updatedPost = await postServices.updatePost(post.$id, {
          ...data,
          file: data.image[0],
        });
        console.log("Post updated successfully:", updatedPost);
        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      } catch (error) {
        console.error("Error in updating post:", error);
      }
    } else {
      try {
        const userData = await authServices.currentUser();

        console.log("logged in user : " , userData);
        
        console.log("data.image" , data.image);
        console.log("data.image[0]" , data.image[0]);
        

        const newPost = await postServices.addPost({
          ...data,
          file: data.image[0],
          userId: userData.$id,
        });
        console.log("Post added successfully:", newPost);
        if (newPost) navigate(`/post/${newPost.$id}`);
      } catch (error) {
        console.error("Error in adding post:", error);
      }
    }
  };

  useEffect(() => {
    const title = getValues("title");
    if (title) {
      const slug = title.trim().toLowerCase().replace(/\s+/g, "-");
      setValue("slug", slug);
    }
  }, [watch("title"), setValue, getValues]);

  return (
    <form className="p-3" onSubmit={handleSubmit(handlePost)}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section */}
        <div className="flex flex-col w-full md:basis-7/10 space-y-4">
          <Input
            {...register("title", { required: true })}
            label="Title:"
            placeholder="Enter the title"
          />
          <Input
            {...register("slug", { required: true })}
            label="Slug:"
            placeholder="Generated slug"
            readOnly
          />
          <CustomEditor label="Content:" control={control}
          {...register("content")} />
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full md:basis-3/10 space-y-4">
          <Input
            {...register("image", { required: true })}
            label="Choose Blog Image:"
            type="file"
            className="w-full"
          />
          <Select
            {...register("status", { required: true })}
            label="Status:"
            options={["active", "unactive"]}
            className="rounded-md p-2 w-full"
            // onChange={(e) => setValue("status", e.target.value)}
          />
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
