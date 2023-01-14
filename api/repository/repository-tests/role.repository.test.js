const assert = require('assert').strict;
const RoleRepository = require('../role.repository');

describe('Tests RoleRepository', () => {
    describe('Tests getRoles', () => {
        it('devrait retourner un tableau de tous les rôles', async () => {
            RoleRepository.getRoles().then(roles => {
                assert(Array.isArray(roles), true);
            });
            
        });
    });
    describe('Tests getRoleById', () => {
        it('devrait retourner un rôle pour un id donné', async () => {
            const id = 1;
            RoleRepository.getRoleById(id).then(roles => {
                assert.equal(role.id, id);
            });
            
        });
        it('devrait retourner un objet vide si aucun rôle n\'est trouvé pour l\'id donné', async () => {
            const id = -1;
            RoleRepository.getRoleById(id).then(roles => {
                assert.equal(Object.keys(role).length, 0);
            });
            
        });
    });
});