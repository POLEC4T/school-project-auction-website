export async function getArticle(id) {
    const response = await fetch(`/api/article/${id}`);
    return await response.json();
}

export async function getNbLikeArticle(articleId) {
    const response = await fetch(`/api/article/${articleId}/likes`);
    return await response.json();
}

