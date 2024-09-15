import { useState, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom"
import axios from "axios";

let tempReadId ;
let tempPage;

export default function BookDetails({bookDetails=[]}) {
    const navigate = useNavigate()
    const [myBookmarks, setMyBookmarks] = useState([])
    const [allBookmarks, setAllBookmarks] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);
    const userId = localStorage.getItem('userId');

    let tempPage =1;
    let tempReadId = 0;
//     Navigates to ReadBook component with the ID of the book the user chose to read //////
    function handleReadBook(id){
        userBookmarks.forEach(element => {
            if(element.book == id){
                tempReadId = element.id
                tempPage = element.page
            }
        });
        navigate(`/book/${id}`, {
            state:{
              page: tempPage,
              readId: tempReadId,
              book: id
            }
           })
    }
//     Navigates to AudioBook component with the ID of the book the user chose to lesten to //////
    function handleAudioBook(id, cover) {
      navigate(`/audiobook/${id}`,{
        state:{
          cover: cover
        }}
      )
    }
//   Fetches the bookmarks from the Django backend to check if this user is reading a book and the page he is on ///////    
    useEffect(()=> {
        async function fetchBookmarks(){
            try{
              const response = await axios.get('https://fantasiaapi.onrender.com/bookmarks/');
              const bookmarks = response.data;
                setAllBookmarks(bookmarks);   
// Check bookmarks for this userId ///////////////////////////////////////////////
                const filteredBookmarks = bookmarks.filter(bookmark => bookmark.userId == userId);
               setUserBookmarks(filteredBookmarks);
            } catch(error){
              console.error('Error fetching the books:', error);
            }
          }
          fetchBookmarks();
        
    },[])

    return(
        <>
        {!bookDetails && <p>Loading...</p> }
        {bookDetails &&    
        <ul className='list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {bookDetails.map((bookDetail) => (
            <li key={bookDetail.id} className='p-4'>
    
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">                 
                    <img src={bookDetail.cover} alt={bookDetail.title} className='w-full h-auto hover:shadow-2xl' onClick={()=> handleReadBook(bookDetail.id)}/>
                        <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{bookDetail.title}</div>
                        <p className="text-gray-700 text-base">
                        {bookDetail.description}
                        </p>
                        <button onClick={()=> handleReadBook(bookDetail.id)}>Read</button>
                        <button onClick={()=> handleAudioBook(bookDetail.id, bookDetail.cover)}>Audio</button>
                    </div>
                    </div>

            </li>
    ))}
  </ul>}
        </>
    )
}
