import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

const Appbar = () => {
    return <>
        <div className="flex justify-between border-b px-10 py-2 mb-4">
            <Link to="/" className="font-semibold flex flex-col justify-center text-xl cursor-pointer">
                Medium
            </Link>
            <div>
                <Link to="/publish">
                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mr-4">Publish</button>
                </Link>
                <Avatar name={"Amit"} size={"big"}/>
            </div>
        </div>
    </>
}   

export default Appbar;