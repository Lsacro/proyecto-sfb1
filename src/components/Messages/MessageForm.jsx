//Componente para enviar el mensaje

import React, { useState } from "react";

const MessageForm = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState("");
  // Obtener el nombre y correo desde localStorage (hasta enchufar a firebase)
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  const handleSend = () => {
    if (!message.trim() || !name.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newMessage = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      name,
      email,
      content: message,
    };

    onSubmit(newMessage);
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className=" text-2xl font-semibold mb-4">Enviar Mensaje</h2>
        <textarea
          className="w-full p-2 mb-2 border rounded-md"
          rows="4"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSend}
            className="bg-beige text-white px-4 py-2 rounded-md"
          >
            Enviar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
