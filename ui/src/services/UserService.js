import axios from "axios";
import authHeader from "./AuthHeaderService";

export async function getUsers() {
    const response = await fetch('/api/users');
    return await response.json();
}

export async function getUserByLogin(login) {
    const response = await fetch(`/api/users/login/${login}`);
    return await response.json();
}

export async function getUserById(id) {
    const response = await fetch(`/api/users/id/${id}`);
   return await response.json();
   
}

export async function getArticlesWonbyUserId(id) {
    const response = await fetch(`/api/users/${id}/encheregagnee`);   
    return await response.json();
}

export function getVendre(){
    return axios.get("/api/vendre", { headers: authHeader() });
}

export function getProfileInfos(){
    return axios.get("/api/profil", { headers: authHeader() });
}

export function updateSolde(userId, newSolde) {
    return axios.put(`/api/users/${userId}/solde`, { solde: newSolde })
    .then(response => {
        console.log('Solde updated successfully!');
        return response.data;
    })
    .catch(error => {
        console.log('Error updating solde:', error);
        throw error;
    });
}

