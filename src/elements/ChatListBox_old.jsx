import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import $api from '../http';
import { Input } from 'react-chat-elements'
import { MessageBox } from "react-chat-elements";
import { myStore } from '../mobx/store';


// тут переписка и инпут для отправки сообщений

ChatListBox.propTypes = {
    dialog_id: PropTypes.string.isRequired
};

function ChatListBox({ dialog_id, show }) {

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
        $api.post(
            '/api/addMess', {
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
        $api.post('/api/chatList', {
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
            console.log(show);
            if (show) {
                console.log('chatListApi');
                chatListApi(dialog_id)
            }
        }, []
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


