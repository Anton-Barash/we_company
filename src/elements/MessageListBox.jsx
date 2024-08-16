import React, { useCallback, useEffect, useRef, useState } from "react"
import socket from "../http/socet"
import $api from "../http"
import { EmotionChantButtMoreMess, EmotionChatBox, EmotionMessageBox } from "../styles"
import MessageBox from "./MessageBox";


const downloadFile = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};


const handleGeneratePresignedUrlRequest = (e) => {
    const key = e.target.id;
    console.log(key);

    $api.post('/api/generatePresignedUrl', { key }, {
        headers: {
            'response-content-disposition': 'attachment; filename="filename.ext"'
        }
    })
        .then(resp => {
            console.log(resp.data);
            const newFileName = 'rwerew.jpg'
            const fileUrl = resp.data; // Предположим, что ссылка на файл находится в свойстве 'url' объекта ответа
            downloadFile(fileUrl, newFileName); // Вызов функции для скачивания файла

        }
        );
};


export default function MessageListBox({ dialog_id, show }) {
    console.log('MessageListBox:', dialog_id);
    const uId = localStorage.getItem('uId');
    const [chatList, setChatList] = useState([]);
    const [lastMessageId, setLastMessageId] = useState(null);
    const isCodeExecuted = useRef(false);

    const chatListApi = useCallback((dialog_id) => {
        $api.post('/api/chatList', {
            dialog_id, last_message_id: lastMessageId
        })
            .then((resp) => {
                console.log(resp.data);
                setLastMessageId(resp.data.reverse()[0].message_id);
                setChatList((prev) => [...prev, ...resp.data.slice().reverse()]);
            });
    }, [lastMessageId]);

    useEffect(() => {
        if (!isCodeExecuted.current && show) {
            console.log('создаем новый сокет:addMess' + dialog_id);
            const handleSocketMessage = (newMessage) => {
                setChatList((prevChatList) => [newMessage[0], ...prevChatList]);
                console.log(newMessage[0]);
            };
            socket.on("addMess" + dialog_id, handleSocketMessage);
            chatListApi(dialog_id);
            isCodeExecuted.current = true;

            // return () => {
            //     socket.off("addMess" + dialog_id, handleSocketMessage);
            // };
        }
    }, [dialog_id, show, chatListApi]);

    const messageBox = React.useMemo(() => {
        return chatList.length > 0 ? (
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
                />
            ))
        ) : (
            <div>привет</div>
        );
    }, [chatList]);

    return (
        <div className={EmotionChatBox} style={{ overflow: 'auto', height: "100%", display: 'flex', flexDirection: "column-reverse" }}>
            {messageBox}
            <button className={EmotionChantButtMoreMess} onClick={() => chatListApi(dialog_id)}> еще 5</button>
        </div>
    );
}