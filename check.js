const fs = require('fs');
const log = fs.readFileSync('e:/Documents/Coding Projects/animation-portfolio-netflix/build2.log', 'utf8');
console.log(log.includes('Route'), log.includes('Error'));
console.log((log.match(/Generating static pages/g)||[]).length);
