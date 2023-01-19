/**
 * Passerelle vers l'API depuis le frontend
 * @returns
 */

export async function getDerniereOffre(articleId) {
    const response = await fetch(`/api/enchere/articleId/${articleId}`)
    return await response.json()
}
