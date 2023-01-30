import axios from 'axios'
import { toast } from 'bulma-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


export default function Login() {
    const {setToken} = useContext(AuthContext)
    const Navigate = useNavigate()
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [showPass,setShowPass]= useState(false)

    function changeUsername(e){
        setUsername(e.target.value)
    }

    function changePassword(e){
        setPassword(e.target.value)
    }

    function ChangeShowPass(e){
        setShowPass(e.target.checked)
    }

    function handleSubmit(e){
        e.preventDefault()
        const data = {username,password}
        axios.post('/token/login/',data)
             .then(res=>{
                const token = res.data.auth_token
                localStorage.setItem('token',JSON.stringify(token))
                setToken(token)
                toast({
                    message:"Login successful,Redirecting to home page.",
                    position:"bottom-right",
                    pauseOnHover:true,
                    dismissible:true,
                    duration:1500,
                    type:"is-success"
                })
                Navigate("/")
             }).catch(error=>{
                toast({
                    message:"Something went wrong.Please try again",
                    position:"bottom-right",
                    pauseOnHover:true,
                    dismissible:true,
                    duration:1500,
                    type:"is-warning"
                })
                console.log(error)
            })
    }

    return (
        <div className="column is-12 mt-6 columns is-multiline">
        <div className="column is-4 is-offset-4">
            <form onSubmit={e=>{handleSubmit(e)}} className="box p-4">
                <h2 className="title has-text-centered">Login</h2>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <div className="control">
                        <input type="text" className="input" name="username" value={username} onChange={(e)=>{changeUsername(e)}} />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="control">
                        <input type={showPass?'text':'password'} id="password-login" className="input" name="password" value={password} onChange={(e)=>{changePassword(e)}} />
                        <div>
                            <input type="checkbox" name="showPass" id="showPass1"  value={showPass} onChange={e=>{ChangeShowPass(e)}} />
                            <label htmlFor="showPass" className="is-size-7"> Show Password</label>
                        </div>
                    </div>
                    <a href="/reset-password" className="is-size-7">Forgot your password?</a>
                </div>
                <div className="has-text-centered"><button className="button is-dark" type="submit">Login</button></div>
                
            </form>
            <p className="subtitle">Don't have an account? <a href="/signup">Sign Up</a>.</p>
        </div>
    </div>
    )
}