import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [factory, setFactory] = useState('');
    const [product, setProduct] = useState('');
    const [note, setNote] = useState('');
    const [suggestions, setSuggestions] = useState(['писька', 'пиписька', 'ПИсюлька', 'ПисюНЬчик']);
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

        const filtered = factories.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredFactories(filtered);
    };
    const handleButtonClick = (name) => {
        setFactory(name);
        const filtered = factories.filter(f => f.name.toLowerCase().includes(name.toLowerCase()));
        setFilteredFactories(filtered);
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
                    <input
                        type="text"
                        placeholder="Фабрика"
                        value={factory}
                        onChange={handleFactoryChange}
                    />
                    <div>
                        {filteredFactories.map(f => (
                            <button key={f.id} onClick={() => handleButtonClick(f.name)}>
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>);
};

export default App;
