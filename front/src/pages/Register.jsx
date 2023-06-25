import axios from "axios";
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const registerUser = async(e) => {
        e.preventDefault()
        const {name,email,password} = data
        try{
            const {data} = await axios.post('http://localhost:3000/register', {
                name, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login Successful!')
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="container">
      <form onSubmit={registerUser} className="flex flex-col">
        <label>Name</label>
        <input className="border" type="text" placeholder="Enter Name..." value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
        <label>Email</label>
        <input className="border" type="email" placeholder="Enter Email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input className="border" type="password" placeholder="Enter Password..." value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <button className="border" type="submit">Submit</button>
      </form>
    </div>
  );
};
