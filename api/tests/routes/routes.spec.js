/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, conn } = require('../../src/db.js');

const agent = session(app);

const diet = {
  name: "Gluten free"
}

describe('Diet route', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Diet.sync({ force: true })
    .then(() => Diet.create(diet)));
  describe('GET /types', () => {
    it('Responde estado 200', () =>
      agent.get('/types').expect(200)
    );
  });
});


describe('GET /recipes/:id', () => {
  it('Responde estado 200', () => {
    return agent.get('/recipes/70321')
      .then(res => {
        expect(res.status).to.equal(200)
      })
  });
  it('Espera el titulo de la receta que se busca por ID', () => {
    return agent.get("/recipes/70321")
      .then(res => {
        expect(res.body.name).to.equal('Apple Pie Oatmeal Parfait')
      })
  })
});