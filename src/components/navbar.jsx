import React from 'react'
import '../styles/navbar.css'
import { BiMenu } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UnknownUser from '../assets/unknown_user.jpg'
import userActions from '../redux/actions/userActions'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)


    let links = [
        { name: "Home", to: "/" },
        { name: "Log In", to: "/login" }
    ]

    let loggedUser = useSelector(store => store.usersReducer.loggedUser)

    const handleSignOut = () => {
        dispatch(userActions.userSignOut());
        if (loggedUser) {
            toast.error("You have signed out")
        }
    }




    return (
        <>
            <div className='container-box'>
                <div className='menu-mobile'>
                    {open ? <BiX onClick={() => setOpen(false)} color="white" size={25} /> : <BiMenu onClick={() => setOpen(true)} color="white" size={25} />}
                    <div>
                        <img className="avatar h-[2.7rem] w-[2.7rem] rounded-full object-cover" src={loggedUser?.avatar || UnknownUser} alt={loggedUser ? "userAvatar" : "unknown user"} />
                    </div>
                </div>
                <div className='menu-desktop'>




                    {
                        !loggedUser ?
                            links.map((link, i) => {
                                return (
                                    <LinkRouter className="mx-4" key={i} to={link.to}>{link.name}</LinkRouter>
                                )
                            })
                            :
                            <LinkRouter className="mx-4" to="/" onClick={handleSignOut}>Sign Out</LinkRouter>
                    }


                    <div>
                        <img className="avatar h-[2.3rem] w-[2.3rem] rounded-full object-cover" src={loggedUser?.avatar || UnknownUser} alt="Unknown_user" />
                    </div>
                </div>
            </div>

            {open &&
                <div className='burger-menu'>
                    {links.map((link, i) => <LinkRouter className="link burger-link my-3" key={i} to={link.to}>{link.name}</LinkRouter>)}
                </div>
            }
        </>
    )
}
