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

    describe('Tests deleteArticleByTitle', () => {


        // test pour vérifier que la méthode supprime un article avec le titre donné
        it('devrait supprimer un article avec le titre donné', async () => {
            const title = 'testDeleteArticle';
            // création d'un article de test pour le test qui a seulement les champs obligatoires
            const article = {
                titre: title,
                prix_depart: 10,
                prix_vente: 20,
                createdAt: new Date(),
                expires: new Date(),
                couleurs: 'test',
                materiaux: 'test',
                updatedAt: new Date(),
            };

            // Création d'un article de test pour le test
            await articleRepository.createArticle(article);
            const articlecreated = await articleRepository.getArticleByTitle(title);
            console.log(" coucoucouuuuu : " + articlecreated);
            // Suppression de l'article de test
            await articleRepository.deleteArticleByTitle(title);
            // Vérifie qu'il n'y a pas d'article avec le titre donné
            const articleDeleted = await articleRepository.getArticleByTitle(title);
            assert.deepStrictEqual(articleDeleted, null);
        });


    });

    describe('Tests getArticleByTitle', () => {
        // Test pour vérifier que la méthode retourne un article avec le titre donné
        it('devrait retourner un article avec le titre donné', async () => {
            const title = 'testGetArticleByTitle';
            // création d'un article de test pour le test qui a seulement les champs obligatoires
            const article = {
                titre: title,
                prix_depart: 10,
                prix_vente: 20,
                createdAt: new Date(),
                expires: new Date(),
                couleurs: 'test',
                materiaux: 'test',
                updatedAt: new Date(),
            };

            // on supprime l'article de test si il existe déjà
            if (articleRepository.getArticleByTitle(title)) {
                await articleRepository.deleteArticleByTitle(title);
            }

            // Création d'un article de test pour le test
            await articleRepository.createArticle(article);
            // Vérifie qu'il y a une correspondance stricte entre le titre de l'article retourné et le titre donné
            const articleCreated = await articleRepository.getArticleByTitle(title);
            assert.strictEqual(articleCreated.titre, title);
            // Suppression de l'article de test
            await articleRepository.deleteArticleByTitle(title);
        });
        // Test pour vérifier que la méthode retourne un objet vide en cas d'erreur
        it('devrait retourner un opbjet vide en cas d\'erreur', async () => {
            const title = 'testGetArticleByTitle';
            // Vérifie qu'il y a une correspondance stricte entre l'objet retourné et un objet vide {}
            const article = await articleRepository.getArticleByTitle(title);
            assert.deepStrictEqual(article, null);
        });
    });

    describe('Tests createArticle', () => {
        // Test pour vérifier que la méthode crée un article avec les champs donnés
        it('devrait créer un article avec les champs donnés', async () => {
            const title = 'testCreateArticle';
            // création d'un article de test pour le test qui a seulement les champs obligatoires
            const article = {
                titre: title,
                prix_depart: 10,
                prix_vente: 20,
                createdAt: new Date(),
                expires: new Date(),
                couleurs: 'test',
                materiaux: 'test',
                updatedAt: new Date(),
            };

            // on supprime l'article de test si il existe déjà
            if (articleRepository.getArticleByTitle(title)) {
                await articleRepository.deleteArticleByTitle(title);
            }

            // Création d'un article de test pour le test
            await articleRepository.createArticle(article);
            // Vérifie qu'il y a une correspondance stricte entre le titre de l'article retourné et le titre donné
            const articleCreated = await articleRepository.getArticleByTitle(title);
            assert.strictEqual(articleCreated.titre, title);
            // Suppression de l'article de test
            articleRepository.deleteArticleByTitle(title);
        });
    });

    describe('Tests updateStatusArticle', () => {
        // Test pour vérifier que la méthode met à jour le status d'un article avec l'ID donné
        it('devrait mettre à jour le status d\'un article avec l\'ID donné', async () => {
            // récupération du status de l'article avec l'ID 1
            const statusArticlId1 = (await articleRepository.getArticle(1)).status;

            const id = 1;
            const status = 'testUpdateStatusArticle';
            // Mise à jour du status de l'article
            await articleRepository.updateStatutArticle(id, status);
            // Vérifie qu'il y a une correspondance stricte entre le status de l'article retourné et le status donné
            const article = await articleRepository.getArticle(id);
            assert.strictEqual(article.status, status);
            // on rétablit le status de l'article
            await articleRepository.updateStatutArticle(id, statusArticlId1);
        });
    });


});