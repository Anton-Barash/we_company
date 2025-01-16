import { companyStore } from '../mobx/store';
import { EmotionChatFiles, EmotionChatName, EmotionChatTime } from '../styles';

import PropTypes from 'prop-types';



const MessageBox = ({ className, position, title, type, text, date,
    message_id, dialog_id, handleGeneratePresignedUrlRequest, is_read }) => {


    const company_id = companyStore.activeCompanyId;
    return (
        <div>
            <div className={className(is_read)} style={{ float: position === 'right' ? 'right' : 'left' }}>
                <span className={EmotionChatName}>{title}</span>
                {type === 'text' ? <pre>{text}</pre> : <div> <span>&#128462;</span>
                    <p id={`${company_id}/${dialog_id}/` + message_id} className={EmotionChatFiles} onClick={handleGeneratePresignedUrlRequest}>
                        {text}
                    </p></div>
                }
                <div className={EmotionChatTime}>{new Intl.DateTimeFormat('ru', { dateStyle: 'short' }).format(date)}</div>
            </div>
        </div>
    );
};


MessageBox.propTypes = {
    className: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right']).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'text/plain', 'image/jpeg']).isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    replyButton: PropTypes.bool.isRequired,
    message_id: PropTypes.number.isRequired,
    dialog_id: PropTypes.number.isRequired,
    handleGeneratePresignedUrlRequest: PropTypes.func.isRequired,
    is_read: PropTypes.bool
};



export default MessageBox;
