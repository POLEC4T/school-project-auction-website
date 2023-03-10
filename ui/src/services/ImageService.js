/**
 * Passerelle vers l'API depuis le frontend
 * @returns 
 */

import axios from "axios";
import authHeader from "./AuthHeaderService";

export async function getArticleImagesByArticleId(articleId) {
    const response = await fetch(`/api/article/${articleId}/images`);
    return await response.json();
}

export async function uploadImage(file, articleId) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('articleId', articleId);
    return axios.post('/api/image', formData, { headers: {'Content-Type': 'multipart/form-data'}});
}