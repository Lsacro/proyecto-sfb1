//Componente para mostrar el listado de mensajes

import React, { useState } from "react";
import MessageForm from "./MessageForm";

const MessageList = ({ flatId, userId, isOwner, existingMessages }) => {
  const [messages, setMessages] = useState(existingMessages || []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  const filteredMessages = isOwner
    ? messages
    : messages.filter((msg) => msg.userId === userId);

  return (
    <div>
      <h3 className="border-b border-gray-300 text-xl font-semibold mb-4">
        Mensajes
      </h3>
      <div className="mb-4">
        {filteredMessages.length === 0 ? (
          <p>No hay mensajes</p>
        ) : (
          filteredMessages.map((msg) => (
            <div key={msg.id} className="border-b border-gray-300 py-2">
              <p>
                <strong>{msg.name}</strong> ({msg.email})
              </p>
              <p className="text-sm text-gray-600">{msg.timestamp}</p>
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>
      {!isOwner && (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-beige text-white px-4 py-2 rounded-md"
        >
          Enviar Mensaje
        </button>
      )}

      <MessageForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default MessageList;
