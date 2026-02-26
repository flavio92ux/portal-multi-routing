import Image from 'next/image';
import Link from 'next/link';

export function BandFooter() {
  return (
    <footer className="w-full bg-[#677586] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4">
        {/* Logo */}
        <div className="mb-2">
          <Link
            href="https://www.band.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://pubimg.band.com.br/Files/logotipo-band.png"
              alt="Band"
              width={200}
              height={50}
              className="h-auto w-48 opacity-90"
              loading="lazy"
              priority={false}
            />
          </Link>
        </div>

        {/* Links de Navegação */}
        <nav className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-wider text-white">
          <Link href="#" className="hover:underline">
            PROGRAMAÇÃO
          </Link>
          <span className="mx-1 text-[8px]">●</span>
          <Link href="#" className="hover:underline">
            POLÍTICA DE PRIVACIDADE
          </Link>
        </nav>

        {/* Linha Divisora Fina */}
        <div className="my-1 w-full max-w-[300px] border-t border-white/20"></div>

        {/* Redes Sociais */}
        <div className="flex items-center gap-5">
          {/* X (Twitter) */}
          <Link
            href="https://twitter.com/band"
            target="_blank"
            className="text-white hover:opacity-70"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>

          {/* Facebook */}
          <Link
            href="https://facebook.com/band"
            target="_blank"
            className="text-white hover:opacity-70"
          >
            <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Link>

          {/* Instagram */}
          <Link
            href="https://instagram.com/band"
            target="_blank"
            className="text-white hover:opacity-70"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </Link>

          {/* YouTube */}
          <Link
            href="https://youtube.com/band"
            target="_blank"
            className="text-white hover:opacity-70"
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
