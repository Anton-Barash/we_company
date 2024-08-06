import React from 'react';

interface MessageBoxProps {
    className: string;
    position: 'left' | 'right';
    title: string;
    type: 'text' | 'image' | 'video'; // Добавьте другие типы, если необходимо
    text: string;
    date: Date;
    replyButton: boolean;
    key: number;
}

const MessageBox: React.FC<MessageBoxProps> = ({ className, position, title, type, text, date, replyButton, key }) => {
    return (
        <div  >
            <div className={className} style={{ float: position === 'right' ? 'right' : 'left' }}>
                <div>{title}</div>
                <pre>{text}</pre>
                <div>{new Intl.DateTimeFormat('ru', { dateStyle: 'short' }).format(date)}</div>
            {replyButton && <button>Reply</button>}
            </div>
        </div>
    );
};

export default MessageBox;
