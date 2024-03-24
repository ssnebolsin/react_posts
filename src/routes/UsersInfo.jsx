import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useState } from 'react'
import PostCard from '../PostCard'
import { useEffect } from 'react'




const UsersInfo = ()=>{

    let [posts, setPosts] = useState([])
    let [userDetails, setUserDetails] = useState({
        'userName': '',
        'email': '',
        'username': '',
        'city':'',
        'company': ''
      })
    const params = useParams()
    const navigate = useNavigate()
    const goBack = ()=>{
        navigate(-1)
    }

    const getUserDetails = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
        const userData = await response.json()
        setUserDetails(userDetails = {
            'userName': userData.name,
            'email': userData.email,
            'username': userData.username,
            'city':userData.address.city,
            'company': userData.company.name
        })
      }

    const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${params.id}`)
    setPosts(posts = await response.json())
        }

    useEffect(()=>{
        getPosts()
        getUserDetails()
    }, [])

    return(
        <>
            <button onClick={()=>{goBack()}}>goBack</button>
            <h2>User's Details</h2>
            <div>
                <p>name is <span className="userData">{userDetails.userName}</span> </p>
                <p>email is <span className="userData">{userDetails.email}</span> </p>
                <p>username is <span className="userData">{userDetails.username}</span> </p>
                <p>city is - <span className="userData">{userDetails.city}</span> </p>
                <p>company is - <span className="userData">{userDetails.city}</span> </p>
            </div>

            <h2>User's Posts:</h2>
            {
              posts.map((item) => (
                  <PostCard key={item.id} item={item}/>
                )
              )
            }
        </>
    )
       

    
}

export default UsersInfo