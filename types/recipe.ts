export interface Recipe {
    id: string;
    metadata: {
        type: 'recipe';
        title: string;
        description: string;
        canonical?: string;
        theme: {
            primary: string;
        }
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
