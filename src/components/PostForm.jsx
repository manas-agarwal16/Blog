import React, {useEffect} from 'react';
import { Input , Select , CustomEditor , Button } from './index';
import { useForm } from 'react-hook-form';
import { authServices , postServices} from '../appwrite/index';
import { useNavigate } from 'react-router-dom';
const PostForm = ({post}) => { //post ki agar edit krey tb bhejenge data.

    const {register , handleSubmit , control , watch , setValue , getValues} = useForm({
        defaultValues : {
            title : post?.title || "",
            content : post?.content || "",
            slug : post?.slug || "",
            status : post?.status || ""
        }
    });
    const navigate = useNavigate();

    const post = async (data) => {
        if(post){ //for edit
            try {
               const updatedPost =  await postServices.updatePost(post.$id , {...data , file : data.image[0]});
               console.log("post updated successfully : " , updatedPost);

               if(updatedPost)
                navigate(`/post/${updatedPost.$id}`)
            } catch (error) {
                console.log("error in updating post");
            }
        }
        else{
            try {
               const userData = authServices.currentUser();
               const post =  await postServices.addPost({...data , file : data.image[0] , userId : userData.$id});
               console.log("post added successfully : " , post);
            } catch (error) {
                console.log("error in adding post" , error);;  
            };
        }
    }

    useEffect(() => {
        if (titleVal) {
          const slug = titleVal.trim().toLowerCase().replace(/\s+/g, "-"); // Replace spaces with '-'
          setValue("slug", slug); // Update the slug value
        }
      }, [watch("title"), setValue]);
    

    return (
        <form className='flex justify-between items-center p-3' onSubmit={handleSubmit(post)}>
            <div className='flex flex-col justify-evenly items-center w-full md:w-[70%]'>
                <Input
                    {...register("title",{required: true})}
                    label='Title'
                    placeholder='Title'
                />
                <Input
                readOnly
                label='Slug: '
                {...register("slug") ,{required : true}}
                />
                <CustomEditor
                {...register("content",{required: true})}
                label='Content'
                control={control}
                />
            </div>
            <div className='flex flex-col w-full justify-evenly items-center'>
                <Input
                {...register("image" , {required : true})}
                label='image'
                type='file'
                />
                <Select
                {...register("status", { required: true })}
                label="status"
                value={getValues("status")}
                options={['active','unactive']}
                />
            </div>
            <Button/>
        </form>
    );
}

export default PostForm;
