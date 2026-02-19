export interface NavItem {
  label: string;
  href: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

export interface UserData {
  name: string;
  initials: string;
  avatarColor: string;
}

export interface HeaderData {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  navItems: NavItem[];
  liveStream: {
    label: string;
    href: string;
    isLive: boolean;
  };
  user: UserData;
  menuSections: MenuSection[];
  userMenuActions: {
    minhaBand: { label: string; href: string };
    editarPerfil: { label: string; href: string };
    sairDaConta: { label: string; href: string };
  };
}

export const headerMock: HeaderData = {
  logo: {
    src: "https://www.band.uol.com.br/image/band-logo.webp",
    alt: "Band.com.br",
    href: "/band",
  },
  navItems: [
    { label: "Jornalismo", href: "/band/jornalismo" },
    { label: "Esportes", href: "/band/esportes" },
    { label: "Entrete", href: "/band/entretenimento" },
    { label: "Receitas", href: "/band/receitas" },
  ],
  liveStream: {
    label: "AO VIVO",
    href: "/band/ao-vivo",
    isLive: true,
  },
  user: {
    name: "Flavio",
    initials: "F",
    avatarColor: "#00897B",
  },
  menuSections: [
    {
      title: "Esportes",
      items: [
        { label: "Pagina Inicial", href: "/band/esportes" },
        { label: "Programas", href: "/band/esportes/programas", hasSubmenu: true },
        { label: "Jogos de hoje", href: "/band/esportes/jogos-de-hoje" },
        { label: "Formula Indy", href: "/band/esportes/formula-indy" },
        { label: "Formula 1", href: "/band/esportes/formula-1" },
        { label: "Band Motor", href: "/band/esportes/band-motor" },
      ],
    },
    {
      title: "Jornalismo",
      items: [
        { label: "Pagina Inicial", href: "/band/jornalismo" },
        { label: "Programas", href: "/band/jornalismo/programas", hasSubmenu: true },
        { label: "Brasil", href: "/band/jornalismo/brasil" },
        { label: "Internacional", href: "/band/jornalismo/internacional" },
        { label: "Politica", href: "/band/jornalismo/politica" },
        { label: "Economia", href: "/band/jornalismo/economia" },
      ],
    },
    {
      title: "Entretenimento",
      items: [
        { label: "Pagina Inicial", href: "/band/entretenimento" },
        { label: "Programas", href: "/band/entretenimento/programas", hasSubmenu: true },
        { label: "Famosos", href: "/band/entretenimento/famosos" },
        { label: "TV", href: "/band/entretenimento/tv" },
      ],
    },
    {
      title: "Receitas",
      items: [
        { label: "Pagina Inicial", href: "/band/receitas" },
        { label: "Programas", href: "/band/receitas/programas", hasSubmenu: true },
        { label: "Doces", href: "/band/receitas/doces" },
        { label: "Salgados", href: "/band/receitas/salgados" },
      ],
    },
  ],
  userMenuActions: {
    minhaBand: { label: "Minha Band", href: "/band/minha-band" },
    editarPerfil: { label: "Editar Perfil", href: "/band/editar-perfil" },
    sairDaConta: { label: "Sair da conta", href: "/band/logout" },
  },
};
