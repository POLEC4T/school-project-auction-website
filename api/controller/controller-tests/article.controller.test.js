const { describe } = require('mocha');
const assert = require('assert').strict;
const ArticleController = require('../article.controller');
const sinon = require('sinon');

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const ArticleRepository = require('../../repository/article.repository');

describe('Test ArticleController', () => {
    describe('Tests getArticle', () => {
        it('devrait retourner un article avec l\'ID donné et une 200 OK response ', async () => {

            // On crée une instance d'express
            const app = express();
            // On monte la route sur l'instance d'express
            app.use("/api/article/:id", ArticleController.getArticle);

            // initialise la requête et la réponse, ce sont les arguments de la méthode getArticle
            const req = {
                params : {
                    id: 1
                }
            };
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/article/:id
            const reponse = await request(app).get("/api/article/" + req.params.id, ArticleController.getArticle(req, res));

            // TESTS UNITAIRES
            // vérifie que la réponse.statusCode est 200
            expect(reponse.statusCode).to.equal(200);
            // vérifie que la réponse.body est un {}
            expect(reponse.body).to.be.an('object');
            // vérifie que la réponse.body est un article avec l'id 1
            expect(reponse.body.id).to.equal(1);
        });

        it('devrait retourner une 404 NOT FOUND response quand aucun article n\'est trouvé', async () => {
            // stub le getArticle de REPOSITORY pour qu'il retourne null
            const ArticleControllerStub = sinon.stub(ArticleRepository, "getArticle").resolves(null);

            const app = express();
            app.use("/api/article/", ArticleController.getArticle);

            const req = {
                params : {
                    id:1,
                },
            };
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            const reponse = await request(app).get("/api/article/", ArticleController.getArticle(req, res));
            // on vérifie que le status code est 404
            expect(reponse.statusCode).to.equal(404);
            // on vérfie que le message est Article non trouvé
            expect(reponse.body.message).to.equal("Article non trouvé");
            // on restaure le stub sinon pour éviter les effets de bord
            ArticleControllerStub.restore();
        });
    
    });

    describe('Tests getNbLikeArticle', () => {

        it ('devrait retourner le nombre de like d\'un article avec l\'ID donné et une 200 OK response', async () => {
            // On crée un stub pour la méthode getNbLikeArticle
            sandbox = sinon.createSandbox();
            // On crée une instance d'express
            const app = express();
            // On monte la route sur l'instance d'express
            app.use("/api/article/:id/like", ArticleController.getNbLikeArticle);
            const req = {
                params : {
                    id: 1
                }
            };
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };
            
        
            // reponse est une promesse qui contient la réponse de la requête GET sur la route /api/article/:id
            const reponse = await request(app).get("/api/article/" + req.params.id + "/like", ArticleController.getNbLikeArticle(req, res));
            // vérifie que la réponse.statusCode est 200
            expect(reponse.statusCode).to.equal(200);
            // vérifie que la réponse.body est un {}
            expect(reponse.body).to.be.an('object');
            // vérifie que la réponse.body est un article avec l'id 1
            expect(reponse.body.nb).to.equal(3);
            // on restaure le sandbox sinon pour éviter les effets de bord

            sandbox.restore();



        });

        it ('devrait retourner une 404 NOT FOUND response quand aucun article n\'est trouvé', async () => {

            // stub le getNbLikeArticle de REPOSITORY pour qu'il retourne null
            const ArticleControllerStub = sinon.stub(ArticleRepository, "getNbLikeArticle").resolves(null);

            const app = express();
            app.use("/api/article/", ArticleController.getNbLikeArticle);

            const req = {
                params : {
                    id:1,
                },
            };
            const res = {
                status: sinon.stub().returns({ send: sinon.stub() }),
            };

            const reponse = await request(app).get("/api/article/" + req.params.id + "/like", ArticleController.getNbLikeArticle(req, res));
            // on vérifie que le status code est 404
            expect(reponse.statusCode).to.equal(404);
            // on vérfie que le message est Article non trouvé
            expect(reponse.body.message).to.equal("Article non trouvé");
            // on restaure le stub sinon pour éviter les effets de bord
            ArticleControllerStub.restore();

        });
    });
});


