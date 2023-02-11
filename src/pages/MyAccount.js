import axiosInstance from "../axios"
import { useEffect, useState } from "react"
import AccountInfo from "../components/AccountInfo"
const MyAccount = () => {
    const [user,setUser] = useState({})
    const [page,setPage] = useState(1)

    useEffect(()=>{
        axiosInstance.get('/user/')
            .then(response=>setUser(response.data))
            .catch(error=>console.log(error))
    },[])

    const pages = (<AccountInfo user={user} />)
  return (
    <>
        <div className="column is-12 columns is-multiline mt-6">
            <div className="column is-8 is-offset-2 columns">
                <div className="column is-4" style={{borderRight:"1px solid grey"}}>
                    <ul>
                        <li><a className="has-text-dark" onClick={()=>{setPage(1)}}>Account Information</a></li>
                        <li><a className="has-text-dark" onClick={()=>{setPage(2)}}>Change Password</a></li>
                    </ul>
                </div>
                {pages}
            </div>
        </div>
    </>
  )
}


export default MyAccount