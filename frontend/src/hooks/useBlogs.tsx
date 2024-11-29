import { BACKEND_URL } from '../config'
import { useState, useEffect } from "react";
import axios from 'axios';

interface Blog {
    id : string;
    title : string;
    content : string;
    author : {
        name : string;
    }
}

const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, []);

    return {loading, blogs};
}

export default useBlogs;