const getArticleType = (url: string): 'BandArticle' | 'BandReceitas' | 'BandVideo' | null => {
    if (url.includes('receita/')) {
        return 'BandReceitas';
    }
    if (url.includes('esportes/')) {
        return 'BandArticle';
    }
    if (url.includes('noticias/')) {
        return 'BandArticle';
    }
    if (url.includes('videos/')) {
        return 'BandVideo';
    }
    return null;
};

export { getArticleType };
