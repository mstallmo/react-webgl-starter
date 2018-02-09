import express from 'express';
import path from 'path';

/*eslint-disable no-console*/

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Listening on ${ port }`));