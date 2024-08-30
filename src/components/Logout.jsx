import axiosInstance from '../../axios'
import { useNavigate } from 'react-router-dom'


const LogoutUser = () => {
    const navigate = useNavigate()
    axiosInstance.post(`logout/`,{

    })
    .then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userBookmarks')
      navigate(`/`)
    })
  }
 
export default LogoutUser