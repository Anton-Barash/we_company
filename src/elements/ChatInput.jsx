import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { EmotionChatInput, EmotionInutMess } from '../styles';
import FileUpload from './FileUpload';
import $api from '../http';
import { companyStore } from '../mobx/store';

const DownloadFiles = ({ progress }) => {
    if (!progress || !progress.percentCompleted || !progress.files) {
        return null; // Вывод null, если пропсы невалидны
    }

    const { percentCompleted, files } = progress;

    if (files.length === 0) {
        return null;
    }

    return (
        <div>
            {files.map((file, index) => (
                <div key={index}>
                    {file.name},size:{(file.size / 1048576).toFixed(2)}Mb, {index === 0 ? percentCompleted : 0}%
                </div>
            ))}
        </div>
    );
}

DownloadFiles.propTypes = {
    progress: PropTypes.shape({
        percentCompleted: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                size: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired
};

function ChatInput({ dialog_id }) { // Принимаем пропс dialog_id напрямую, без обертки в объект
    const [message_text, setMessage_text] = useState('');
    const inputRef = useRef(null);
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [progress, setProgress] = useState({ percentCompleted: 0, files: [] })

    const addMess = () => {
        $api.post(
            '/api/addMess', {
            dialog_id, message_text, company: companyStore.getActiveCompany()
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
        <div>
            <DownloadFiles progress={progress}></DownloadFiles>
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
                    {message_text &&
                        <button disabled={message_text === ''} onClick={handleButtonClick}>
                            {isCtrlPressed ? 'Enter to send' : 'Click or Ctrl'}
                        </button>
                    }
                    <FileUpload disabled={message_text === ''} setProgress={setProgress} dialog_id={dialog_id} />
                </div>
            </div>
        </div>

    );

}

ChatInput.propTypes = {
    dialog_id: PropTypes.number.isRequired
};

export default ChatInput;
