import React from 'react';
import ReactDOM from 'react-dom';
import './Video.css'
const Video = ({url}) => {
    const handleMuting = (e) => {
        // e.preventDefault();
        e.preventDefault();
                e.target.muted = !e.target.muted;
    }
    const handleScroll = (e) => {
        // console.log(e);
        let nextVid = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(nextVid){
            nextVid.scrollIntoView();
            e.target.muted = true;
        }
        // console.log(nextVid);
        
    }
    return (
        
            <video src={url} onEnded={handleScroll} className='video-styling' muted="muted" onClick={(e) => {handleMuting(e)}}>
                {/* <source type="video/mp4"/> */}
            </video>
        
    )
}

export default Video