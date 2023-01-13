const { describe } = require('mocha');
const assert = require('assert').strict;
const EnchereRepository = require('../enchere.repository');

// Décrire la classe à tester
describe('Test EnchereRepository', () => {

    describe('Tests getDerniereOffre', () => {
        
        it('Devrait retourner la dernière offre pour un identifiant d\'article donné', async () => {
            const articleId = 1;
            EnchereRepository.getDerniereOffre(articleId).then(enchere => {
                // utiliser l'assertion pour vérifier si les valeurs attendues sont égales aux valeurs retournées
                assert.equal(enchere.articleId, articleId);
            });
        });
        // test pour le cas où l'identifiant de l'article n'est pas trouvé
        it('Devrait retourner un objet vide si l\'identifiant de l\'article n\'est pas trouvé', async () => {
            const articleId = -1;
            EnchereRepository.getDerniereOffre(articleId).then(enchere => {
                assert.deepEqual(enchere,{});
            });
        });
    });
});