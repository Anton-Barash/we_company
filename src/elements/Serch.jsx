import React, { useState } from 'react';
import axios from 'axios';

const Serch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');

    const a = [
        {
            "dialog_id": 0,
            "dialog_name": "фабрика",
            "dialog_name_2": "изделие"
        }
    ]

    const [searchResults, setSearchResults] = useState([a]);



    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTerm2Change = (event) => {
        setSearchTerm2(event.target.value);
    };

    const fetchData = async (name1, name2) => {
        try {
            const response = await axios.post('http://localhost:3000/api/serch', {
                name_1: name1,
                name_2: name2,
                user_id: 2,
                company_id: 1

            });

            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = () => {
        fetchData(searchTerm, searchTerm2);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <input
                type="text"
                placeholder="Поиск2..."
                value={searchTerm2}
                onChange={handleSearchTerm2Change}
            />
            <button onClick={handleSearch}>Искать</button>
            <div>
                {searchResults.map(result => (
                    <div key={result.dialog_id}>
                        <div>
                            {result.dialog_name}
                        </div>

                        <div>
                            {result.dialog_name_2}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Serch;
