
const chai = require('chai');
const expect = chai.expect;
const jwt = require("jsonwebtoken");
const secret = require("../../auth/secret");

//const db = require("../config/db.config").connect();
const authJwt = require('../authJwt');
const sinon = require('sinon');
const { createUser } = require('../../repository/user.repository');
const userRepository = require('../../repository/user.repository');

// import de express
const express = require('express');
// import de supertest
const request = require('supertest');

const assert = require("assert");


describe('Tests authJwt', () => {
    describe('Tests verifyToken (middleware)', () => {
        it('devrait retourner une 403 FORBIDDEN response quand aucun token n\'est fourni', () => {
            const req = {
                headers: {
                    authorization: ''
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            authJwt.verifyToken(req, res);

            sinon.assert.calledWith(res.status, 403);
            sinon.assert.calledWith(res.send, { message: "Pas de token fourni" });

            
        });
        it('devrait retourner une 401 UNAUTHORIZED response quand le token n\'est pas valide', () => {
            const req = {
                headers: {
                    authorization: 'Bearer ' + jwt.sign({ id: 1 }, 'wrong_secret')
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            authJwt.verifyToken(req, res);

            sinon.assert.calledWith(res.status, 401);
            sinon.assert.calledWith(res.send, { message: "token non valide !" });
        });
        it('devrait appeler next le token est valide', () => {
            const req = {
                headers: {
                    authorization: 'Bearer ' + jwt.sign({ id: 1 }, secret)
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };

            // on crée une fonction next qui est stubbed 
            const next = sinon.stub();

            authJwt.verifyToken(req, res, next);

            // on vérifie que next a bien été appelé
            sinon.assert.calledOnce(next);
        });
    });

    describe('Tests isAdmin (middleware)', () => {
        it('devrait retourner une 403 FORBIDDEN response quand le user n\'est pas admin', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:1
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            authJwt.isAdmin(req, res);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledWith(res.status, 403);
                sinon.assert.calledWith(res.send, { message: "Vous n'avez pas le rôle admin" });
            }, 400);
        });

        it('devrait appeler next quand le user est admin', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:15
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            const next = sinon.stub();
            authJwt.isAdmin(req, res, next);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledOnce(next);
            }, 400);
        });
    });

    describe('Tests isAcheteur (middleware)', () => {
        it('devrait retourner une 403 FORBIDDEN response quand le user n\'est pas acheteur', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:1
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            authJwt.isAcheteur(req, res);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledWith(res.status, 403);
                sinon.assert.calledWith(res.send, { message: "Vous n'avez pas le rôle acheteur" });
            }, 400);
        });

        it('devrait appeler next quand le user est acheteur', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:12,
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            const next = sinon.stub();
            authJwt.isAcheteur(req, res, next);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledOnce(next);
            }, 400);
        });
    });

    describe('Tests isVendeur (middleware)', () => {
        it('devrait retourner une 403 FORBIDDEN response quand le user n\'est pas vendeur', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:15
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            authJwt.isVendeur(req, res);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledWith(res.status, 403);
                sinon.assert.calledWith(res.send, { message: "Vous n'avez pas le rôle vendeur" });
            }, 400);
        });

        it('devrait appeler next quand le user est vendeur', () => {
            const req = {
                headers: {
                    authorization: ''
                },
                userId:1,
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy(),
            };
            const next = sinon.stub();
            authJwt.isVendeur(req, res, next);
            // on laisse 400ms pour que la requête soit effectuée
            setTimeout(() => {
                sinon.assert.calledOnce(next);
            }, 400);
        });
    });

});




