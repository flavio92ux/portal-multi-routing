import { BandHeader } from "@/components/band/BandHeader";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BandHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <span className="text-sm font-bold tracking-widest uppercase text-[#00784C]">
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
