const returnHtmlContent = require('./contentService');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const queryString = require('queryString');
const dbName = 'users';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer((request, response) => {
  console.log('server ready!');
  const { headers, method, url, data } = request;

  let query = {};
  let result;
  let body = [];

  if (method == 'POST') {
    request
      .on('error', (error) => {
        console.log('OMG here is a error! --->', error);
        return;
      })
      .on('data', (dataChunk) => {
        body.push(dataChunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        query = queryString.parse(body);
        console.log('query => ', query);
      });

    client
      .connect()
      .then(async () => {
        const dataBase = client.db(dbName);
        const collection = dataBase.collection('users');

        collection.insertOne(query);
        result = await collection.find({}).toArray();
      })
      .then(async () => {
        console.log('result *****>', result);
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.write(returnHtmlContent(result));
        response.end();
      })
      .catch((error) => {
        response.statusCode = 401;
        client.close();
      });
  } else if (method === 'GET') {
    client
      .connect()
      .then(async () => {
        const dataBase = client.db(dbName);
        const collection = dataBase.collection('users');
        result = await collection.find({}).toArray();
      })
      .then(async () => {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.write(returnHtmlContent(result));
        response.end();
      })
      .catch((error) => {
        response.statusCode = 401;
        client.close();
      });
  }
});

server.listen(4000, () => {
  console.log('server runing and listening requests on port 4000!');
});
