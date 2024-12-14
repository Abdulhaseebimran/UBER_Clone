import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState('');

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/login');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-3' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber" />
        <form action="" onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What your Name</h3>
          <div className='flex gap-4 mb-5'>
            <input type="text" required
              placeholder='First Name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg border placeholder:text-base' />
            <input type="text" required
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg border placeholder:text-base' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What your email</h3>
          <input type="email" required
            placeholder='email@example.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg border placeholder:text-base' />
          <h3 className='text-lg font-medium mb-2'>Enter Your Passowrd</h3>
          <input type="password" required
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg border placeholder:text-base' />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm'
          >Create account</button>
          <p className='text-center'>Already Have a account? <Link to='/login' className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <p>
          By proceeding, you agree to our
          <span className="text-blue-500 font-semibold">Terms of Service</span> and
          <span className="text-blue-500 font-semibold"> Privacy Policy</span>.
          If you have questions,
          <span className="text-blue-500 font-semibold"> contact support</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignUp