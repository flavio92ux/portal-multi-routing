import Image from 'next/image';
import Link from 'next/link';

export function ReceitasFooter() {
    return (
        <footer className="bg-gray-100">

            <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">

                <div className="space-y-4">

                    <div>
                        <h3 className="text-xl font-semibold">Newsletters</h3>
                        <p className="text-sm text-gray-600">
                            Para receber nossas novidades
                        </p>
                        <p className="text-sm text-red-500 font-medium">
                            Selecione os seus temas favoritos:
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {[
                            "Notícias",
                            "Fórmula 1",
                            "Esportes",
                            "MasterChef",
                            "Bandplay",
                            "Agro Band",
                            "Horóscopo",
                            "Bandshop",
                        ].map((item) => (
                            <button
                                key={item}
                                className="px-3 py-1 text-sm rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <input
                        type="email"
                        placeholder="E-mail*"
                        className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm"
                    />

                    <label className="text-xs text-gray-600 flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>
                            Li e concordo com os{" "}
                            <a href="#" className="text-red-500 underline">
                                Termos de Uso
                            </a>{" "}
                            e{" "}
                            <a href="#" className="text-red-500 underline">
                                Políticas de Privacidade
                            </a>
                        </span>
                    </label>

                    <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300">
                        ✈ Cadastrar
                    </button>
                </div>

                <div className="flex flex-col space-y-2 text-sm">
                    <h3 className="font-semibold text-lg mb-2">Programas e colunistas</h3>

                    <a href="#">Carole Crema</a>
                    <a href="#">Henrique Fogaça</a>
                    <a href="#">Manhã na Band Vale</a>
                    <a href="#">MasterChef</a>
                    <a href="#">MasterChef Profissionais</a>
                    <a href="#">Melhor da Noite</a>
                    <a href="#">Melhor da Tarde</a>
                    <a href="#">Pesadelo na Cozinha</a>
                    <a href="#">The Chef</a>
                </div>

                <div className="flex flex-col space-y-2 text-sm">
                    <h3 className="font-semibold text-lg mb-2">Veja mais</h3>

                    <a href="#">Dicas e notícias</a>
                    <a href="#">Vídeos</a>
                    <a href="#">Web Stories</a>
                </div>

                <div className="flex flex-col items-center md:items-end space-y-6">

                    <img
                        src="/logo-band-receitas.png"
                        alt="Band Receitas"
                        className="w-36"
                    />

                    <div className="flex gap-3">
                        {["YT", "X", "FB", "IG", "PT"].map((icon) => (
                            <a
                                key={icon}
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white text-sm"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            <div className="bg-slate-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-3 items-center text-sm gap-4">

                    <p className="text-center md:text-left">
                        © Copyright 2023 - Todos os direitos reservados.
                    </p>

                    <div className="mt-2 mb-6">
                        <Link
                            href="https://www.band.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 no-underline"
                        >
                            <Image
                                src="https://pubimg.band.com.br/Files/logotipo-band.png"
                                alt="Band"
                                width={70}
                                height={50}
                                className="h-[48px] w-auto object-contain"
                                loading="lazy"
                                priority={false}
                            />
                            <span className="font-sans text-[28px] font-normal tracking-[0.03em] text-white antialiased">
                                BANDEIRANTES
                            </span>
                        </Link>
                    </div>

                    <div className="flex justify-center md:justify-end gap-4">
                        <a href="#">Política de Privacidade</a>
                        <a href="#">Minha Conta</a>
                    </div>

                </div>
            </div>

        </footer>
    );
}
