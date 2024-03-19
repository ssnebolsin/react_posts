import { useState } from 'react'
import './App.css'
import PostCard from './PostCard'
import AppInput from './AppInput'
import AppButton from './AppButton'

function App() {

  let [posts, setPosts] = useState([])
  let [loginData, setLoginData] = useState({
    'name':'',
    'username':''
  })
  let [users, setUsers] = useState([])
  let [user, setUser] = useState('')
  let [isLogged, setIslogged] = useState(false)

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(posts = json))
  }

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(json => setUsers(users = json))
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

  const login = ()=> {

    let nameCounter = 0
    let usernameCounter = 0
    getUsers()
    users.map((user)=>{
      if(loginData.name === user.name && loginData.username === user.username){
        setIslogged(isLogged=true)
        setUser(user = user.name)
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
      getPosts()
      return(
        
        <div>
           {user}
           <AppButton value={'logout'} clickHandler = {logout}/>

            {
              posts.map((item) => (
                  <PostCard key={item.id} item={item}/>
                )
              )
            }
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
