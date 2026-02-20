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
