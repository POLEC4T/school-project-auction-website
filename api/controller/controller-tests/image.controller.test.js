const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const imageController = require("../image.controller");

const imageRepository = require("../../repository/image.repository");

describe ('Tests ImageController', () => {
    describe('Tests getArticleImagesByArticleId', () => {
        it('devrait retourner une 200 OK response quand une image est trouvée', async () => {


            // on simule le retour de la méthode getArticleImagesByArticleId de imageRepository pour qu'elle retourne une image
            // const imageControllerStub = sinon.stub(imageRepository, "getArticleImagesByArticleId").resolves({id: 1, articleId: 1, url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"});
            
            // On crée une instance d'express
            const app = express();
            // On monte la route sur l'instance d'express
            app.use("/api/image/:id", imageController.getArticleImagesByArticleId);
            

            // initialise la requête et la réponse pour la route
            const req = {params: {id: 1}};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };
            
            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/image/:id
            const reponse = await request(app).get("/api/image/" + req.params.id, imageController.getArticleImagesByArticleId(req, res));
            
            // vérifie que la réponse.statusCode est 200
            expect(reponse.statusCode).to.equal(200);
            // vérifie que la réponse.body est une liste d'images
            expect(reponse.body).to.be.an('array');

        });
        //  
        it('devrait retourner une 404 NOT FOUND response quand aucune image n\'est trouvée', async () => {

            // stub le getArticleImagesByArticleId de REPOSITORY pour qu'il retourne null
            const imageControllerStub = sinon.stub(imageRepository, "getArticleImagesByArticleId").resolves(null);
            
            

            const app = express();
            app.use("/api/image/:id", imageController.getArticleImagesByArticleId);

            // initialise la requête et la réponse pour la route
            const req = {params: {id: 1}};
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };
            
            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/image/:id
            const reponse = await request(app).get("/api/image/" + req.params.id, imageController.getArticleImagesByArticleId(req, res));
            
            // vérifie que la réponse.statusCode est 404
            expect(reponse.statusCode).to.equal(404);
            // vérifie que la réponse.body est une image
            expect(reponse.body).to.be.an('object');

            // restore le stub
            imageControllerStub.restore();
        });
    });
});
