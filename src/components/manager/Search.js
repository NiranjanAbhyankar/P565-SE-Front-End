import React from 'react'
import "./search.css"

function Search({handleInput, search}) {
    return (
        <section className = "searchbox-wrap">
            <input 
            type = "text" 
            placeholder="Search for a movie..." 
            className = "searchbox" 
            onChange = {handleInput} 
            onKeyPress = {search}/>
        </section>
    )
}

export default Search
