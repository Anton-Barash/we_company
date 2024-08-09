import React from 'react';

interface MessageBoxProps {
    className: string;
    position: 'left' | 'right';
    title: string;
    type: 'text' | 'text/plain' | 'image/jpeg'; // Добавьте другие типы, если необходимо
    text: string;
    date: Date;
    replyButton: boolean;
    key: number;
}

const MessageBox: React.FC<MessageBoxProps> = ({ className, position, title, type, text, date, replyButton, key }) => {
    const handleServerRequest = () => {
        // Здесь вы можете добавить логику для запроса к серверу в зависимости от mime_type
        
            // Выполнить запрос к серверу
        
    };

    return (
        <div>
            <div className={className} style={{ float: position === 'right' ? 'right' : 'left' }}>
                <div>{title}</div>
                <pre>{text}</pre>
                <div>{new Intl.DateTimeFormat('ru', { dateStyle: 'short' }).format(date)}</div>
                {replyButton && <button>Reply</button>}
                {type === 'text' ? null : <button onClick={handleServerRequest}>Make Server Request</button>}
            </div>
        </div>
    );
};

export default MessageBox;
