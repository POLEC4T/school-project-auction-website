





const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const accueilController = require("../accueil.controller");

const accueilRepository = require("../../repository/accueil.repository");


describe('Tests TodoController', () => {
        
    
    describe('Tests getArticlesWithLeastTimeLeft', () => {
        it('devrait retourner une 200 OK response quand des articles sont trouvés', async () => {
            // On crée un stub pour la méthode getArticlesWithLeastTimeLeft
            sandbox = sinon.createSandbox();
            // On crée une instance d'express
            const app = express();
            // On monte la route sur l'instance d'express
            app.use("/api/accueil/leasttimeleft", accueilController.getArticlesWithLeastTimeLeft);

            
            // initialise la requête et la réponse pour la route
            const req = {};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };
            
        
            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/accueil/leasttimeleft
            const reponse = await request(app).get("/api/accueil/leasttimeleft", accueilController.getArticlesWithLeastTimeLeft(req, res));
            
            // vérifie que la réponse.statusCode est 200
            expect(reponse.statusCode).to.equal(200);
            // vérifie que la réponse.body est une liste d'articles
            expect(reponse.body).to.be.an('array');   
            
            // on restaure le sandbox sinon pour éviter les effets de bord
            sandbox.restore();

        });
        //  
        it('devrait retourner une 404 NOT FOUND response quand aucun article n\'est trouvé', async () => {

            // stub le getArticlesWithLeastTimeLeft de REPOSITORY pour qu'il retourne null
            const accueilControllerStub = sinon.stub(accueilRepository, "getArticlesWithLeastTimeLeft").resolves(null);

            const app = express();
            app.use("/api/accueil/leasttimeleft", accueilController.getArticlesWithLeastTimeLeft);

        
            const req = {};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            const response = await request(app).get("/api/accueil/leasttimeleft", accueilController.getArticlesWithLeastTimeLeft(req, res));
            // vérifie que la méthode getArticlesWithLeastTimeLeft a été appelée une fois
            expect(response.statusCode).to.equal(404);
            // vérifie que la réponse.body contient un message "Aucun article trouvé"
            expect(response.body.message).to.equal("Aucun article trouvé");
            // on restaure le stub sinon pour éviter les effets de bord
            accueilControllerStub.restore();
        });
    });
});