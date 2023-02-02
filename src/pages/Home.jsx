import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/home.css'
import data from '../content.json'
import { useSelector, useDispatch } from 'react-redux'
import banner from '../assets/banner.mp4'
import logo from '../assets/logo-app.png'
import recipesActions from '../redux/actions/recipesActions'
import { useEffect } from 'react'


export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(recipesActions.getRecipes())

    }, [])


    let allRecipes = useSelector(store => store.recipesReducer.recipes)


    let resultFlat = allRecipes.map(obj => obj.category).flat(2)
    var unique = [];

    resultFlat.filter(function (item) {
        var i = unique.findIndex(x => (x.name == item.name && x.picture == item.picture));
        if (i <= -1) {
            unique.push(item);
        }
        return null;
    });


    const loggedUser = useSelector(store => store.usersReducer.loggedUser)
    // console.log(loggedUser);

    
    return (

        <div className='body min-h-[80vh]'>
            <div className='full-container h-full min-h-[23rem]'>
                <video className='video-banner' src={banner} autoPlay loop muted ></video>
                <div className='home-banner'>
                    <h1 className='title text-7xl text-red-900 flex flex-col dropshadow-lg mx-2'>
                        <span className='text-white'>Simple</span>
                        <span className='text-white'>&</span>
                        <span className='uppercase text-lime-700'>Quick</span>
                    </h1>
                    <h3 className='subtitle text-white text-2xl mt-3 mx-2'>Your favourite recipes in any device.</h3>
                </div>
            </div>
            <div className="streaming-box w-full h-[15rem] flex justify-center items-center bg-[#f9ffe1]">
                <img className="h-[12rem] w-[12rem]" src={logo} alt="logo" />
                <div className='flex flex-col items-start justify-center'>
                    <h3 className='text-2xl'>The streaming service that will level up your cooking skills.</h3>
                    <h4 className='text-lg'>Enjoy exclusive recipes from the most awarded chefs in the world.</h4>
                </div>
            </div>
            <div className='hi-box w-full min-h-[8rem] flex justify-center items-center bg-[#181818]'>
                {loggedUser ?
                    <h3 className='text-white text-center text-2xl mt-3 mx-3'>Hi, <span className='text-green-600 font-bold'>{loggedUser.first_name}</span>! Explore our categories and find your recipe:</h3>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <h3 className='text-white text-2xl mt-3 mx-3'>Hi, there! Please, <LinkRouter to='/logIn' className='font-bold underline'>log in</LinkRouter> to enjoy our content.</h3>
                    </div>
                }
            </div>
            {loggedUser &&
                <div className='categories-box bg-[#181818] flex w-full pb-4 flex-wrap justify-around items-center'>
                    {
                        unique.map((item, i) => {
                            return (
                                <LinkRouter key={i} to={item.name} className="category-card" style={{ backgroundImage: `url(${item.picture})` }}>
                                    <h4 className='card-text text-white text-center text-2xl h-[12rem] w-full flex justify-center items-center bg-black bg-opacity-60'>{item.name}</h4>
                                </LinkRouter>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
