const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('id', () => {
      it('Debería arrojar un error si el id es nulo', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un id válido.', () => {
        Recipe.create({ id: '89rct5ac2-8493-49b0-95d8-de843d90e6ca'});
      });
    });
    describe('name', () => {
      it('Debería arrojar un error si el nombre es nulo', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un nombre válido.', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
    describe('summary', () => {
      it('Debería arrojar un error si el summary es nulo', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un summary válido.', () => {
        Recipe.create({ summary: 'Una delicia' });
      });
    });
    describe('score', () => {
      it('Debería arrojar un error si el score es un string', (done) => {
        Recipe.create({ score: "100"})
          .then(() => done(new Error('Score is a FLOAT number')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un score válido.', () => {
        Recipe.create({ score: 100 });
      });
    });
    describe('healthScore', () => {
      it('Debería arrojar un error si el healthScore es un string', (done) => {
        Recipe.create({ score: "100"})
          .then(() => done(new Error('Score is a FLOAT number')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un healthScore válido.', () => {
        Recipe.create({ healthScore: 100 });
      });
    });
  });
});
