import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const socket = io(SOCKET_URL);

export const joinProject = (projectId: string) => {
  socket.emit('joinProject', projectId);
};

export const emitTaskMoved = (data: any) => {
  socket.emit('taskMoved', data);
};

export const onTaskUpdated = (callback: (data: any) => void) => {
  socket.on('taskUpdated', callback);
};

export const cleanup = () => {
  socket.removeAllListeners();
};