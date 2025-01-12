import { useState } from 'react';
import PropTypes from 'prop-types';
import $api from '../http';
import PopAddNewItem from './PopAddNewItem';
import { companyStore, localStorageStore } from '../mobx/store';
import { useNavigate } from 'react-router-dom';
import { EmotionCalc, EmotionSearchContainer, EmotionTabsContainer, EmotionThSticky, EmotionThStyles, tdStyles } from '../styles.jsx';
import { MDBIcon } from 'mdb-react-ui-kit';
import { goToChat } from './functions.jsx';





const Serch = ({ setFillActive }) => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const sort = (name) => {
        const newArr = [...searchResults]; // Создаем копию массива searchResults
        newArr.sort((a, b) => (a[name] > b[name]) ? 1 : -1);
        setSearchResults(newArr);
    }



    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTerm2Change = (event) => {
        setSearchTerm2(event.target.value);
    };

    const exit = () => {

        $api.get('/api/exit')
            .then(
                navigate('/'))
    }

    const fetchData = async (name1, name2) => {
        const company_id = companyStore.activeCompanyId

        try {
            const response = await $api.post('/api/serch', {
                factory_name: name1,
                item_name: name2,
                company_id

            });

            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = () => {
        fetchData(searchTerm, searchTerm2);
    };

    return (
        <div className={EmotionSearchContainer}  >
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
                <button style={{ borderRadius: "1rem" }} onClick={handleSearch}>
                    <MDBIcon fas icon="search" />
                </button>
            </div>

            <div className={EmotionCalc} >
                <div className={EmotionTabsContainer}>
                    <table>
                        <thead className={EmotionThSticky} >
                            <tr>
                                <th className={EmotionThStyles} onClick={() => sort('factory_name')} >Factory Name</th>
                                <th className={EmotionThStyles} onClick={() => sort('item_name')} >Item Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map(item => (
                                <tr key={item.dialog_id} onClick={() => goToChat(item.dialog_id, item.factory_name, item.item_name, setFillActive)}>
                                    <td className={tdStyles} >{item.factory_name}</td>
                                    <td className={tdStyles}>{item.item_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

                <PopAddNewItem setFillActive={setFillActive} ></PopAddNewItem>
            </div>


        </div>
    );
};
Serch.propTypes = {
    setFillActive: PropTypes.func.isRequired,
};

export default Serch;

