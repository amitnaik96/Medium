import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from 'react';
import { SignupInput } from "@darkxprime/medium-common";
import axios from 'axios';
import { BACKEND_URL } from "../config";

interface AuthProps {
    cardType : "signin" | "signup"
}

export const Auth = ({cardType} : AuthProps) => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        username : "",
        password : ""
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${cardType==="signup"? "signup" : "signin"}`, 
                postInputs
            );
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate('/');
        } catch (err) {
            // alert the user 
            alert('Error while signing in / up');
        }
    }

    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {cardType==="signup"? "Already have an account?" : "Don't have an account"}
                        <Link className="pl-2 underline" to={cardType==="signup"? "/signin" : "/signup"}>
                        {cardType==="signup"? "Login" : "Sign up"}
                        </Link>
                    </div>
                </div>
                <div className="pt-4">
                    {cardType==="signup"?   <LabelledInput label={"Name"} placeholder="Enter your name"
                    onChange={e => {
                        setPostInputs(c => ({
                            ...c,
                            name : e.target.value
                        }))
                    }}
                    />
                     : null
                    }
                    <LabelledInput label="Email" placeholder="m@gmail.com"
                        onChange={e => {
                            setPostInputs(c => ({
                                ...c,
                                username : e.target.value
                            }))
                        }}
                    />
                    <LabelledInput label="Password" placeholder="" 
                        onChange={e => {
                            setPostInputs(c => ({
                                ...c,
                                password : e.target.value
                            }))
                        }}
                        type={"password"}
                    />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{cardType==="signup"? "Sign up" : "Sign in"}</button>

                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string
}

export const LabelledInput = ({label, placeholder, onChange, type} : LabelledInputType) => {
    return <div className="w-full mt-4">
            <label htmlFor={label} className="block mb-2 text-sm font-semibold text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"}  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
}