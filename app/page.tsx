import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-primary">
      <p>Band Home Page</p>
      <div className="mt-3 flex flex-col bg-white pt-3">
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/minas-gerais/noticias/senado-em-minas-marilia-campos-lidera-pesquisa-com-17-seguida-por-silveira-13-viana-e-aro-tem-12-202512102012'
          }
        >
          Marília Campos Lidera Pesquisa
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/entretenimento/pesadelo-na-cozinha/noticias/esposa-de-jacquin-comenta-estado-do-chef-apos-reality-muito-estressado-202602091926'
          }
        >
          Esposa de Jacquin
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/economia/noticias/macron-afirma-que-acordo-da-ue-com-o-mercosul-e-ruim-e-mal-negociado-202602101021'
          }
        >
          Macron Afirma
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/ciencia-e-tecnologia/noticias/crimes-ciberneticos-sobem-28-em-2025-abuso-infantil-e-misoginia-disparam-202602101057'
          }
        >
          Crimes Cibernéticos
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/band-vale/noticias/arvore-de-grande-porte-cai-na-avenida-jose-longo-em-sao-jose-dos-campos-202602101038'
          }
        >
          Árvore de Grande Porte Cai na Avenida José
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/esportes/automobilismo/formula-1/noticias/confira-11-pontos-para-ficar-de-olho-na-temporada-de-2026-da-formula-1-202603041014'
          }
        >
          Confira 11 pontos para ficar de olho na temporada de 2026 da Fórmula 1[Galeria de fotos]
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/esportes/apos-goleada-e-protestos-flamengo-anuncia-demissao-de-filipe-luis-202603030120'
          }
        >
          Após vitória de goleada e protestos, Fla anuncia demissão de Filipe Luís[OneFootball]
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/esportes/vasco-confirma-contratacao-de-renato-gaucho-e-diz-quando-sera-a-estreia-202603032218'
          }
        >
          Vasco confirma contratação de Renato Gaúcho e diz quando será a estreia[Embed Twitter]
        </Link>
        <Link
          href={
            'http://' +
            process.env.NEXT_PUBLIC_PORTAL_HOSTNAME +
            '/esportes/filipe-luis-se-despede-do-flamengo-saio-de-cabeca-erguida-202603032031'
          }
        >
          Filipe Luis se despede do Flamengo: "Saio de cabeça erguida"[Embed Instagram]
        </Link>
      </div>
    </div>
  );
}
