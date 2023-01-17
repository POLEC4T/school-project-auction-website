const assert = require('assert').strict;
const RoleRepository = require('../role.repository');

describe('Tests RoleRepository', () => {
    describe('Tests getRoles', () => {
        it('devrait récupérer tous les rôles', async () => {
            const roles = await RoleRepository.getRoles();
            assert.strictEqual(Array.isArray(roles), true, 'La méthode getRoles() ne retourne pas un tableau');
        });
    });
    describe('Tests getRoleById', () => {
        it('devrait retourner un rôle pour un id donné', async () => {
            const id = 1;
            const role = await RoleRepository.getRoleById(id);
            assert.strictEqual(typeof role, 'object', 'La méthode getRoleById() ne retourne pas un objet');
            assert.equal(role.id, id);
            
            
        });
        it('devrait retourner un objet vide si aucun rôle n\'est trouvé pour l\'id donné', async () => {
            const id = -1;
            const role = RoleRepository.getRoleById(id);
            assert.equal(Object.keys(role).length, 0);
                        
        });
    });
});