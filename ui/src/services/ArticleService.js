import axios from 'axios';
import authHeader from './AuthHeaderService';

export async function getArticle(id) {
    const response = await fetch(`/api/article/${id}`);
    return await response.json();
}

export async function getNbLikeArticle(articleId) {
    const response = await fetch(`/api/article/${articleId}/likes`);
    return await response.json();
}

export async function createArticle(article) {
    return axios.post('/api/article', {data: article}, { headers: authHeader() });
}

export async function updateStatutArticle(articleId, statut) {
    return axios.put(`/api/article/${articleId}/statut`, { statut: statut })
    .then(response => {
        console.log('Statut updated successfully!');
        return response.data;
    })
    .catch(error => {
        console.log('Error updating statut:', error);
        throw error;
    });
}

export async function updateDateLivraisonArticle(articleId, dateLivraison) {
    return axios.put(`/api/article/${articleId}/dateLivraison`, { dateLivraison: dateLivraison })
    .then(response => {
        console.log('DateLivraison updated successfully!');
        return response.data;
    })
    .catch(error => {
        console.log('Error updating dateLivraison:', error);
        throw error;
    });
}
