const express = require('express');
const server = express();

server.use(express.static(__dirname + '/public'));

server.get('/robots.txt', function (req, res) {
    var robots = `User-agent: *\n`;
    robots += `Disallow: `;
    
    res.type('text/plain');
    res.send(robots);
});

server.get('/favicon.ico', (req, res, next) => {
	return res.sendFile(__dirname + '/public/favicon.ico');
});

// catch 404 and forward to error handler
server.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
server.use((err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
        
	res.status(err.status || 500).json({
		message: err.message,
	});
});

server.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => console.log('Team Modernator Official Website Server listening on port 5300'));
