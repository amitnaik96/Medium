import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import axios from  "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom"; 
import useAuthRedirect from "../hooks/useAuthRedirect";

const Publish = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function addBlog(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            },{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (err) {
            alert('Could not publish Blog')
        }
    }

   return <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input onChange={(e) => setTitle(e.target.value)} type="email" id="title" aria-describedby="helper-text-explanation" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5" placeholder="Title.." />

                    <TextArea onchange={e => {
                        setContent(e.target.value);
                    }}/>

                    <button onClick={addBlog} type="submit" className="inline-flex items-center mt-3 px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg  focus:ring-blue-200">
                    Publish Blog
                </button>
                </div>
            </div>
        </div> 
}

const TextArea = ({ onchange } : {onchange: (e : ChangeEvent<HTMLTextAreaElement>) => void}) => {
    return <div className="mt-3">
        <textarea onChange={onchange} id="message" rows={10} className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Type Content here..."></textarea>
    </div>
}
export default Publish;