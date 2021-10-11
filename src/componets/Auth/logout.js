import React from 'react'


const logout = (props) => {
    localStorage.clear();
    props.auth(true)
    return (
        <div>
            
        </div>
    )
}

export default logout
