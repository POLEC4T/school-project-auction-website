import axios from "axios";
import authHeader from "./AuthHeaderService";

export async function getUsers() {
    const response = await fetch('/api/users');
    return await response.json();
}

export async function getUser(login) {
    const response = await fetch(`/api/users/${login}`);
    return await response.json();
}

export function getVendre(){
    return axios.get("/api/vendre", { headers: authHeader() });
}