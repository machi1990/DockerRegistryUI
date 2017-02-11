const path = require('path'),
      httpProxy = require('http-proxy'),
      express = require('express'),
      app = express(),
      argv = require('minimist')(process.argv.slice(2)),
      public = path.join(__dirname, 'dist');

/*
 * express configuration
 */

app.use(express.static(public));
app.set('port',8080);

/*
 * Http-proxy configurations.
*/
const options = { changeOrigin: true },
    proxy = httpProxy.createProxyServer(options),
    registryAddress = argv.address || 'http://localhost:5000/';

app.all('/v2/*', function (req, res, next) {
    proxy.web(req, res, {target: registryAddress }, function(error) {
        console.error(error);
    });
});

app.listen(app.get('port'), function() {
    console.log('App started');
});
