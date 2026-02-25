'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const topics = [
  'Noticias',
  'Formula 1',
  'Esportes',
  'MasterChef',
  'Bandplay',
  'Agro Band',
];

export function Newsletter() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="rounded border border-[#d8dbdf] px-5 py-5">
      <h3 className="mb-1 text-base font-bold text-[#1d1d1d]">
        Newsletter Noticias
      </h3>
      <p className="mb-1 text-xs leading-relaxed text-[#647083]">
        Inscreva-se na nossa newsletter e receba as noticias mais importantes do
        dia direto no seu e-mail.
      </p>
      <p className="mb-3 text-xs font-semibold text-[#1d1d1d]">
        Selecione os seus temas favoritos:
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              selectedTopics.includes(topic)
                ? 'border-primary bg-primary text-white'
                : 'border-[#ced3db] bg-[#ffffff] text-[#3c444e] hover:border-[#939daa]'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder="E-mail*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded border border-[#ced3db] px-3 py-2 text-sm text-[#1d1d1d] placeholder:text-[#939daa] focus:border-primary focus:outline-none"
        />
        <button className="flex items-center gap-1.5 rounded bg-[#eaeaea] px-4 py-2 text-xs font-semibold text-[#3c444e] transition-colors hover:bg-[#d0d4d7]">
          <Mail className="h-4 w-4" />
          Assinar gratis
        </button>
      </div>

      <p className="mt-3 text-xs text-[#939daa]">
        Li e concordo com os{' '}
        <a href="#" className="text-primary underline">
          Termos de Uso
        </a>{' '}
        e{' '}
        <a href="#" className="text-primary underline">
          Politicas de Privacidade
        </a>
      </p>
    </div>
  );
}
