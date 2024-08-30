import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Container from '@mui/material/Container';
import axios from "axios";
import { Switch } from "@mui/material";

let readId;
let readingBook;
let pageLoaded;

export default function ReadBook() {
    const params = useParams();
    const [bookContent, setBookContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState();

    const [redItId, setReaItdId] = useState();
    const [allBookmarks, setAllBookmarks] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);
    /* const [saveBookmark, setSaveBookmark] = useState(false); */
    
    const userId = localStorage.getItem('userId');
    const location = useLocation();  // This takes data when ReadBook.jsx open from Profile.jsx
    

///// Reading and spliting the book's content //////////////////////////////
    let wordsArray;
    let p=0;
    let bookPage =[];
    let btnPrevClasses = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded-l";
    let btnNextClasses = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded-r";

    wordsArray = bookContent.split(' ');
    
    for (let i=0; i<= wordsArray.length; i+=226){
        p++
        bookPage[p]='';
        for(let j = i; j <= i + 225; j++) {
            bookPage[p] = bookPage[p] + wordsArray[j] + ' ';
        }
    }
//////////////////////////////////////////////////////////////////////

// Page handling ////////////////////////////////////////////////////
    function prevPageHandler(){
        if(pageNumber > 1){
        setPageNumber((prevPage) => prevPage -=1);
        } 
    }
    function nextPageHandler(){
        if(pageNumber < bookPage.length)
        setPageNumber((prevPage) => prevPage +=1);
    }
///////////////////////////////////////////////////////////////////

// Fetch all bookmarks from backend //////////////////////////////
    useEffect(()=> {
        readId = location.state.readId;
        readingBook = location.state.book;
        pageLoaded = location.state.page;
        setPageNumber(pageLoaded)
    },[])

   
// Fetching the book from the backend ///////////////////////////////
//            https://fantasiaapi.onrender.com/                 ////
    useEffect(() => {
        setPageNumber(pageLoaded)
        async function fetchBook(){
            setIsLoading(true);
            try{
                const response = await axios.get(`https://fantasiaapi.onrender.com/book/${params.id}`);
                setBookContent(response.data.content);
            } catch(error) {
                console.error('Error fetching the book you asked:', error);
            }
            setIsLoading(false);
        }
        fetchBook();
    },[params.id])



// Create or Update user's bookmark ///////////////////////////////////
useEffect(() => {
    const bookmarkData = {
        book: params.id,
        page: pageNumber,
        userId: userId,
    };

    async function saveBookPage() {
        try {
            const res = await axios.put(`http://localhost:8000/bookmark/${readId}/`, bookmarkData);
 
        } catch (error) {
            console.error('Error saving the book page you read:', error);
        }
    }

    async function createNewBookmark() {  
        try {
            const res = await axios.post(`http://localhost:8000/bookmarks/`, bookmarkData);
            readId = res.data.id;
        } catch (error) {
            console.error('Error saving the book you read:', error);
        }
    }
    if(userId){
        if (readId ) {  
                saveBookPage();
            } else  {
                createNewBookmark();
        }
    }
 
}, [pageNumber]);


////////////////////////////////////////////////////////////////////////////////

    return(
        <>
        {isLoading ? <div className="items-center">Loading page...</div> : 
            <Container component="main" maxWidth="xs" className='flex flex-col justify-center items-center h-screen'>
            
                <div style={{width:466}} className="shadow-md rounded-md p-4 m-2 bg-[url('./assets/paper-sm.jpg')] text-left">{bookPage[pageNumber]}
                    <div className="flex justify-between">
                        <button className={btnPrevClasses} onClick={prevPageHandler}>
                            Prev
                        </button>
                        <p className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded">{pageNumber}</p>
                        <button className={btnNextClasses} onClick={nextPageHandler}>
                            Next
                        </button>
                    </div>                   
                </div>
            </Container>}
        </>
    )
}
