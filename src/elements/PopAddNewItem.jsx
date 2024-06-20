import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [factory, setFactory] = useState('');
    const [selectedFactory, setSelectFactory] = useState('')
    const [item, setItem] = useState('')
    const [factories, setFactories] = useState([]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const handleFactoryChange = (event) => {
        console.log(factory);
        const value = event.target.value;
        setFactory(value);
        setSelectFactory('')
        const filtered = factories.filter(f => f.factory_name.toLowerCase().includes(value.toLowerCase()));
        setFilteredFactories(filtered);
    };

    const handleItemChange = (event) => {
        const value = event.target.value;
        setItem(value);



    };

    const selectFactoryButtonClick = (factory_name, factory_id) => {
        setFactory(factory_name);
        const filtered = factories.filter(f => f.factory_name.toLowerCase().includes(factory_name.toLowerCase()));
        setFilteredFactories(filtered);
        setSelectFactory({ factory_id, factory_name })
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const factoryList = () => {
        const company_id = localStorage.getItem('cId')
        axios.post('http://localhost:3000/api/factoryList', { company_id })
            .then(
                (resp) => {
                    setFactories(resp.data)
                    const filtered = resp.data.filter(f => f.factory_name.toLowerCase().includes(factory.toLowerCase()));
                    setFilteredFactories(filtered);

                })

    }

    useEffect(
        () => {
            if (isOpen) {
                factoryList()
            }
        }, [isOpen]
    )

    const addNewFactory = () => {
        const company_id = localStorage.getItem('cId')
        axios.post('http://localhost:3000/api/addNewFactory', { factory_name: factory, company_id })
            .then(
                (resp) => {
                    console.log(resp.data[0]);
                    alert("фабрика добавлена")
                    setFilteredFactories(resp.data[0]);
                    setSelectFactory(resp.data[0])
                })
    }


    const addNewItem = () => {
        const company_id = localStorage.getItem('cId')
        axios.post('http://localhost:3000/api/addNewItem', { ...selectedFactory, item, company_id })
            .then(
                (resp) => {
                    console.log(resp.data);
                    setSelectFactory('')
                    setFactory('')
                    setItem('')
                    setIsOpen(false)
                })
    }

    return (
        <div>
            <button onClick={openModal}>Создать новую пару</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Пример модального окна">
                <h2>Модальное окно</h2>
                <div>
                    <p>Фабрика</p>
                    <input
                        type="text"
                        placeholder="Фабрика"
                        value={factory}
                        onChange={handleFactoryChange}
                    />
                    {filteredFactories.length > 0 && !(filteredFactories[0].factory_name == factory) && (

                        <div>
                            <p>Выбрать из списка:</p>
                            {filteredFactories.map(f => (
                                <button key={f.factory_id} onClick={() => selectFactoryButtonClick(f.factory_name, f.factory_id)}>
                                    {f.factory_name}
                                </button>
                            ))}
                        </div>
                    )}
                    {factory && !(filteredFactories.length == 1 && (filteredFactories[0].factory_name == factory)) && (
                        <div>
                            <p>Или добавить новую фабрику:</p>
                            <button onClick={addNewFactory}>{factory}</button>
                        </div>
                    )}

                    {selectedFactory && <div>
                        <p>изделие</p>
                        <input
                            type="text"
                            placeholder="Изделиe"
                            value={item}
                            onChange={handleItemChange}
                        />
                        <p>
                            добавить новую пару Фабрика: Изделие
                        </p>
                        <button onClick={addNewItem} > добавить </button>
                    </div>}

                </div>

                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>);
};

export default App;
