'use client';

import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'agent', content: data.response }]);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="border rounded p-4 h-[400px] overflow-y-auto bg-gray-900 mb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={\`text-sm \${m.role === 'user' ? 'text-right text-blue-400' : 'text-left text-green-400'}\`}>
            <p><strong>{m.role === 'user' ? 'Tú' : 'Agente'}:</strong> {m.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded-l bg-gray-800 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje..."
        />
        <button className="bg-green-600 px-4 rounded-r" onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}