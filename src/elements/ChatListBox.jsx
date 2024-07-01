import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Input } from 'react-chat-elements'
import { MessageBox } from "react-chat-elements";


ChatListBox.propTypes = {
    dialog_id: PropTypes.number.isRequired
};

function ChatListBox({ dialog_id }) {

    const uId = localStorage.getItem('uId')
    const inputRef = useRef(null);

    const [chatList, setChatList] = useState([{
        position: "right",
        type: "text",
        title: "Помощник",
        text: "Напиши первое сообщение",
    }])

    const [message_text, setMessage_text] = useState('')





    const messageBox = chatList.map(message => {
        return (
            <MessageBox
                position={message.user_id == uId ? 'right' : 'left'}
                title={`${message.first_name} ${message.last_name ? message.last_name : ''}`}
                type='text'
                text={message.message_text}
                date={message.created_at ? new Date(message.created_at) : new Date()}
                replyButton={true}
                key={message.message_id}>
            </MessageBox>
        )
    });

    const addMess = () => {
        axios.post(
            'http://localhost:3000/api/addMess', {
            dialog_id, user_id: uId, message_text
        }
        ).then(
            (resp) => {
                console.log(resp)
                // inputRef.current.clear();
                inputRef.current.value = ''

            }
        )
    }

    const chatListApi = (dialog_id) => {
        axios.post('http://localhost:3000/api/chatList', {
            dialog_id
        })
            .then(
                (resp) => {
                    console.log(resp.data);
                    setChatList(resp.data)
                }
            )
    }


    useEffect(
        () => {
            chatListApi(dialog_id)
        }, [dialog_id]
    )

    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
            <div style={{ overflow: 'auto', height: "100%" }}>
                {messageBox}
            </div>
            <Input
                placeholder="Type here..."
                multiline={true}
                rightButtons={<button onClick={addMess}>setd</button>}
                onChange={(val) => setMessage_text(val.target.value)}
                referance={inputRef}
            // Функция для очистки
            />

        </div>
    );
}

export default ChatListBox;