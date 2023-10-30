import './searchBar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ type, placeholder, value, onChange }) => {

    return (
        <div className='searchbar-container'>
            <input className='search-input'
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
            <FontAwesomeIcon icon={faSearch} />
        </div>
    )
}

export default SearchBar