const { describe } = require('mocha');
const assert = require('assert').strict;
const articleRepository = require('../article.repository');


describe('Test ArticleRepository', () => {
    describe('Tests getArticle', () => {
        // Test pour vérifier que la méthode retourne un article avec l'ID donné
        it('devrait retourner un article avec l\'ID donné', async () => {
            const id = 1;
            const article = await articleRepository.getArticle(id);
            // Vérifie qu'il y a une correspondance stricte entre l'ID de l'article retourné et l'ID donné
            assert.strictEqual(article.id, id);
        });
        // Test pour vérifier que la méthode retourne un objet vide en cas d'erreur
        it('devrait retourner null en cas d\'erreur', async () => {
            const id = -1;
            const article = await articleRepository.getArticle(id);
            // Vérifie qu'il y a une correspondance stricte entre l'objet retourné et un objet vide {}
            assert.deepStrictEqual(article, null);    
        });
    })
});