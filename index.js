const http = require('http');
const { planets, heroes } = require('./data')
const server = http.createServer();
const PORT = 3000;

server.on('request', (req, res) => {
    const urlSplits = req.url.split('/');
    switch (urlSplits[1]) {
        case '':
            res.end('Welcome to my web server');
            break;
        case 'heroes':
            res.writeHead(200, {'Content-Type': 'application/html'});
            if(urlSplits.length == 3 && urlSplits[2].length > 0){
                const myid1 = urlSplits[2];
                const tmpHero = heroes.filter(({id}) => id === +myid1);
                res.end(JSON.stringify(tmpHero));
            }
            else if (urlSplits.length == 4 && urlSplits[2] === 'origin') {
                const myorigin = urlSplits[3];
                const tmpHero = heroes.filter(({origin}) => origin === myorigin);
                res.end(JSON.stringify(tmpHero));
            }
            else {
                res.end(JSON.stringify(heroes));
            }
            break;
        case 'message':
            res.setHeader('Content-Type', 'text/html');
            res.end('<ul><li>Hello 1</li><li>Hello 2</li></ul>');
            break;
        default:
            res.statusCode = 404;
            res.end('Not found');
            break;
    }
});

server.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});