import { BandHeader } from '@/components/templates/header/BandHeader';

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <span className="text-sm font-bold tracking-widest text-[#00784C] uppercase">
          Esportes
        </span>
        <h1 className="mt-2 mb-4 text-4xl leading-tight font-extrabold text-gray-900">
          Titulo do artigo de exemplo para preview do header
        </h1>
        <p className="text-lg leading-relaxed text-gray-500">
          Este e um artigo de exemplo para visualizar o header da Band
          funcionando com o menu lateral. Clique no icone de hamburguer para
          abrir o menu.
        </p>
      </main>
    </div>
  );
}
