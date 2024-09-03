import { useEffect, useState } from "react";
import { useParams, useLocation, useBeforeUnload } from "react-router-dom";
import Container from '@mui/material/Container';
import axios from "axios";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';


export default function AudioBook(){
    const params = useParams();
    const [bookContent, setBookContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bookCover, setBookCover] = useState('./assets/');
  
    const location = useLocation(); 
    let currentCharacter;
    let prevCharacter;
    // Fetching the book from the backend ///////////////////////////////
    useEffect(() => {
        async function fetchBook(){
            setIsLoading(true);
            try{
                const response = await axios.get(`https://fotistouman.pythonanywhere.com/book/${params.id}`);
                setBookContent(response.data.content);
                setBookCover(location.state.cover);
            } catch(error) {
                console.error('Error fetching the book you asked:', error);
            }
            setIsLoading(false);
        }
        fetchBook();
    },[params.id])

    ///// Text to speech code ///////////////////////////////////////////////////
    let speech = new SpeechSynthesisUtterance;
    function textToSpeech(){
        if(speechSynthesis.paused && speechSynthesis.speaking){
            return speechSynthesis.resume()
        } 
        speech.text = bookContent;
        window.speechSynthesis.speak(speech);
        
    }
    function pauseText(){
        if(speechSynthesis.speaking) speechSynthesis.pause();
    }
function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}

speech.addEventListener('boundary', e => {
    currentCharacter = e.charIndex;
    if(currentCharacter === prevCharacter) {
        setSavePhrase(currentCharacter);
    }
    prevCharacter = currentCharacter;
})

/// User Leaving Page  ////////////////////////////////////////////

useEffect(() => {
    const handleUnload = (event) => {
        stopText();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
        window.removeEventListener('beforeunload', handleUnload);
        stopText(); // Stop the speech when component unmounts
    };
}, []);

useBeforeUnload((event) => {
    stopText();
});

    return(
        <>
        {isLoading ? <div className="items-center">Loading page...</div> : 
            <Container component="main" maxWidth="xs" className='flex flex-col justify-center items-center'>
                <div style={{width:466}} className="shadow-md rounded-md p-4 m-2 bg-[url('./assets/paper-sm.jpg')] text-left">
                <img src={bookCover} />
                    <div className="flex justify-between pt-2">
                        <PlayCircleIcon fontSize="large" className='hover: cursor-pointer' onClick={textToSpeech}/> 
                        <PauseCircleIcon fontSize="large" className='hover: cursor-pointer' onClick={pauseText}/>
                        <StopCircleIcon fontSize="large" className='hover: cursor-pointer' onClick={stopText}/>
                    </div>
                </div>
            </Container>}
        </>
    )
}
