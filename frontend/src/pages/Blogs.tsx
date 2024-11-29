import { BlogCard } from "../components/BlogCard";
import Appbar from "../components/Appbar";
import useBlogs from "../hooks/useBlogs";
import { BlogsSkeleton } from "../components/Skeleton";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Blogs = () => {
    useAuthRedirect();
    const {loading, blogs} = useBlogs();

    return <>
            <Appbar />
        {loading? 
            <div>
                <div className="w-full flex justify-center">
                    <div className="max-w-xl flex  flex-col justify-center">
                        <BlogsSkeleton />
                        <BlogsSkeleton />
                        <BlogsSkeleton />
                        <BlogsSkeleton />
                        <BlogsSkeleton />
                        <BlogsSkeleton />
                    </div>
                </div>
            </div>
        : 

        <div>
            <div className="flex justify-center">
                <div className="max-w-xl flex flex-col justify-center">
                    {blogs.map(blog => (<BlogCard 
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate="2nd Feb 2024" //later add this field to backend
                        />)
                    )}
                </div>
            </div>
        </div>
    }
    </>
}

export default Blogs;