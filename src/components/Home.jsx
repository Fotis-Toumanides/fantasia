import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    const token = localStorage.getItem('token')
    let routerPath = '/'
    if(token){
        routerPath = '/books'
    } else {
        routerPath = '/login'
    }
    return (
      
        <div className='bg flex items-center justify-center'>
            <div className=' text-white font-serif text-center font-bold'>
            <h2 >Welcome to the world of Fantasia</h2>
            <Link className=' text-white' 
            to={routerPath}
            >
            <p> Speak friend and enter</p></Link>
          </div>
        </div>
     
    )
}