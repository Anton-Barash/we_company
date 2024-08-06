import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { EmotionChatInput, EmotionInutMess } from '../styles';
import FileUpload from './FileUpload';
import $api from '../http';

function ChatInput({ dialog_id, setProgress }) { // Принимаем пропс dialog_id напрямую, без обертки в объект

    const [message_text, setMessage_text] = useState('');
    const inputRef = useRef(null);
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    
    const addMess = () => {
        $api.post(
            '/api/addMess', {
            dialog_id: dialog_id, message_text
        }
        ).then(
            () => {
                inputRef.current.value = '';
                setMessage_text('');
            }
        );
    }

    const handleInputChange = useCallback((val) => {
        setMessage_text(val.target.value);
    }, []);

    useLayoutEffect(() => {
        if (message_text) {
            inputRef.current.style.height = "inherit";
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
        }
    }, [message_text]);

    const handleKeyDown = (e) => {
        if (e.key === 'Control') {
            setIsCtrlPressed(true);
        }
        if (e.key === 'Enter') {
            setIsEnterPressed(true);
        }
    };

    useEffect(() => {
        if (isCtrlPressed && isEnterPressed && message_text) {
            console.log("Ctrl + Enter pressed");
            addMess();
        }
    }, [isCtrlPressed, isEnterPressed, message_text]);

    const handleKeyUp = (e) => {
        if (e.key === 'Control') {
            setIsCtrlPressed(false);
        }
        if (e.key === 'Enter') {
            setIsEnterPressed(false);
        }
    };

    const handleButtonClick = () => {
        if (message_text !== '') {
            addMess();
        }
    };

    return (
        <div className={EmotionInutMess}>
            <textarea
                className={EmotionChatInput}
                placeholder="Type here..."
                value={message_text}
                onChange={handleInputChange}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                rows={2}
            />
            <div>
                {message_text ? (
                    <button disabled={message_text === ''} onClick={handleButtonClick}>
                        {isCtrlPressed ? 'Enter to send' : 'Click or Ctrl'}
                    </button>
                ) : (
                    <FileUpload dialog_id={dialog_id} setProgress={setProgress} /> // Передаем dialog_id напрямую
                )}
            </div>
        </div>
    );

}

ChatInput.propTypes = {
    dialog_id: PropTypes.string.isRequired,
};

export default ChatInput;
