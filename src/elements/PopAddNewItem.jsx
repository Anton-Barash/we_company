import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [factory, setFactory] = useState('');
    const [product, setProduct] = useState('');
    const [note, setNote] = useState('');
    const [suggestions, setSuggestions] = useState(['писька', 'пиписька', 'ПИсюлька', 'ПисюНЬчик']);

    // useEffect(() => {
    //     // Функция для загрузки подсказок из базы данных при монтировании компонента
    //     const fetchSuggestions = async () => {
    //         try {
    //             const response = await axios.get('YOUR_API_ENDPOINT_HERE');
    //             setSuggestions(response.data);
    //         } catch (error) {
    //             console.error('Ошибка при загрузке подсказок:', error);
    //         }
    //     };

    //     fetchSuggestions();
    // }, []);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleFactoryChange = (e) => {
        setFactory(e.target.value);
    };

    const handleProductChange = (e) => {
        setProduct(e.target.value);
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    return (
        <div>
            <button onClick={openModal}>Открыть модальное окно</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Пример модального окна"
            >
                <h2>Модальное окно</h2>
                <input
                    type="text"
                    placeholder="Фабрика"
                    value={factory}
                    onChange={handleFactoryChange}
                    list='factory-suggestions'
                />

                <datalist id="factory-suggestions">
                    {suggestions.map((item) => (
                        <option value={item} key={item} />
                    ))}
                </datalist>
                <input
                    type="text"
                    placeholder="Изделие"
                    value={product}
                    onChange={handleProductChange}
                />
                <input
                    type="text"
                    placeholder="Примечание"
                    value={note}
                    onChange={handleNoteChange}
                />
                <button onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default App;
