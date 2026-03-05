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
  'Horoscopo',
  'Bandshop',
];

export function Newsletter() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div>
      {/* Newsletter Card */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white pb-10 sm:pb-0">
        {/* Top blue border */}
        <div className="bg-primary h-2" />

        <div className="p-4 sm:p-6">
          <h3 className="text-primary mb-4 text-2xl font-bold">
            Newsletter Notícias
          </h3>
          <p className="mb-4 text-sm text-slate-950">
            Inscreva-se na nossa newsletter e receba as noticias mais
            importantes do dia direto no seu e-mail.
          </p>
          <p className="text-primary mb-4 text-sm font-bold">
            Selecione os seus temas favoritos:
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  selectedTopics.includes(topic)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Email input and button */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="E-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-primary focus:ring-primary w-full flex-1 rounded border border-gray-300 px-4 py-3 text-sm text-slate-950 placeholder:text-gray-400 focus:ring-1 focus:outline-none"
            />
            <button className="flex w-full items-center justify-center gap-2 rounded bg-gray-400 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-500 sm:w-auto">
              <Mail className="h-4 w-4" />
              Assinar grátis
            </button>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 shrink-0"
            />
            <label htmlFor="terms" className="text-xs text-slate-950">
              Li e concordo com os{' '}
              <a href="#" className="text-primary font-bold underline">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-primary font-bold underline">
                Políticas de Privacidade
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
