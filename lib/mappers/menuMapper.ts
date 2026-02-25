import { HeaderData } from '@/types/menu-header';

/**
 * Extracts the header component data from the Vibra API response.
 * The header lives inside `route.map.template.config.order[]`
 * as the entry whose `data.component === "header"`.
 */
function extractHeaderBlock(vibraData: any): any | null {
  const order = vibraData?.route?.map?.template?.config?.order;
  if (!Array.isArray(order)) return null;

  const headerEntry = order.find(
    (entry: any) => entry?.data?.component === 'header'
  );
  return headerEntry?.data ?? null;
}

/**
 * Maps raw Vibra API data (`dataRaw`) into the `HeaderData` shape
 * used by `BandHeader` and `BandMobileMenu`.
 *
 * Fields that do not exist in the API (user info, menuSections,
 * userMenuActions) are filled with sensible defaults so the UI
 * keeps working while those features are implemented.
 */
export function mapVibraToHeaderData(vibraData: any): HeaderData {
  const headerBlock = extractHeaderBlock(vibraData);

  const menuCMS = headerBlock?.menuCMS ?? {};
  const logoMain = headerBlock?.logoMain ?? {};
  const logo = headerBlock?.logo ?? {};

  // --- logo -----------------------------------------------------------
  const mappedLogo = {
    src:
      logoMain?.image?.url ??
      'https://img.band.com.br/image/2025/08/25/logo-da-band-10589.webp',
    alt: logoMain?.name ?? 'Band',
    href: logoMain?.link ?? logo?.link ?? '/band',
  };

  // --- navItems (from menuCMS.minified) --------------------------------
  const minified: any[] = menuCMS.minified ?? [];

  const navItems = [
    { label: 'Jornalismo', href: 'https://www.band.com.br/noticias' },
    { label: 'Esportes', href: 'https://www.band.com.br/esportes' },
    { label: 'Entretê', href: 'https://www.band.com.br/entretenimento' },
    { label: 'Receitas', href: 'https://receitas.band.com.br/' },
  ];

  // const navItems = minified.map((item: any) => ({
  //   label: item.title ?? '',
  //   href: item.link ?? '#',
  // }));

  // --- liveStream (from menuCMS.secondary) -----------------------------
  const secondaryLive = (menuCMS.secondary ?? []).find(
    (item: any) => item.live === true
  );
  const liveStream = {
    label: secondaryLive?.title ?? 'AO VIVO',
    href: secondaryLive?.link ?? '#',
    isLive: !!secondaryLive,
  };

  // --- socialLinks (from menuCMS.share) --------------------------------
  // Stored for potential future use; not part of HeaderData today.
  // const socialLinks = (menuCMS.share ?? []).map(...)

  // --- user (static default - API does not provide this) ---------------
  const user = {
    name: 'Visitante',
    initials: 'V',
    avatarColor: '#00897B',
  };

  // --- menuSections (built from minified as a single section) ----------
  const menuSections = minified.length
    ? [
        {
          title: menuCMS.name ?? 'Menu',
          items: minified.map((item: any) => ({
            label: item.title ?? '',
            href: item.link ?? '#',
            hasSubmenu: false,
          })),
        },
      ]
    : [];

  // --- userMenuActions (static defaults) -------------------------------
  const userMenuActions = {
    minhaBand: { label: 'Minha Band', href: '/band/minha-band' },
    editarPerfil: { label: 'Editar Perfil', href: '/band/editar-perfil' },
    sairDaConta: { label: 'Sair da conta', href: '/band/logout' },
  };

  return {
    logo: mappedLogo,
    navItems,
    liveStream,
    user,
    menuSections,
    userMenuActions,
  };
}
