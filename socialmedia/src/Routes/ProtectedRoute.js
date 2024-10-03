import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../Features/Counter/LoginSlice';
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');

        if (userToken && userId) {
            dispatch(setLoginData({ token: userToken, userId: userId }));
        } else {
            navigator('/auth-failed');
        }
    }, [dispatch,navigator]);
    if (localStorage.getItem('userToken')) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
