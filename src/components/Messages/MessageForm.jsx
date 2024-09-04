import { useState } from "react";
import { getToken } from "../../services/authService";
import { createMessage, findNameByEmail } from "../../services/firebase";

const MessageForm = ({ isOpen, onClose, onSubmit, flatId }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) {
      alert("El mensaje no puede estar vacío");
      return;
    }
    const token = getToken();
    const userInfo = findNameByEmail(token);

    const newMessage = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      name: userInfo.firstName,
      email: token,
      content: message,
      flatId: flatId, // Agregamos el flatId al mensaje
    };

    try {
      const messageWithId = await createMessage(newMessage);
      onSubmit(messageWithId);
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Enviar Mensaje</h2>
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
