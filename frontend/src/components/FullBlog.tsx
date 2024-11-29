import { Avatar } from "./Avatar";
import { Blog } from "../hooks/useBlog";

const FullBlog = ({blog} : {blog : Blog}) => {
    return <>
            <div className="flex justify-center w-full">
                <div className="grid grid-rows-2 lg:grid-cols-12  px-10 pt-12 max-w-screen-2xl">
                    <div className="col-span-8 px-3 pt-2">
                        <div className="text-3xl font-extrabold mb-2">
                            { blog.title }
                        </div>
                        <div className="text-slate-500">Posted on December 2, 2024</div>
                        <div className="pt-4">
                            { blog.content }
                        </div>
                    </div>
                    <div className="mt-3 px-5 lg:col-span-4">
                        <div className="font-semibold text-md">Author</div>
                        <div className="flex pt-3">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar name={blog.author.name || "Anonymous"} size={"big"}/>
                            </div>
                            <div>
                                <div className="text-xl font-bold flex flex-col justify-center">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-700">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
    </>
}

export default FullBlog;