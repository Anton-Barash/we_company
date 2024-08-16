import React, { useEffect, useState, useRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import $api from '../http';

import socket from '../http/socet';
import { EmotionChantButtMoreMess, EmotionChatBox, EmotionMessageBox } from '../styles';
import ChatInput from './ChatInput';
import MessageBox from './MessageBox';
import MessageListBox from './MessageListBox';


// тут переписка и инпут для отправки сообщений
export default function ChatListBox({ dialog_id, show }) {
    console.log('ChatListBox' + dialog_id)
    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
            <div className={EmotionChatBox} style={{ overflow: 'auto', height: "100%", display: 'flex', flexDirection: "column-reverse" }}>
                <MessageListBox dialog_id={dialog_id} show={show} ></MessageListBox>
            </div>
            <ChatInput dialog_id={dialog_id}></ChatInput>
        </div>
    );
}

ChatListBox.propTypes = {
    dialog_id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};
