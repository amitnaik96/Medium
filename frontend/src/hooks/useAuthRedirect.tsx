import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/me`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const loggedIn = response.data.loggedIn;
            if(!loggedIn){
                navigate('/signin');
            }
            else if(window.location.pathname==='/signin' || window.location.pathname==='/signup'){
                navigate('/');
            }
        })
    }, [navigate]);
}

export default useAuthRedirect;