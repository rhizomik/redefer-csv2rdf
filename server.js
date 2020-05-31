const express = require('express');

const app = express();

app.use(express.static('./dist/rdf-transformer'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/rdf-transformer/'}),
);

app.listen(process.env.PORT || 8080);