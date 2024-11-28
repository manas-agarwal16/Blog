import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({chidren} , authentication) => {
    const authStatus = useSelector(state => state.auth.loginStatus);
    const navigate = useNavigate();

    const [loader , setLoader] = useState(true)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false);
    } , [authStatus , navigate , authentication]);

    //kabhi bhi authStatus me navigate (route change ho) or authentication jo calling function bhejega voh change ho. authentication ka abhi routes banayenge tph smjh aayega

    return loader ? <h1 className='text-gray-500'>Loading...</h1> : <>{chidren}</> ;
}

export default Protected;
