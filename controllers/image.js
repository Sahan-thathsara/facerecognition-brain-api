const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey : '30d703484768470995a997cf51b7ed77'
});

const handleApiCall = (req, res) => {
  app.models
    .predict('30d703484768470995a997cf51b7ed77', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}