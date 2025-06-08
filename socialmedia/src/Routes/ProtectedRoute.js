import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../Features/Counter/LoginSlice';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {

        try {
            let loginStatus = false;
            const userToken = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId');

            const decoded = jwtDecode(userToken);

            if (decoded.userId == userId) {
                console.log("Hello")
                loginStatus = true;
            }

            if (userToken && userId && loginStatus) {
                dispatch(setLoginData({ token: userToken, userId: userId }));
            } else {
                navigator('/auth-failed');
            }
        } catch (error) {
            navigator('/auth-failed');
        }
    }, [dispatch, navigator]);
    if (localStorage.getItem('userToken')) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
