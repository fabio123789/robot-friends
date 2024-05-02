import React from "react";

const Scroll = ({children}) => {
    return <div style={{overflow: 'scroll', height: '100vh', width: '100%', borderTop: '5px solid black'}}>
    {children}
    </div> 
}

export default Scroll