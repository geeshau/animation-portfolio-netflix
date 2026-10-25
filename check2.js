const fs = require('fs');
const log = fs.readFileSync('build2.log', 'utf8');
if (log.includes('Route') && !log.includes('Error')) {
  console.log('BUILD_OK');
} else {
  console.log('BUILD_BAD');
}
