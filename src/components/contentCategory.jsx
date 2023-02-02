import React from 'react'
import '../styles/contentCategory.css'
import data from '../content.json'
import Carousel from 'react-grid-carousel'
import { useParams } from 'react-router-dom'
import { Link as LinkRouter } from 'react-router-dom'
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import recipesActions from '../redux/actions/recipesActions'

export default function ContentCategory() {

    const dispatch = useDispatch()
    let { category } = useParams(); 
    console.log(category);
    
    
    const [recipesByCat, setRes] = useState([])
    useEffect(() => {

        // dispatch(recipesActions.getRecipesByCategory(category)).then( res => setRes(res.data.res) )
        dispatch(recipesActions.getRecipesByCategory(category))
        
    }, [])
    
    let cat = useSelector(store => store.recipesReducer.recipesByCategory)
    console.log(recipesByCat)
    return (

        <div className='category-box'>
            <div className="category-banner" style={{ backgroundImage: `url(${cat[0]?.categoryImg})` }} >
                <h4 className='mx-2 text-center z-40 text-black text-5xl px-7 py-4 bg-white'>{category} recipes</h4>
                <LinkRouter to="/" >
                    <div className="flex px-3 py-2 bg-white items-center justify-between my-2">
                        <BsArrowLeft size={18} />
                        <p className='text-lg text-[#222] my-2'>Back to categories</p>
                    </div>
                </LinkRouter>
            </div>
            <div className='videos-box w-full flex flex-col bg-[#f9ffe1]'>
                <h3 className='my-3 text-xl text-center'>Explore videos in the {category} category:</h3>
                <div className='videos my-5 w-full flex gap-1 flex-wrap justify-center items-center'>
                    <Carousel style={{
                        height: "12rem",
                        width: "100%"
                    }} cols={3} rows={1} gap={40} loop autoplay={3000}
                        mobileBreakpoint={200}
                        responsiveLayout={[
                            {
                                breakpoint: 576,
                                cols: 1,
                                rows: 2,
                                gap: 5
                            },
                            {
                                breakpoint: 768,
                                cols: 2,
                                rows: 2,
                                gap: 5
                            },
                            {
                                breakpoint: 992,
                                cols: 2,
                                rows: 2,
                                gap: 5
                            },
                            {
                                breakpoint: 1200,
                                cols: 2,
                                rows: 2,
                                gap: 10
                            },
                            {
                                breakpoint: 1400,
                                cols: 2,
                                rows: 2,
                                gap: 15,
                            }
                        ]}
                    >
                        {cat.map((item, i) => {
                            return (
                                <Carousel.Item
                                    key={i}
                                    className="carousel-box rounded-full"
                                    style={{
                                        height: "12rem",
                                        width: "50%",
                                        margin: 0
                                    }}>
                                    <LinkRouter to={item._id}>
                                        <div className='container'>
                                            <img className="image-carousel" height="100%" width="100%" src={item.thumbnail} alt={item.videoTitle} />
                                            <div className="centered flex flex-col">
                                                <h4 className='text-2xl my-1'>{item.videoTitle}</h4>
                                                <BsFillPlayCircleFill color='white' />
                                                {/* <h6 className='text-sm my-1'>{item.chefName}</h6> */}
                                            </div>
                                        </div>
                                    </LinkRouter>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>
            </div>

        </div>
    )
}
