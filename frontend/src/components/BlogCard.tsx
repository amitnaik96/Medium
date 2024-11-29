import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
    id : string;
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
} : BlogCardProps) => {
    return <>
        <Link to={`/blog/${id}`}>
            <div className="border-b p-2 mb-3 flex flex-col justify-center">
                <div className="flex mb-3">
                    <Avatar name={authorName} size={"small"}/>
                    <div className="flex flex-col justify-center font-light pl-2"> { authorName } </div>
                    <div className="flex flex-col justify-center pl-2 text-sm">
                        <Circle />
                    </div>
                    <div className="flex flex-col justify-center pl-2 font-thin text-sm text-slate-500"> { publishedDate } </div>
                </div>
                <div className="text-xl font-semibold">
                    { title }
                </div>
                <div className="text-md font-thin mb-3">
                    { content.slice(0, 100) + '...'}
                </div>
                <div className="text-slate-400 text-sm font-thin">
                    {`${Math.floor(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    </>
    
} 

export const Circle = () => {
    return <div className="w-1 h-1 bg-slate-500 rounded-full">
    </div>
}

