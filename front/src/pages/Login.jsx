import axios from 'axios'
import React, { useState } from 'react'

export const Login = () => {
    const [data,setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = (e) => {
        e.preventDefault()
        axios.get("http://localhost:3000")
    }

  return (
    <div>
        <form onSubmit={loginUser}>
        <label>Email</label>
        <input type="email" placeholder="Enter Email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder="Enter Password..." value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
