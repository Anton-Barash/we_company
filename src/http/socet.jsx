import io from 'socket.io-client';
import { API_URL_io } from '.';

const socket = io(API_URL_io)

export default socket;