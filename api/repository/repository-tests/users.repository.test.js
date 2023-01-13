const assert = require('assert').strict;
const UserRepository = require('../user.repository');

describe('Tests UserRepository', () => {

    describe('Tests getUsers', () => {
        it('devrait renvoyer un tableau d\'utilisateurs', async () => {
            UserRepository.getUsers().then(users => {
                assert.ok(Array.isArray(users), 'La valeur renvoyée n\'est pas un tableau');
            });
        });
    });

    describe('Tests getUserByLogin', () => {
        it('devrait renvoyer un objet avec un utilisateur correspondant au login fourni', async () => {
            UserRepository.getUserByLogin('nathan').then(user => {
                assert.ok(typeof user === 'object', 'La valeur renvoyée n\'est pas un objet');
                assert.strictEqual(user.login, 'nathan', 'L\'utilisateur ne correspond pas au login fourni');
            });
            
        });
    });

    describe('Tests getUserById', () => {
        it('devrait renvoyer un objet avec un utilisateur correspondant à l\'id fourni', async () => {
            UserRepository.getUserById(1).then(user => {
                assert.ok(typeof user === 'object', 'La valeur renvoyée n\'est pas un objet');
                assert.strictEqual(user.id, 1, 'L\'utilisateur ne correspond pas à l\'id fourni');
            });
            
        });
    });
});