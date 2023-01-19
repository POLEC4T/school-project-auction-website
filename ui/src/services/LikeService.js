import axios from "axios";
import authHeader from "./AuthHeaderService";

export async function createLike(articleId) {
    console.log("headers create", authHeader());
    const response = await axios.post(`/api/likes/create/${articleId}`, {}, { headers: authHeader() });
    return await response.data;
}

export async function removeLike(articleId) {
    console.log("headers remove", authHeader());
    const response = await axios.delete(`/api/likes/remove/${articleId}`, { headers: authHeader() });
    return await response.data;
}

export async function isArticleLikedByUser(articleId) {
    const response = await axios.get(`/api/likes/article/${articleId}`, { headers: authHeader() });
    return await response.data;
}

