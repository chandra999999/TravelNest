import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Perkslables from './Perkslables';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Places = () => {
    const { action } = useParams();
    const [title, settitle] = useState('');
    const [address, setaddress] = useState('');
    const [aphotos, setaphotos] = useState('');
    const [photolink, setphotolink] = useState('');
    const [description, setdescription] = useState('');
    const [perks, setperks] = useState('');
    const [extrainfo, setextrainfo] = useState('');
    const [checkin, setcheckin] = useState('');
    const [maxguests, setmaxguests] = useState(1);
    const [redirecttoplaceslist, setredirecttoplaceslist] = useState(false);
    function uploadphoto(ev) {
        ev.preventDefault();
        const files = ev.target.files;
        console.log({ files });
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/uploads', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filename } = response;

            setaphotos(prev => {
                return [...prev, filename];
            });
            console.log(data);
        })
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();

        try {
            const { data: filename } = await axios.post('http://localhost:3000/upload-by-link', { link: photolink });
            setaphotos(prev => {
                return [...prev, filename];
            });
            setphotolink('');
        } catch (error) {
            console.error('Error:', error);
            // Handle the error, e.g., show an error message to the user
        }
    }



    async function addnewplaec(ev) {
        ev.preventDefault();
        const { data } = await axios.post('http://localhost:3000/places', {
            title, address, aphotos, description,
            extrainfo, checkin, maxguests
        });
       setredirecttoplaceslist(true);
    }
    



    function inputheader(label) {
        return (
            <h2 className='text-xl m-2'>{label}</h2>
        )
    }
    function inputdescription(text) {
        return (
            <p className='text-gray-100 '>{text}</p>
        )
    }
    function preinput(header, description) {
        return (
            <>
                {inputheader(header)}
                {inputdescription(description)}
            </>
        )
    }
    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link className='inline-flex gap-1  bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>

                        Add new   places</Link>

                </div>

            )}
            {
                action === 'new' && (
                    <div>
                        <form onSubmit={addnewplaec}>
                            {preinput('title', 'title for ur place')}

                            <input type="text" placeholder='title, for example my lovely apartment' value={title} onChange={(ev) => { settitle(ev.target.value) }} />
                            {preinput('Addres', 'Address to this place')}
                            <input type="text" placeholder='address' value={address} onChange={(ev) => { setaddress(ev.target.value) }} />
                            {preinput('photos', 'more-better')}
                            <div className='flex g-2'>
                                <input type="text" placeholder={'Add using a link ....jpg'}
                                    value={photolink}
                                    onChange={(ev) => { setphotolink(ev.target.value) }} />

                                <button onClick={addPhotoByLink} className='bg-gray-100 px-4 rounded-2xl'>Grab Photo</button>

                            </div>
                            <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 '>
                                {
                                    aphotos.length > 0 &&
                                    aphotos.map((photo, index) => (
                                        <div key={index} id={photo.id}>
                                            <img className='rounded-2xl' src={'http://localhost:3000/uploads/' + photo} />
                                        </div>
                                    ))
                                }

                                <label className='border bg-transparent rounded-2xl  flex items-center justify-center g-1'>
                                    <input type='file' multiple className='hidden' onChange={uploadphoto} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                    </svg>
                                    upload
                                </label>
                            </div>
                            <h2 className='text-2xl mt-4'>Description</h2>
                            <p className='text-gray-500 text-sm'>description of place</p>
                            <textarea value={description} onChange={(ev) => { setdescription(ev.target.value) }} />
                            <h2 className='text-2xl mt-4'>Perks</h2>
                            <p className='text-gray-500 text-sm'>Select all the perks</p>

                            <Perkslables selected={perks} onChange={setperks} />


                            <h2 className='text-xl m-2'>Extar Info</h2>
                            <p className='text-gray-100 '>House rules,etc</p>
                            <textarea value={extrainfo} onChange={(ev) => { setextrainfo(ev.target.value) }} />

                            <h2 className='text-xl m-2'>Check In and out times,max guests</h2>
                            <p className='text-gray-100 '>add check in and out times,remeber to have sometime window</p>
                            <div className='grid gap-2 sm:grid-cols-3'>
                                <div>
                                    <h3 className='mt-2 -mb-2'>Check IN time</h3>

                                    <input type='text' placeholder='14:00' />
                                </div>
                                <div>
                                    <h3 className='mt-2 -mb-2'>Check out time</h3>
                                    <input type='text' placeholder='13:00' />
                                </div>
                                <div>
                                    <h3>Max no of guests</h3>
                                    <input type='text' placeholder='ex:3' />
                                </div>
                            </div>

                            <button className='primary my-4'>Save</button>

                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Places;