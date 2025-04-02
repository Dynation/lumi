import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchButton: React.FC = () => {
    return (
        <button title="Search" className="absolute top-4 left-4 p-2  transition">
            <FaSearch size={24} />
        </button>
    );
};

export default SearchButton;
