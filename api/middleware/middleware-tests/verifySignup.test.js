// import des librairies nécessaires au tests de VerifySignup
const assert = require("assert");
const sinon = require('sinon');
const { createUser } = require('../../repository/user.repository');
const userRepository = require('../../repository/user.repository');

const verifySignup = require('../verifySignup');
const authJwt = require('../authJwt');


describe('Tests VerifySignup', () => {

    describe('Tests checkDuplicateLoginOrEmail (middleware)', () => {
        it ('devrait retourner une 400 BAD REQUEST response quand le login est déjà utilisé', () => {
            // creation d'un user de test pour le test
            const user = {
                login: 'testDupLogin',
                nom: "testnom",
                prenom: "testprenom",
                pdp: "testpdp",
                password: "testpassword",
                email: "testDup@email.com",
                nb_strikes: 0,
                roleId: 3,
            };
            // si l'utilisateur existe déjà, on le supprime
            if (userRepository.getUserByLogin(user.login)) {
                userRepository.deleteUserByLogin(user.login);
            }
            // puis on le recrée
            userRepository.createUser(user);

            // création d'un mockRequest
            const mockRequest = {
                body: {
                    login: user.login,
                    nom: user.nom,
                    prenom: user.prenom,
                    pdp: user.pdp,
                    password: user.password,
                    email: user.email+"modif",
                    nb_strikes: user.nb_strikes,
                    roleId: user.roleId,
                }
            };
            // création d'un mockResponse
            const mockResponse = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };

            // appel de la fonction à tester
            verifySignup.checkDuplicateLoginOrEmail(mockRequest, mockResponse);


            // laisser 400ms à la fonction pour s'exécuter
            setTimeout(() => {
                // vérification des résultats
                sinon.assert.calledWith(mockResponse.status, 400);
                sinon.assert.calledWith(mockResponse.send, {message: "Ce login est déjà utilisé"});
            }, 1000);

            
            //assert.strictEqual(mockResponse.send.calledWith({message: "Ce login est déjà utilisé"}), true);

            // suppression de l'utilisateur de test si il existe
            if (userRepository.getUserByLogin(user.login)) {
            userRepository.deleteUserByLogin(user.login);
            }
        });

        it ('devrait retourner une 400 BAD REQUEST response quand l\'email est déjà utilisé', () => {
            // creation d'un user de test pour le test
            const user = {
                login: 'testDupEmail',
                nom: "testnom",
                prenom: "testprenom",
                pdp: "testpdp",
                password: "testpassword",
                email: "testdup@gmail.com",
                nb_strikes: 0,
                roleId: 3,
            };
            // si l'utilisateur existe déjà, on le supprime
            if (userRepository.getUserByLogin(user.login)) {
                userRepository.deleteUserByLogin(user.login);
            }
            // puis on le recrée
            userRepository.createUser(user);

            // création d'un mockRequest
            const mockRequest = {
                body: {
                    login: user.login+"modif",
                    nom: user.nom,
                    prenom: user.prenom,
                    pdp: user.pdp,
                    password: user.password,
                    email: user.email,
                    nb_strikes: user.nb_strikes,
                    roleId: user.roleId,
                }
            };
            // création d'un mockResponse
            const mockResponse = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };

            // appel de la fonction à tester
            verifySignup.checkDuplicateLoginOrEmail(mockRequest, mockResponse);
            // laisser 400ms à la fonction pour s'exécuter
            setTimeout(() => {
                // vérification des résultats
                sinon.assert.calledWith(mockResponse.status, 400);
                sinon.assert.calledWith(mockResponse.send, {message: "Failed! Email is already in use!"});
            }, 1000);

            
            

            // suppression de l'utilisateur de test si il existe
            if (userRepository.getUserByLogin(user.login)) {
            userRepository.deleteUserByLogin(user.login);
            }
        });

    });

    describe('Tests checkRolesExisted (middleware)', () => {
        it ('devrait retourner une 400 BAD REQUEST response quand le role n\'existe pas', () => {
            // création d'un mockRequest
            const mockRequest = {
                body: {
                    roles: ["testrole"],
                }
            };
            // création d'un mockResponse
            const mockResponse = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };

            // appel de la fonction à tester
            verifySignup.checkRoleExists(mockRequest, mockResponse);

            // laisser 400ms à la fonction pour s'exécuter
            setTimeout(() => {
                // vérification des résultats
                sinon.assert.calledWith(mockResponse.status, 400);
                sinon.assert.calledWith(mockResponse.send, {message: "Failed! Role does not exist"});
            }, 1000);

            
        });
    });



});


const db = require("../../config/db.config").connect();
