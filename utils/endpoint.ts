const buildEndpoint = (
    base: string,
    path: string,
    articleType: string,
    isReceitasSite: boolean
) => {
    const prefix = isReceitasSite ? '/receitas' : '';
    return `${base}/api/v1/${articleType}${prefix}/${path}`;
}

export { buildEndpoint };