import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password,
    }
    // console.log(captain);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home');
      // console.log("navigated to captain home");
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-3' src="https://pngimg.com/d/uber_PNG24.png" alt="uber" />
        <form action="" onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What your email</h3>
          <input type="email" required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='email@example.com'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg border placeholder:text-sm' />
          <h3 className='text-lg font-medium mb-2'>Enter Your Passowrd</h3>
          <input type="password" required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='password'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg border placeholder:text-sm' />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm'
          >Login</button>
          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-sm' to='/login'>
          Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin