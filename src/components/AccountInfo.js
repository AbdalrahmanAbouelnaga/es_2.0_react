import { toast } from "bulma-toast"
import { useState } from "react"
import axiosInstance from "../axios"
import { useEffect } from "react"
const AccountInfo = ({user}) => {
    const [change,setChange] = useState(false)
    const [username,setUsername] = useState(user.username)
    const [first_name,setFirstName] = useState(user.first_name)
    const [last_name,setLastName] = useState(user.last_name)
    const [email,setEmail] = useState(user.email)

    useEffect(()=>{
        setUsername(user.username)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
    },[user])
    function submitChange(e){
        e.preventDefault()
        const form_data = new FormData(e.target)
        axiosInstance.put('/user/',form_data)
            .then(response=>{
                setChange(false)
                toast({
                    message:"Account Info Updated",
                    position:'bottom-right',
                    duration:1500,
                    pauseOnHover:true,
                    dismissible:true,
                    type:'is-success'
                })
            }).catch(error=>{
                console.log(error)
                toast({
                    message:JSON.stringify(error.response.data),
                    position:'bottom-right',
                    duration:1500,
                    pauseOnHover:true,
                    dismissible:true,
                    type:'is-danger'
                })
            })
    }

    const page = !change?(
    <div className="column is-8">
        <h2 className="title">Account Information</h2>
        <hr />
        <h2><span className="subtitle">Username</span>:{username}</h2>
        <h2><span className="subtitle">First Name</span>:{first_name}</h2>
        <h2><span className="subtitle">Last Name</span>:{last_name}</h2>
        <h2><span className="subtitle">Email Address</span>:{email}</h2>
        <hr />
        <button className="button is-info" onClick={()=>{setChange(true)}}>Change Account Information</button>
    </div>):(<form className="column is-8" onSubmit={(e)=>submitChange(e)}>
        <h2 className="title">Change Account Information</h2>
        <hr />
        <div className="field">
            <label htmlFor="username">Username</label>
            <div className="control">
                <input required type="text" className="input" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            </div>
        </div>
        <div className="field">
            <label htmlFor="first_name">First Name</label>
            <div className="control">
                <input required type="text" className="input" name="first_name" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} />
            </div>
        </div>
        <div className="field">
            <label htmlFor="last_name">Last Name</label>
            <div className="control">
                <input required type="text" className="input" name="lasst_name" value={last_name} onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
        </div>
        <div className="field">
            <label htmlFor="email">Email</label>
            <div className="control">
                <input required type="text" className="input" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
        </div>
        <button className="is-success button">Submit Change</button>
    </form>)
  return (
    <>
    {page}
    </>
  )
}


export default AccountInfo