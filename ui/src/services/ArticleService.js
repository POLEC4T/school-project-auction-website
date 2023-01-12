export async function getArticle(id) {
    const response = await fetch(`/api/article/${id}`);
    return await response.json();
}