import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContextProvider';

const Login = () => {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const { setuser } = useContext(UserContext);

    const [redirect,setRedirect]=useState(false);

    async function   handleLogin(ev) {
        ev.preventDefault();
        try {
          const {data} = await axios.post('http://localhost:3000/login', {email,password});
          console.log(data);
        //   window.localStorage.setItem("userid",data["_id"]);
          setuser(data);
          alert('Login successful');
          setRedirect(true);
        } catch (e) { 
            console.log(e);
          alert('Login failed');
        }
      }
    if(redirect){
        return <Navigate to={'/'} />
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>

            <div className='mb-32'>
                <h1 className='text-3xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto ' onSubmit={handleLogin}>
                    <input type="email" placeholder='your@email.com' value={email} onChange={(event) => setemail(event.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={(event) => setpassword(event.target.value)} />
                    <button className='primary'> Login </button>
                    <div className='text-center py-2 text-gray-500'>Don't have an account?
                        <Link className="Underline text-black" to={'/register'}>Register now</Link></div>
                </form>
            </div>

        </div>
    )
}

export default Login
