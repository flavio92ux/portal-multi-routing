import Image from 'next/image';

export function WhatsappBanner() {
  return (
    <div className="my-7 hidden justify-center lg:flex">
      <Image
        src="https://img.band.com.br/image/2024/03/18/banner-whatsapp-82436.png"
        alt="Band"
        width={750}
        height={250}
        className="h-auto w-full opacity-90"
        loading="lazy"
        priority={false}
      />
    </div>
  );
}
