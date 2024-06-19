import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [factory, setFactory] = useState('');
    const [product, setProduct] = useState('');
    const [note, setNote] = useState('');
    const [suggestions, setSuggestions] = useState(['писька', 'пиписька', 'ПИсюлька', 'ПисюНЬчик']);
    const [selectedFactory, setSelectFactory] = useState('')
    const [item, setItem] = useState('')
    const [factories, setFactories] = useState([
        { id: 'factory_id_1', name: 'Фабрика 1' },
        { id: 'factory_id_2', name: 'Фабрика 2' },
        { id: 'factory_id_3', name: 'Фабрика 3' },
        // Добавьте другие фабрики по аналогии
    ]);
    const [filteredFactories, setFilteredFactories] = useState([]);
    const handleFactoryChange = (event) => {
        const value = event.target.value;
        setFactory(value);
        setSelectFactory('')
        const filtered = factories.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredFactories(filtered);
    };

    const handleItemChange = (event) => {
        const value = event.target.value;
        setItem(value);


    };

    const handleButtonClick = (name, id) => {
        setFactory(name);
        const filtered = factories.filter(f => f.name.toLowerCase().includes(name.toLowerCase()));
        setFilteredFactories(filtered);
        setSelectFactory({ id, name })
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <button onClick={openModal}>Открыть модальное окно</button>
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
                    {filteredFactories.length > 0 && !(filteredFactories.length === 1 && filteredFactories[0].id != factory) && <p>Выбрать из списка</p>}
                    {filteredFactories.length > 0 && !(filteredFactories.length === 1 && filteredFactories[0].id != factory) && (
                        <div>
                            {filteredFactories.map(f => (
                                <button key={f.id} onClick={() => handleButtonClick(f.name, f.id)}>
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    )}
                    {factory && !(filteredFactories.length === 1 && filteredFactories[0].id != factory) && (
                        <div>
                            <p>Или добавить новую фабрику</p>
                            <button onClick={() => handleButtonClick(factory)}>{factory}</button>
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
                        <button> добавить </button>
                    </div>}

                </div>

                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>);
};

export default App;
