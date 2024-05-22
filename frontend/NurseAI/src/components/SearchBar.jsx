import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import "../LineBreak.css";

const SearchBar = ({ onSuggest, onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSuggest = useCallback(debounce((searchValue) => {
        onSuggest(searchValue);
    }, 300), [onSuggest]);

    const handleInput = (event) => {
        const value = event.target.value;
        setInputValue(value);
        debouncedSuggest(value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            debouncedSuggest.cancel();
            onSearch(inputValue);
        }
    };

    const handleSearchClick = () => {
        debouncedSuggest.cancel();
        onSearch(inputValue);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search diagnoses..."
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                className="border p-1 rounded input-placeholder"
            />
            <button onClick={handleSearchClick} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
