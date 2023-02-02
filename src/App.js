import './styles/index.css';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Footer from './components/footer'
import ContentCategory from './components/contentCategory'
import ContentDetails from './components/contentDetails'
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from './redux/actions/userActions';
import toast from 'react-hot-toast';


function App() {
  //En este proyecto, el logueo de usuario está realizado provisoriamente a nivel frontend, guardando los datos del usuario sin encriptar en el localstorage. En mi repositorio https://github.com/mgcaruso/mytinerary-public , podrá encontrar un proyecto con registro y logueo REAL (incluido registro y logueo con Google), realizando todas las validaciones necesarias a nivel back y consumo de la base de datos desde el front. 
  const dispatch = useDispatch()
  const loggedUser = useSelector(store => store.usersReducer.loggedUser)





  useEffect(() => {

    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem('token')
      dispatch(userActions.verifyToken(token)) //CHEQUEAR
    }

  }, [])




  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        {loggedUser && <Route exact path='/:category' element={<ContentCategory />} />}
        <Route exact path='/:category/:recipeId' element={<ContentDetails />} />
        {/* {loggedUser && <Route exact path='/(/:category)(/:recipeId)' element={<ContentDetails />} />} */}
        {!loggedUser ? <Route exact path='/login' element={<LogIn />} /> : <Route exact path='/login' element={<Home />} />}
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
