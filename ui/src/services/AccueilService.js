export async function getArticlesWithLeastTimeLeft(){
    const response = await fetch('/api/accueil/leasttimeleft');
    return await response.json();
}