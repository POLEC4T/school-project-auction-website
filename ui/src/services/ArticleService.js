export async function getArticle(id) {
    const response = await fetch(`/api/article/${id}`);
    console.log("service");
    console.log(response);
    const article = await response.json();
    
    console.log(article);
    return article;
}