import React from 'react';
import './searchbox.css'

const SearchBox =(props) =>{
    return(
        <input type = 'search'
        className='search'
        placeholder={props.placeholder}
        onKeyPress={props.handleChange}
        />
    )
}
export default SearchBox;


/**
 * 
 * function Search ({ handleInput, search }) {
	return (
		<section className="searchbox-wrap">
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="searchbox" 
				onChange={handleInput}
				onKeyPress={search}
			/>
		</section>
	)
}

export default Search
 */