import  useBlog  from '../hooks/useBlog';
import { useParams } from 'react-router-dom';
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";
import { FullBlogSkeleton } from "../components/Skeleton";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Blog = () => {
    useAuthRedirect();
    const  { id } = useParams<{id : string}>();
    const {loading, blog} = useBlog(id as string); 

    return <>
         <Appbar />
    {    (loading || !blog)? 
         <FullBlogSkeleton /> : 
         <div>
            <FullBlog blog={blog}/>
         </div>
    }
    </>
}

export default Blog;