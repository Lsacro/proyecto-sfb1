//Componente para mostrar el listado de mensajes

import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";

const MessageList = ({ flatId, userId, isOwner, existingMessages }) => {
  const [messages, setMessages] = useState(existingMessages || []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setMessages(existingMessages || []);
  }, [existingMessages]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  // Filtramos los mensajes basados en el userId si no es el propietario
  const filteredMessages = isOwner
    ? messages
    : messages.filter((msg) => msg && msg.email === userId);

  const renderMessage = (msg) => {
    if (!msg) return null;

    const { id, name, email, timestamp, content } = msg;
    return (
      <div key={id || Date.now()} className="border-b border-gray-300 py-2">
        <p>
          <strong>{name || "Usuario desconocido"}</strong> (
          {email || "email no disponible"})
        </p>
        <p className="text-sm text-gray-600">
          {timestamp || "Fecha desconocida"}
        </p>
        <p>{content || "Sin contenido"}</p>
      </div>
    );
  };

  return (
    <div>
      <h3 className="border-b border-gray-300 text-xl font-semibold mb-4">
        Mensajes
      </h3>
      <div className="mb-4">
        {filteredMessages.length === 0 ? (
          <p>No hay mensajes</p>
        ) : (
          filteredMessages.map(renderMessage)
        )}
      </div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-beige text-white px-4 py-2 rounded-md"
      >
        Enviar Mensaje
      </button>

      <MessageForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSendMessage}
        flatId={flatId}
      />
    </div>
  );
};

export default MessageList;
