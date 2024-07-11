
import Login, { Password, Submit, Username } from '@react-login-page/page1';
import { useEffect, useState } from 'react';
import PopSelectCompany from './PopSelectCompany';
import React from 'react';
import $api from '../http';
import socket from '../http/socet';

$api.defaults.withCredentials = true;

function Log() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [conpanyList, setCompanyList] = React.useState([]);


    useEffect(
        () => {
            socket.on('hello', (res) => {
                console.log('Получено сообщение ', res, ' от сервера');
            });

            return () => {
                socket.off('hello')
            };
        }, []
    )

    // Функция для отправки запроса на сервер
    const loginUser = async (username, password) => {
        try {
            const response = await $api.post('/login', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Список компаний для пользователя:', response.data);
                setCompanyList(response.data)
                setModalIsOpen(true)
            }


            else {
                console.error('Ошибка:', response.statusText);
            }
        } catch (error) {
            if (error.response.status === 401) {
                console.log('нет юзера');
            }
            console.error('Произошла ошибка:', error.message);
        }
    };


    const a = () => {

        $api.post('/api/sendMail', {

        }).then(
            (res) => { console.log(res); }
        )

    }

    return (
        <>
            <Login style={{ width: "100vw", height: "100vh" }}>

                <Username value={username} onChange={(value) => setUsername(value.target.value)}></Username>
                <Password value={password} onChange={(value) => setPassword(value.target.value)}></Password>
                <Submit visible={username && password ? true : false} onClick={() => loginUser(username, password)}>Submit </Submit>
                <button onClick={a}> mail</button>
            </Login>
            <PopSelectCompany modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} conpanyList={conpanyList} />
        </>


    );
}

export default Log;