const express = require('express');

const app = express();

app.use(express.static('./dist/RDF-transformer'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/RDF-transformer/'}),
);

app.listen(process.env.PORT || 8080);