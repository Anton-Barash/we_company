import React, { useState } from 'react';
import axios from 'axios';
import PopAddNewItem from './PopAddNewItem';
import { myStore } from '../mobx/store';
import { action } from "mobx";

const goToChat = (dialogId, factoryName, itemName, setFillActive) => {
    const idFacNam = localStorage.getItem("idFacNam");
    if (idFacNam) {
        const arr = JSON.parse(idFacNam)
        const existingIndex = arr.findIndex(item => Object.keys(item)[0] === dialogId.toString());
        if (existingIndex !== -1) {
            arr.splice(existingIndex, 1);
        }
        arr.unshift({ [dialogId]: { name: itemName, factory: factoryName } });
        if (arr.length > 20) {
            arr.splice(20) // Оставляет только первые 20 объектов в массиве
        }
        localStorage.setItem('idFacNam', JSON.stringify(arr));

        action(() => {
            myStore.setIdFacNam(arr)
        })();

    }

    else {
        const newArr = [{ [dialogId]: { name: itemName, factory: factoryName } }]
        localStorage.setItem('idFacNam', JSON.stringify(newArr));
        action(() => {
            myStore.setIdFacNam(newArr)
        })();
    }
    setFillActive('tab2')
};


const Serch = ({ setFillActive }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');


    const [searchResults, setSearchResults] = useState([]);



    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTerm2Change = (event) => {
        setSearchTerm2(event.target.value);
    };

    const fetchData = async (name1, name2) => {
        const company_id = localStorage.getItem('cId')
        const user_id = localStorage.getItem('uId')
        try {
            const response = await axios.post('http://localhost:3000/api/serch', {
                factory_name: name1,
                item_name: name2,
                user_id,
                company_id

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
                {searchResults.map(item => (
                    <div key={item.dialog_id} onClick={() => goToChat(item.dialog_id, item.factory_name, item.item_name, setFillActive)}>
                        {`${item.factory_name} ${item.item_name}`}
                    </div>
                ))}
            </div>
            <PopAddNewItem></PopAddNewItem>
        </div>
    );
};

export default Serch;
