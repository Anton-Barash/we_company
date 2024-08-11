import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import $api from '../http';

import socket from '../http/socet';
import { EmotionChantButtMoreMess, EmotionChatBox, EmotionMessageBox } from '../styles';
import ChatInput from './ChatInput';
import MessageBox from './MessageBox';

const downloadFile = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};



const handleGeneratePresignedUrlRequest = (e) => {
    const name = e.target.innerText;
    const key = e.target.id;
    console.log(key);

    $api.post('/api/generatePresignedUrl', { key }, {
  
    })
    .then(resp => {
        console.log(resp);
        const fileUrl = resp.data; // Предположим, что ссылка на файл находится в свойстве 'url' объекта ответа
        downloadFile(fileUrl, name); // Вызов функции для скачивания файла
    });
};



const DownloadFiles = ({ progress }) => {
    const { percentCompleted, files } = progress;

    if (files.length === 0) {
        return null; // If files array is empty, return nothing
    }

    return (
        <div>
            {files.map((file, index) => (
                <div key={index}>
                    {file.name}, {index === 0 ? percentCompleted : 0}%
                </div>
            ))}
        </div>
    );
}



// тут переписка и инпут для отправки сообщений
function ChatListBox({ dialog_id, show }) {
    const [progress, setProgress] = useState({ percentCompleted: 0, files: [] })
    const uId = localStorage.getItem('uId')
    const [chatList, setChatList] = useState([])
    const [last_message_id, setLastMessageId] = useState(null);



    const messageBox = chatList.length > 0 ? (
        chatList.map(message => (
            <MessageBox
                key={message.message_id}
                className={EmotionMessageBox}
                position={message.user_id == uId ? 'right' : 'left'}
                title={`${message.first_name} ${message.last_name ? message.last_name : ''}`}
                type={message.mime_type}
                text={message.message_text}
                date={message.created_at ? new Date(message.created_at) : new Date()}
                replyButton={true}
                message_id={message.message_id}
                dialog_id={message.dialog_id}
                handleGeneratePresignedUrlRequest={handleGeneratePresignedUrlRequest}
                isRead={message.is_read}
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
        }, [show])

    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >

            <div className={EmotionChatBox} style={{ overflow: 'auto', height: "100%", display: 'flex', flexDirection: "column-reverse" }}>
                <DownloadFiles progress={progress}></DownloadFiles>
                {messageBox}
                <button className={EmotionChantButtMoreMess} onClick={() => chatListApi(dialog_id)}> еще 5</button>
            </div>

            <ChatInput dialog_id={dialog_id} setProgress={setProgress}  ></ChatInput>

        </div>
    );
}

ChatListBox.propTypes = {
    dialog_id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};


export default ChatListBox;