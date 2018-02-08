# Api proxy manager

This package provides ability to create and store REST API proxies.

API Proxy is an object which can relay the Express request to the given API
and forward the response from API to the client as an Express response.

The purpose of the API Proxy is to manage the API authentication 
on the backend side of the Highpine. 

## AbstractApiProxy

Represents the basic API proxy model.

Example usage:

```
let proxy = new AbstractApiProxy(
    'http://example.com/rest/api/', // service ulr
    '/api/proxy/example' // mount path
);

app.use('/api/proxy/example', function(req, res, next) {
    proxy.relay(req, function(error, apiResponse, apiResponseBody) {
        if (error) {
            return next(error);
        }
        res.statusCode = apiResponse.statusCode;
        res.append('Content-Type', apiResponse.headers['content-type']);
        let body = typeof apiResponseBody === 'object' ? JSON.stringify(apiResponseBody) : apiResponseBody;
        res.end(body);
    });
});
```

## ApiProxyRegistry

Represents the API proxy registry, which allows to store authorized proxies instances per token.
Also allows to store anonymous proxy instance.