import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContextProvider';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Places from './Places';
const Account = () => {
    const { ready, user,setuser } = useContext(UserContext);
    const [redirect,setredirect]=useState(null);
    let { subpage } = useParams();

    if (subpage === undefined){
        subpage = 'profile';
    }
async function logout(){
await    axios.post('http://localhost:3000/logout');

setredirect('/');
setuser(null);
}
    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    function linkclasses(type = null) {
        let classes = 'py-2 px-6';

        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white rounded-full';
        }

        return classes;
    }
if(redirect){
return <Navigate to={redirect}/>
}
    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
                <Link className={linkclasses('profile')} to={'/account'}>
                    My Profile
                </Link>
                <Link className={linkclasses('bookings')} to={'/account/bookings'}>
                    My bookings
                </Link>
                <Link className={linkclasses('places')} to={'/account/places'}>
                    My Places
                </Link>
            </nav>
            {
                subpage==='profile'&&user&&(
                    <div className='text-center m-w-lg mx-auto'>
                        Logged in as {user.name} ({user.email})<br />
                        <button onClick={logout}className='bg-primary max-w-sm mt-2 rounded-full text-white p-2'>Log out</button>
                        </div>
                
            )}
            {
                subpage==='places'&&(<Places />)
            }
        </div>
    );
};

export default Account;
