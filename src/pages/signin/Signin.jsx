import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaLinkedin,FaFacebook } from "react-icons/fa";
import { AuthContext } from '../../Contexts/AuthProvider';

const Signin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {userSignin, googleSignin} = useContext(AuthContext)
    const handleGoogleSignin = ()=>{
        googleSignin()
        .then(res =>{
            console.log(res.user)
            navigate('/')
        })
        .catch(error=>console.log(error))
    }
    const handleSignin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        userSignin(email, password)
        .then(user => {
            console.log(user.user)
            event.target.reset();
            navigate('/')
        })
        .catch(error => setError(error.message))
    }
    return (
        <div className="hero w-full my-20">
        <div className="hero-content ">
            
            <form onSubmit={handleSignin} className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-5">
                <h1 className="text-5xl font-bold text-center">Signin</h1>
                <div className="card-body w-full">
                  
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" placeholder="email" className="input input-bordered lg:w-96" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    <p className='text-red-600'>{error}</p>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-blue-600 border-none text-white" type="submit" value="Signup" />
                    </div>
                    <div>
                            <p className='text-center'>Or Signin With</p>
                            <div className='flex justify-center gap-2 py-3'>
                <FaGoogle onClick={handleGoogleSignin} className='cursor-pointer w-12 h-12 bg-base-300 p-3  rounded-full'/>
         
                            </div>
                        </div>
                        <p className="text-center">New Here? <Link className='text-blue-600 font-bold' to='/signup'>Signup</Link></p>
                </div>
                
            </form>
        </div>
    </div>
    );
};

export default Signin;