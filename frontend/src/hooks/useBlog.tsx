import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export interface Blog {
    id : string;
    title : string;
    content : string;
    author : {
        name : string;
    }
}

const useBlog = (id : string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, []);

    return { loading, blog};
}

export default useBlog;