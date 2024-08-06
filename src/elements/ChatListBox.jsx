import { useEffect, useState, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import $api from '../http';

import socket from '../http/socet';
import { EmotionMessageBox } from '../styles';
import ChatInput from './ChatInput';
import MessageBox from './MessageBox';


const DownloadFiles = ({ progress }) => {


    return (
        <div>
            {progress}
        </div>
    )
}


// тут переписка и инпут для отправки сообщений
function ChatListBox({ dialog_id, show }) {
    const [progress, setProgress] = useState(0)
    const uId = localStorage.getItem('uId')
    const [chatList, setChatList] = useState([])
    const [last_message_id, setLastMessageId] = useState(null);

    const messageBox = chatList.length > 0 ? (
        chatList.map(message => (
            <MessageBox
                className={EmotionMessageBox}
                // styles={{ overflow: 'clip' }}
                position={message.user_id == uId ? 'right' : 'left'}
                title={`${message.first_name} ${message.last_name ? message.last_name : ''}`}
                type='text'
                text={message.message_text}
                date={message.created_at ? new Date(message.created_at) : new Date()}
                replyButton={true}
                key={message.message_id}
            >
            </MessageBox>
        ))
    ) : (
        <div>привет</div>
    );

    const chatListApi = (dialog_id) => {
        $api.post('/api/chatList', {
            dialog_id, last_message_id
        })
            .then(
                (resp) => {
                    console.log(resp.data);
                    setLastMessageId(resp.data.reverse()[0].message_id)
                    //setChatList([...resp.data.reverse()])
                    setChatList((prev) => [...prev, ...resp.data.slice().reverse()])
                }
            )
    }

    useEffect(
        () => {
            console.log('ghjdth asdfkj k')
        }, []
    )

    const isCodeExecuted = useRef(false)
    useEffect(
        () => {
            if (!isCodeExecuted.current && show) {
                console.log('создаем новый сокет:addMess' + dialog_id)
                socket.on("addMess" + dialog_id, (newMessage) => {
                    setChatList((prevChatList) => [newMessage[0], ...prevChatList]);
                    console.log(newMessage[0]);
                });
                console.log('chatListApi', show, isCodeExecuted);
                chatListApi(dialog_id)
                isCodeExecuted.current = true;
            }
            // return () => {
            //     console.log('удляем запрос addMess', dialog_id)
            //     socket.off("addMess" + dialog_id);
            // };
        }, [show])

    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >

            <div style={{ overflow: 'auto', height: "100%", display: 'flex', flexDirection: "column-reverse" }}>
                <DownloadFiles progress={progress}></DownloadFiles>
                {messageBox}
                <button onClick={() => chatListApi(dialog_id)}> еще 5</button>
            </div>

            <ChatInput dialog_id={dialog_id} setProgress={setProgress} ></ChatInput>

        </div>
    );
}

ChatListBox.propTypes = {
    dialog_id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};


export default ChatListBox;