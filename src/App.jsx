import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import AppHeader from './components/Header'
import Login from './pages/Auth'
import ResetPassword from './components/resetPassword';
import MainPage from './components/mainPage';

function App() {
  const [isloggedIn, setIsLoggin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggin(true)
    }
  })

  const Root = () => {
    return (
      <div className='app'>
        <AppHeader setIsLoggin={setIsLoggin} isloggedIn={isloggedIn} />
        <Outlet />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: isloggedIn ? <MainPage /> : <Login setIsLoggin={setIsLoggin} />,
        },
        {
          path: "/password/resetpassword/:id",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
