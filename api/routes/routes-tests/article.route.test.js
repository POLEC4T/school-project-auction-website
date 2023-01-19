const assert = require('assert');
const request = require('supertest');
const app = require('../app');

const articleRepository = require('../../repository/article.repository');

describe('Tests ArticleRoute', () => {
  it('should return the correct article images by id', (done) => {
    request(app)
      .get('/api/article/1/images')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.images, 'Images should be returned');
        done();
      });
  });

  it('should return the correct number of likes for an article', (done) => {
    request(app)
      .get('/api/article/1/likes')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.likes, 'Likes should be returned');
        done();
      });
  });

  it('should return the correct article by id', (done) => {
    request(app)
      .get('/api/article/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.article, 'Article should be returned');
        done();
      });
  });

  it('should create a new article', (done) => {
    request(app)
      .post('/api/article')
      .send({ title: 'Test article', description: 'Test description' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.article, 'New article should be returned');
        done();
      });

      
  });

  it('should update the statut of an article', (done) => {
    request(app)
      .put('/api/article/1/statut')
      .send({ statut: 'published' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.statut, 'Statut should be updated');
        done();
      });
  });

  it('should update the date of delivery of an article', (done) => {
    request(app)
      .put('/api/article/1/dateLivraison')
      .send({ dateLivraison: '2022-12-31' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.dateLivraison, 'Date of delivery should be updated');
        done();
      });
  });
});