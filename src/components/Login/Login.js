import React, { useContext } from 'react';
import { userInfo } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getToken, handleSignInWithGoogle, initializeFramework, signInWithEmailAndPassword } from './loginManager';



const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        photo: ''
    });
    initializeFramework();

    const [loggedInUser, setLoggedInUser] = useContext(userInfo);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const SignInWithGoogle = () => {
        handleSignInWithGoogle()
            .then(res => {
                setLoggedInUser(res);
                getTokenId();
                history.replace(from);
            })
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /^[^\s@]+@[^\s@]+$/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setLoggedInUser(res);
                    setUser(res);
                    history.replace(from);
                })

        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setLoggedInUser(res);
                    setUser(res);
                    history.replace(from);
                })
        }
        e.preventDefault()
    }
    const getTokenId = () => {
        getToken();
    }
    return (
        <div>
            <h1>This is something</h1>
            <button onClick={SignInWithGoogle}>Sign In With Google</button>
            <br />
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="checkbox" id="" />
            <label htmlFor="checkbox">Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                {newUser ? <input type="submit" value="Sign Up" /> : <input type="submit" value="Sign In" />}
                <br />
                {
                    user.success ? <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged in'} Successfully</p> :
                        <p style={{ color: 'red' }}>{user.error}</p>
                }
            </form>
        </div>
    );
};

export default Login;