
import Login, { Password, Submit, Username } from '@react-login-page/page1';
import axios from 'axios';
import { useState } from 'react';
import PopSelectCompany from './PopSelectCompany';
import React from 'react';



function Log() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [conpanyList, setCompanyList] = React.useState([]);

    // Функция для отправки запроса на сервер
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Список компаний для пользователя:', response.data);
                setCompanyList(response.data)
                setModalIsOpen(true)
            } else {
                console.error('Ошибка:', response.statusText);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error.message);
        }
    };



    return (
        <>
            <Login style={{ width: "100vw", height: "100vh" }}>

                <Username value={username} onChange={(value) => setUsername(value.target.value)}></Username>
                <Password value={password} onChange={(value) => setPassword(value.target.value)}></Password>
                <Submit visible={username && password ? true : false} onClick={() => loginUser(username, password)}>Submit </Submit>
            </Login>
            <PopSelectCompany modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} conpanyList={conpanyList} />
        </>


    );
}

export default Log;