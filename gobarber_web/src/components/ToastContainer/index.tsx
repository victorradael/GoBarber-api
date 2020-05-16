import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastConatinerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastConatinerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
