

const ChatSection = ({ chatMessages, newMessage, setNewMessage, setChatMessages }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">Chat</h3>
      <div className="bg-white text-black p-2 rounded-md h-32 overflow-y-auto">
        {chatMessages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
      <input className="w-full p-2 mt-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
      <button className="w-full bg-blue-700 p-2 mt-2 rounded" onClick={() => setChatMessages([...chatMessages, newMessage])}>Send</button>
    </div>
  );
};

export default ChatSection;
