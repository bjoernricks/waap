const app = require('express')();
const proxy = require('express-http-proxy');
const options = require('commander');

options
  .version('1.0')
  .option('-p, --port <port>', 'Port to listen to (default: 3689)', Number,
    3689)
  .option('-f, --forward <address>', 'Address to forward requests to')
  .option('-a, --allow <client url>', 'Client url to allow CORS request from',
    '*')
  .option('-v, --verbose', 'Verbose output')
  .parse(process.argv);

if (!options.forward) {
  console.error('Please specify an address to forward requests to');
  process.exit(1);
}

app.use(proxy(options.forward, {
  intercept: function(rsp, data, req, res, cb) {
    res.set('Access-Control-Allow-Origin', options.allow);
    res.set('Access-Control-Allow-Credentials', 'true');
    if (options.verbose) {
      console.log('response is', rsp.statusCode);
    }
    cb(null /* error */, data);
  },
  decorateRequest: function(proxy_req, orig_req) {
    if (options.verbose) {
      console.log('poxy', orig_req.method, 'request to', orig_req.url);
    }
    return proxy_req;
  },
  filter: function(req, res) {
    return req.method === 'GET' || req.method === 'POST';
  },
}));

app.options('*', function (req, res) {
  res.set('Access-Control-Allow-Origin', options.allow);
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.set('Access-Control-Allow-Headers',
    req.get('Access-Control-Request-Headers'));

  if (options.verbose) {
    console.log('Creating response to preflight request');
  }
  res.send();
})

console.log('Starting proxy on 127.0.0.1:' + options.port);

app.listen(options.port, '127.0.0.1');

// vim: set ts=2 sw=2 tw=80:
