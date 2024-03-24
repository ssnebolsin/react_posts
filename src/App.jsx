import { useState } from 'react'
import './App.css'

import AppInput from './AppInput'
import AppButton from './AppButton'
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import {Link} from 'react-router-dom'
import UsersInfo from './routes/UsersInfo'


function App() {

 
  let [loginData, setLoginData] = useState({
    'name':'',
    'username':''
  })
  let [users, setUsers] = useState([])
  let [userInfo, setUserInfo] = useState({
    'userId':'',
    'userName': ''
  })
  let [isLogged, setIslogged] = useState(false)



  const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    setUsers(users = await response.json())
  }

  const inputHandler = () => {
    setLoginData( loginData =
      {...loginData,
      [event.target.name]: event.target.value}
    )
    console.log(loginData)
  }

  const submitHandler = () => {
    event.preventDefault()
    
  }

  const logout = ()=>{
    setIslogged(isLogged = false)
    setLoginData( loginData =
      {
        'name':'',
        'username':''
      }
    )
  }

  const login = async ()=> {

    await getUsers()
    let nameCounter = 0
    let usernameCounter = 0
    // console.log(users)
        
    users.map((user)=>{
      if(loginData.name === user.name && loginData.username === user.username){
        setIslogged(isLogged=true)
        setUserInfo(
          userInfo = {
            'userId': user.id,
            'userName': user.name
          }
          )
        // console.log(userInfo)
        // console.log(userInfo.userId)
      }
      else if(loginData.name === user.name){
        nameCounter+=1
      }
      else if(loginData.username === user.username){
        usernameCounter+=1
      }
     
    })
    if(!isLogged){
      if(nameCounter > 0 && usernameCounter === 0){
        alert('username is invalid')
      }
      else if(nameCounter === 0 && usernameCounter > 0){
        alert('name is invalid')
      }
      else {
        alert('both name and username are invalid')
      }
      
    }

  }

  const showLoggingForm = ()=>{
    if(isLogged){
      
      return(
        
        <div>
           Welcome {userInfo.userName}
           <br />
           <AppButton value={'logout'} clickHandler = {logout}/>
            < Link to={`/usersinfo/${userInfo.userId}`}>User's Detailed info</Link>

          <Outlet/> 
        </div>
      )
    }
    else{
      return(
        <form onSubmit={submitHandler}>
            <AppInput propsType={'text'} propsPlaceholder={'name'} propsName={'name'} inputHandler={inputHandler} />
            <AppInput propsType={'text'} propsPlaceholder={'username'} propsName={'username'} inputHandler={inputHandler}/>
            <AppButton value={'login'} clickHandler={login}/>
        </form>
      
      )
    }
  }

  return (

    showLoggingForm()

  )
}

export default App
