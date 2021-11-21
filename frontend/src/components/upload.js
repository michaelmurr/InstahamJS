import React from "react";

function Upload(){
    return(
        <div>
            <h1>Upload an image!</h1>
            <form action="/upload" method="post" >
            
                <input type="file"/>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Upload;