import { ArticleTheme } from "./article";

export interface Recipe {
    id: string;
    metadata: {
        type: 'recipe';
        title: string;
        canonical?: string;
        theme: ArticleTheme
        og_image?: string;
    };
    content: {
        slug: string;
        headline: string;
        author: string;
        dates: {
            published_at: string;
            updated_at: string;
        };
        media?: {
            main: {
                type: string;
                url: string;
                url_webp: string;
                alt: string;
                caption: string
                credit: string
            }
        },
        recipe: {
            portions: number;
            preparation_time: number;
            difficulty: string;
            preparation: string;
            parts: {
                parteReceita: string;
                ingredientes: {
                    quantidade: string;
                    unidadeMedida: {
                        title: string;
                    }
                    ingrediente: {
                        title: string;
                    }
                }[]
            }[];
        }
    };
}

export interface RecipeRaw {
    "_id": string;
    route: {
        map: {
            template: {
                config: {
                    theme: {
                        title: string;
                        id: string;
                        css: [
                            {
                                key: string;
                                value: string;
                            },
                            {
                                key: string;
                                value: string;
                            },
                            {
                                key: string;
                                value: string;
                            },
                            {
                                key: string;
                                value: string;
                            }
                        ]
                    },

                }
            }
        }
    },
    config: {
        order: {
            data: {
                title: string;
                text: string;
                image: {
                    title: string;
                    credit: string;
                    url: string;
                    width: number;
                    height: number;
                    created_at: string;
                    updated_at: string;
                    urlCrop: string;
                },
                porcao: number;
                tempo_de_preparo: number;
                dificuldade: string;
                autor: string;
                modo_preparo: string;
                partes: [
                    {
                        parteReceita: string;
                        ingredientes: [
                            {
                                quantidade: string;
                                unidadeMedida: {
                                    title: string;
                                },
                                ingrediente: {
                                    title: string;
                                }
                            }
                        ]
                    }
                ]
            }
        },
        seo: {
            title: string;
        }
    },
    status: 1,
    url: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    "@created": string;
    "@updated": string;
}
