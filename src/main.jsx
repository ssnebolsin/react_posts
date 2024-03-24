import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import UsersInfo from './routes/UsersInfo.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path: '/usersinfo/:id',
        element: <UsersInfo/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
