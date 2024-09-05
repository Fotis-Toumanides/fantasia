import { useEffect, useState } from "react";
import axios from "axios";
import BookDetails from "./BookDetails";
import { useNavigate, redirect } from "react-router-dom";


export default function Profile({bookDetails}) {

    const [allBookmarks, setAllBookmarks] = useState([])
    const navigate = useNavigate()
    const [userBookmarks, setuserBookmarks] = useState([
        {
            book:1,
            page:1,
        }
    ])

    // Fetch and set userId from localStorage 
      const userId = localStorage.getItem('userId');

    // Fetch all bookmarks from backend  ////////////////////////////////////////////
    //            https://fantasiaapi.onrender.com/                      ////////////
    useEffect(()=> {
        async function getAllBookmarks(){
            try{
              const response = await axios.get('https://fotistouman.pythonanywhere.com/bookmarks/')
                setAllBookmarks(response.data)          
            } catch(error){
              console.error('Error fetching the books:', error);
            }
          }
          getAllBookmarks()
    },[])

// Check bookmarks for this userId ///////////////////////////////////////////////
    useEffect(() => {
      const filteredBookmarks = allBookmarks
      .filter(bookmark => bookmark.userId == userId)
     setuserBookmarks(filteredBookmarks)
    },[allBookmarks, userId])

    
console.log(userBookmarks)

// Got to bookRead component with the page number //////////////////
    function handleContinueRead(userRead){
       navigate(`/book/${userRead.book}`, {
        state:{
          page: userRead.page,
          readId: userRead.id,
        }
       })
    }
//////////////////////////////////////////////////////////////
   
    return(
        <div>
        <p>User: {userId}</p>
        {userBookmarks && 
          <ul className='list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {userBookmarks.map((userRead) => {
            return (<li key={userRead.id} className='p-4'>
           
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={bookDetails[userRead.book - 1].cover} onClick={() => handleContinueRead(userRead)}/>
            
          </div>  
            </li>)
          })}
            </ul>}
           
        </div>
    )
}
