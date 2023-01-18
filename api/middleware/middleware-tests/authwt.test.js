// import des librairies necessaires pour les tests
const chai = require('chai');
const expect = chai.expect;

const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const authJwt = require('../authJwt');


describe('Tests authJwt', () => {
    describe('Tests verifyToken', () => {
        it('devrait retourner une 200 OK response quand le token est valide', async () => {
            // On crée un stub pour la méthode verifyToken
            const authJwtStub = sinon.stub(authJwt, "verifyToken").resolves(true);
            // On crée une instance d'express
            const app = express();
            // On monte la route sur l'instance d'express
            app.use("/api/test", authJwt.verifyToken, authJwt.isAdmin, authJwt.isAdmin);

            // initialise la requête et la réponse pour la route
            const req = {};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/test
            const reponse = await request(app).get("/api/test", authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator(req, res));

            // vérifie que la réponse.statusCode est 200
            expect(reponse.statusCode).to.equal(200);
            // vérifie que la réponse.body est un objet
            expect(reponse.body).to.be.an('object');
            // vérifie que la réponse.body contient un message
            expect(reponse.body).to.have.property('message');

            // on restaure le stub sinon pour éviter les effets de bord
            authJwtStub.restore();

        });
        //  
        it('devrait retourner une 403 FORBIDDEN response quand le token n\'est pas valide', async () => {
            // stub le verifyToken pour qu'il retourne false
            const authJwtStub = sinon.stub(authJwt, "verifyToken").resolves(false);

            const app = express();
            app.use("/api/test", authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator);

            const req = {};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            const reponse = await request(app).get("/api/test", authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator(req, res));

            expect(reponse.statusCode).to.equal(403);
            expect(reponse.body).to.be.an('object');
            expect(reponse.body).to.have.property('message');

            authJwtStub.restore();

        });
    });
});

