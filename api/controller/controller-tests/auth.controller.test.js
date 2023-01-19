
// const chai = require('chai');
// const expect = chai.expect;
// const request = require('supertest');
// const express = require('express');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);
// const AuthController = require("../auth.controller");
// const { verifySignUp, rateLimit } = require("../../middleware");

// const AuthRepository = require("../../repository/user.repository");
// const { response } = require('express');


// describe('Tests AuthController', () => {
//     describe('Tests signup', () => {
//         it('devrait retourner une 200 OK response quand un utilisateur est trouvé', async () => {
//             // On crée un stub pour la méthode signup
//             sandbox = sinon.createSandbox();

//             // on supprime l'utilisateur créé pour le test si il existe
//             if (await AuthRepository.getUserByLogin('testUserAuthController')) {
//                 console.log('suppression de l\'utilisateur testUserAuthController avant le test');
//                 await AuthRepository.deleteUserByLogin('testUserAuthController');
//             }

//             // vérifi que l'utilisateur n'existe pas
//             expect(await AuthRepository.getUserByLogin('testUserAuthController')).to.be.null;
            

//             // On crée une instance d'express
//             const app = express();
//             // On monte la route sur l'instance d'express
//             app.use("/api/auth/signup", AuthController.signup);

//             const req = {
//                 params: {
//                     login: 'testUserAuthController',
//                     email: 'testEmail@gm.fr',
//                     password: 'testMotDePasse',
//                     role_id: 2,
//                 }
//             };
//             const res = {
//                 status: sinon.stub().returns({ send: sinon.stub() }),
//             };
            
        
//             // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/auth/signup 
//             const reponse = await request(app).post("/api/auth/signup",
//             // [
//             //     verifySignUp.checkDuplicateLoginOrEmail,
//             //     verifySignUp.checkRoleExists,
//             //     rateLimit.loginRateLimiter
//             // ],b
//             AuthController.signup(req, res));
            
//             // vérifie que la réponse.statusCode est 200
//             reponse && expect(reponse.statusCode).to.equal(200);
//             // vérifie que la réponse.body est un utilisateur
//             expect(reponse.body).to.be.an('object');
//             // vérifie que la réponse.body contient un login
            
            
            

            

//             // // on vérifie que l'utilisateur a bien été créé
//             // const user = await AuthRepository.getUserByLogin('testUserAuthController');
//             // // on vérifie le login de l'utilisateur créé
//             // expect(user.login).to.equal('testUserAuthController');
            

            


//             // on supprime l'utilisateur créé pour le test si il existe et on affiche un message de confirmation
            

//             await AuthRepository.getUserByLogin('testUserAuthController') ? 
//             await AuthRepository.deleteUserByLogin('testUserAuthController') : null;
//             console.log('suppression de l\'utilisateur testUserAuthController après le test');
            
//             // on restaure le sandbox sinon pour éviter les effets de bord
//             sandbox.restore();

//         });

//         // it('devrait retourner une 404 NOT FOUND response quand aucun utilisateur n\'est trouvé', async (done) => {

//         //     // stub le signup de REPOSITORY pour qu'il retourne null
//         //     const AuthControllerStub = sinon.stub(AuthRepository, "createUser").resolves(null);

//         //     // on supprime l'utilisateur créé pour le test si il existe
//         //     if (await AuthRepository.getUserByLogin('testUserAuthController')) {
//         //         await AuthRepository.deleteUserByLogin('testUserAuthController');
//         //     }

//         //     const app = express();
//         //     app.use("/api/auth/signup", AuthController.signup);

//         //     const req = {
//         //         body: {
//         //             login: 'testUserAuthController',
//         //             email: 'testEmail@gm.fr',
//         //             password: 'testMotDePasse',
//         //             roleId: 2,
//         //         }
//         //     };
//         //     const res = {
//         //         status: sinon.stub().returns({ send: sinon.stub() }),
//         //     };
            
        
//         //     // // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/auth/signup
//         //     // const reponse = await request(app).get("/api/auth/signup", AuthController.signup(req, res));
            
//         //     // // vérifie que la réponse.statusCode est 404
//         //     // expect(reponse.statusCode).to.equal(404);
//         //     // // vérifie que la réponse.body est un message d'erreur
//         //     // expect(reponse.body).to.be.an('object');   

            


//         //     request(app)
//         //     .post("/api/auth/signup")
//         //     .send({
//         //         login: 'testUserAuthController',
//         //         email: 'testEmail@gm.fr',
//         //         password: 'testMotDePasse',
//         //         roleId: 2,
//         //     })
//         //     .expect(404)
//         //     .end((err, res) => {
//         //       if (err) return done(err);
//         //       done();
//         //     });

//         //     // on supprime l'utilisateur créé pour le test si il existe
//         //     if (await AuthRepository.getUserByLogin('testUserAuthController')) {
//         //         await AuthRepository.deleteUserByLogin('testUserAuthController');
//         //     }
            
//         //     // on restaure le sandbox sinon pour éviter les effets de bord
//         //     AuthControllerStub.restore();

//         // });
//     });

//     // describe('Tests signin', () => {
//     //     it('devrait retourner un utilisateur quand il existe', async () => {

//     //         // on supprime l'utilisateur créé pour le test si il existe
//     //         if (await AuthRepository.getUserByLogin('testUserAuthController')) {
//     //             await AuthRepository.deleteUserByLogin('testUserAuthController');
//     //         }

//     //         // on crée un utilisateur pour le test
//     //         await AuthRepository.createUser({
//     //             login: 'testUserAuthController',
//     //             email: 'testEmail@gm.fr',
//     //             password: 'testMotDePasse',
//     //             roleId: 2,
//     //         });

//     //         // on crée une instance d'express
//     //         const app = express();
//     //         // on monte la route sur l'instance d'express
//     //         app.use("/api/auth/signin", AuthController.signin);

//     //         // on crée un objet req
//     //         const req = {
//     //             body: {
//     //                 login: 'testUserAuthController',
//     //                 email: 'testEmail@gm.fr',
//     //                 password: 'testMotDePasse',
//     //                 roleId: 2
//     //             }
//     //         };
//     //         // on crée un objet res
//     //         const res = {
//     //             status: sinon.stub().returns({ send: sinon.stub() }),
//     //         };

//     //         // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/auth/signin
//     //         const reponse = await request(app).post("/api/auth/signin", AuthController.signin(req, res));

//     //         // vérifie que la réponse.statusCode est 200
//     //         expect(reponse.statusCode).to.equal(200);
//     //         // vérifie que la réponse.body est un utilisateur
//     //         expect(reponse.body).to.be.an('object');
            
//     //         // on supprime l'utilisateur créé pour le test si il existe
//     //         if (await AuthRepository.getUserByLogin('testUserAuthController')) {
//     //             await AuthRepository.deleteUserByLogin('testUserAuthController');
//     //         }

//     //     });
//     // });


            

// });
