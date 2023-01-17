const assert = require('assert').strict;
const ImageRepository = require('../image.repository');

describe('Tests ImageRepository', () => {
    describe('Tests getArticleImagesByArticleId', () => {
        it('devrait retourner un tableau d\'images dont les images ont l\id de l\'article donné', async () => {
            const articleId = 1;
            const images = await ImageRepository.getArticleImagesByArticleId(articleId);
            
            assert(Array.isArray(images), true);
            images.forEach(image => {
                assert.deepEqual(image.articleId, articleId);
            });
        });

        it('devrait retourner un tableau vide si aucune image n\'est trouvée pour l\'id donné', async () => {
            const articleId = -1;
            const images = await ImageRepository.getArticleImagesByArticleId(articleId);
            assert.deepEqual(images.length, 0);
            
            
        });
    });
});