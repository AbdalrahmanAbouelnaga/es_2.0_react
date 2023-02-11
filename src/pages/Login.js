import { toast } from 'bulma-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import axiosInstance from '../axios'


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
        const form_data = new FormData(e.target)
        axiosInstance.post('/login/',form_data)
             .then(res=>{
                const token = res.data.token
                localStorage.setItem('token',JSON.stringify(token))
                setToken(token)
                toast({
                    message:res.data.message,
                    position:"bottom-right",
                    pauseOnHover:true,
                    dismissible:true,
                    duration:1500,
                    type:"is-success"
                })

                Navigate("/")
             }).catch(error=>{
                toast({
                    message:error.response.data.non_field_errors[0],
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