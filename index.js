const express = require('express');
const server = express();
const port = 3000;

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

server.get('/:language?', (req, res) => {
	let { language = 'ko' } = req.params;
	
	switch (language) {
		case 'ko':
		case 'en':
			break;
		default:
			language = 'en';
			break;
	}

	res.sendFile(`${__dirname}/public/index_${language}.html`);
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

server.listen(port, () => console.log('Team Modernator Official Website Server listening on port ' + port));
