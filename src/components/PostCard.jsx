import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({fileURL,title , postEndpoint}) => {
    return (
        <Link to={postEndpoint} className='w-full p-4 rounded-lg text-black'>
            <img className='w-full h-[75%] object-contain m-2' src="fileURL" alt="blogImage" />
            <p className='mb-2' >{title}</p>
        </Link>
    );
}

export default PostCard;
