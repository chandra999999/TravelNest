import React, { useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Register = () => {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [redirect,setredirect]=useState(false);
  
  async function Registeruser(ev){
    ev.preventDefault();
    console.log("hi");
    try {
      await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
      });
      alert('Registration Successfull');
setredirect(true);
    } catch (e) {
      alert("registration failed")
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>

      <div className='mb-32'>
        <h1 className='text-3xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto ' onSubmit={Registeruser}>
          <input type="text" placeholder='your name' value={name} onChange={(e) => { setname(e.target.value) }} />
          <input type="email" placeholder='your@email.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
          <input type="password" placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
          <button className='primary mt-1' > Register </button>
          <div className='text-center py-2 text-gray-500'>Don't have an account?
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register
