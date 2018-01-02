# Node.js SDK for put.io API

[![Greenkeeper badge](https://badges.greenkeeper.io/alexandrusavin/nodejs-putiosdk.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/alexandrusavin/nodejs-putiosdk.svg?branch=master)](https://travis-ci.org/alexandrusavin/nodejs-putiosdk)

## Rationale

This is yet another put.io sdk. The reason behind it is learning and having a groundwork for a node.js version of put.io
synchronisation client.

## Install

```
npm install --save putiosdk
```

## Examples

### Loading the client

```javascript

const Client = require('putiosdk');

putioClient = new Client('oauth_token');

```

### Directory listing

```javascript
putioClient.file.list({parent_id: 123456}, (err, result) => {
    console.log(result.files);
});
```

### Get file's properties

```javascript
putioClient.file.get({file_id: 123456}, (err, result) => {
    console.log(result.files);
});
```

### Download file

```javascript
client.file.download({file_id: 123456})
    .pipe(fs.createWriteStream('/path/to/download/folder/' + 'file.name'));
```

## Still to do

... a lot :). Tests are missing and the implementation is done only for accessing files API. Transfers, Zips, Friends,
Account API access is still missing but should come soon. 

Please consider it very Alpha and also please share your feedback if any.

## License

The MIT License (MIT)
Copyright (c) 2015 Alexandru Savin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.