const assert = require('assert').strict;
const ImageRepository = require('../image.repository');

describe('Tests ImageRepository', () => {
    describe('Tests getArticleImagesByArticleId', () => {
        it('devrait retourner un tableau d\'images pour un id donné', async () => {
            const articleId = 1;
            ImageRepository.getArticleImagesByArticleId(articleId).then(images => {
                assert(Array.isArray(images), true);
                images.forEach(image => {
                    assert.deepEqual(image.articleId, articleId);
                });
            });
            
        });
        it('devrait retourner un tableau vide si aucune image n\'est trouvée pour l\'id donné', async () => {
            const articleId = -1;
            ImageRepository.getArticleImagesByArticleId(articleId).then(image => {
                assert.deepEqual(images.length, 0);
            });
            
        });
    });
});