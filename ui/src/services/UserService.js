export async function getUsers() {
    const response = await fetch('/api/users');
    return await response.json();
}

export async function getUser(login) {
    const response = await fetch(`/api/users/${login}`);
    return await response.json();
}