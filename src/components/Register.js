import React, { useRef } from 'react'
import { auth, signInWithGoogle } from "../firebase";
import './register.css';

function Register() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" className='signInButton' onClick={signIn}>
                    Log In
                </button>
                <button type="submit" className="signInWithGoogle"
                    onClick={signInWithGoogle}>
                    Sign In with Google
                </button>
                <h4>
                    <span className="signUpScreen-gray"> New to APP? </span>
                    <span className="signUpScreen_link" onClick={register}>
                        Sign up now.
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default Register