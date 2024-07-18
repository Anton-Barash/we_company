import React, { useState } from 'react';
import { EmotionLoginPage, EmotionLoginPageInput, EmotionLoginPageWrapper } from '../styles';
import $api from '../http';
import { useNavigate } from 'react-router-dom';
import PopRegister from './PopRegister';




const Signup = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user: '',
        mail: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [allFieldsFilled, setAllFieldsFilled] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const sendMail = () => {
        $api.post('/register', {
            ...formData
        })
            .then((res) => {
                console.log(res.data); // Вывод результата запроса
            })
            .catch((error) => {
                console.error(error); // Обработка ошибок, если запрос неудачен
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.user === '' || formData.mail === '' || formData.password === '' || formData.confirmPassword === '') {
            setAllFieldsFilled(false);
            return;
        }
        setAllFieldsFilled(true);
        if (formData.password === formData.confirmPassword) {
            sendMail()
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <div className={EmotionLoginPage}>
            <form className={EmotionLoginPageWrapper} onSubmit={handleSubmit}>
                <input className={EmotionLoginPageInput} type="text" name="user" value={formData.user} onChange={handleChange} placeholder="Имя" />
                <input className={EmotionLoginPageInput} type="mail" name="mail" value={formData.mail} onChange={handleChange} placeholder="Электронная почта" />
                <input className={EmotionLoginPageInput} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
                <input className={EmotionLoginPageInput} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Повторите пароль" />

                {!allFieldsFilled && <p style={{ color: 'red' }}>Пожалуйста, заполните все поля</p>}
                {!passwordsMatch && <p style={{ color: 'red' }}>Пароли не совпадают</p>}


                <button className={EmotionLoginPageInput} type="submit">Зарегистрироваться</button>
                <p style={{ cursor: 'pointer', margin: 'auto' }} onClick={() => setModalIsOpen(true)}>У меня есть код</p>
            </form>
            <p style={{ cursor: 'pointer' }} onClick={() => navigate('/Login')}>or login</p>

            <PopRegister modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} ></PopRegister>
        </div>

    );
};

export default Signup;
