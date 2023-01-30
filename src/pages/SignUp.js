import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'bulma-toast'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const Navigate = useNavigate()
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [first_name,setFirstName]=useState('')
    const [last_name,setLastName]=useState('')
    const [password1,setPass]=useState('')
    const [password2,setConfPass]=useState('')

    function handleSubmit(e){
        e.preventDefault()
        if (password1 === password2){
            const data ={
                username,
                email,
                first_name,
                last_name,
                password:password1
            }
            console.log(data)
            axios.post('/user/',data)
                .then(response=>{
                    console.log(response.data)
                    toast({
                        message:"Sign Up successful,Redirecting to login.",
                        type:"is-success",
                        pauseOnHover:true,
                        dismissible:true,
                        position:"bottom-right",
                        duration:1500
                    })
                    Navigate('/login')
                })
                .catch(error=>{
                    console.log(error)
                    toast({
                        message:"Something went wrong. Please try again",
                        type:"is-warning",
                        pauseOnHover:true,
                        dismissible:true,
                        position:"bottom-right",
                        duration:1500
                    })
                })
        }else{
            toast({
                message:"Please enter Matching passwords",
                type:"is-warning",
                pauseOnHover:true,
                dismissible:true,
                position:"bottom-right",
                duration:1500
            })
        }
    }

    function handleUsername(e){
        setUsername(e.target.value)
    }
    function handleEmail(e){
        setEmail(e.target.value)
    }
    function handleFirstName(e){
        setFirstName(e.target.value)
    }
    function handleLastname(e){
        setLastName(e.target.value)
    }
    function handlePass(e){
        setPass(e.target.value)
    }
    function handleConfPass(e){
        setConfPass(e.target.value)
    }

  return (
    <>
    <div className="columns is-multiline">
        <div className="column is-8 is-offset-2">
            <form onSubmit={(e)=>{handleSubmit(e)}} className="columns is-multiline box">
                <h2 className="column is-12 has-text-centered title">Sign Up</h2>
                <div className="column is-half field">
                    <label htmlFor="username">Username</label>
                    <div className="control">
                        <input type="text" className="input" name="username" value={username} onChange={(e)=>{handleUsername(e)}}  />
                    </div>
                </div>
                <div className="column is-half field">
                    <label htmlFor="email">Email Address</label>
                    <div className="control">
                        <input type="email" className="input" name="email" value={email} onChange={(e)=>{handleEmail(e)}} />
                    </div>
                </div>
                <div className="column is-half field">
                    <label htmlFor="first_name">First Name</label>
                    <div className="control">
                        <input type="text" className="input" name="first_name" value={first_name} onChange={(e)=>{handleFirstName(e)}} />
                    </div>
                </div>
                <div className="column is-half field">
                    <label htmlFor="last_name">Last Name</label>
                    <div className="control">
                        <input type="text" className="input" name="last_name" value={last_name} onChange={(e)=>{handleLastname(e)}} />
                    </div>
                </div>
                <div className="column is-half field">
                    <label htmlFor="password1">Password</label>
                    <div className="control">
                        <input type="password" className="input" name="password1" value={password1} onChange={(e)=>{handlePass(e)}} />
                    </div>
                </div>
                <div className="column is-half field">
                    <label htmlFor="password2">Repeat Password</label>
                    <div className="control">
                        <input type="password" className="input" name="password2" value={password2} onChange={(e)=>{handleConfPass(e)}} />
                    </div>
                </div>
                <div className="column is-12 has-text-centered">
                    <button className="button is-success" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="information">
                <p className="subtitle">Already have an account? <a href="/login">Login</a>.</p>
            </div>
        </div>
    </div>
    </>
  )
}


export default SignUp