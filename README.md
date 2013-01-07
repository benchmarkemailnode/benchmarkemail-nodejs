# benchmarkemail-nodejs

A node.js wrapper for the Benchmark Email API.

_benchmarkemail-nodejs_ exposes the Benchmark Email API (Version 1.0) features of the Benchmark Email API to your node.js application.
 
Further information on the Benchmark Email API and its features is available at [http://www.benchmarkemail.com/API/Doc](http://www.benchmarkemail.com/API/Doc)

## Setup

Installing using npm (node package manager):

    npm install benchmarkemail

Note: npm comes with node now
    
If you don't have npm installed or don't want to use it:

    cd ~/.node_libraries
    git clone git://github.com/benchmarkemailnode/benchmarkemail-nodejs benchmarkemail

Please note that parts of _benchmarkemail-nodejs_ depend on [request](http://github.com/mikeal/request) and [node-querystring](http://github.com/visionmedia/node-querystring). These libraries are needed to be installed for the API to work. If you are using npm all dependencies should be automagically resolved for you.

## How to use

Information on how to use the Benchmark Email APIs can be found below. Further information on the API methods available can be found at [http://www.benchmarkemail.com/API/Doc](http://www.benchmarkemail.com/API/Doc). 

### BenchmarkAPI

_BenchmarkAPI_ takes one argument which is your API key. You can find your API Key in your Benchmark Email Account. 
 
The callback function for each API method gets two arguments. The first one is an error object which is null when no error occured, the second one an object with all information retrieved as long as no error occured.

Example:

```javascript
var BenchmarkAPI = require('benchmarkemail').BenchmarkAPI;

var apiKey = 'Your Benchmark API Key';

try { 
    var api = new BenchmarkAPI(apiKey);
} catch (error) {
    console.log(error.message);
}

api.emailGet({ filter: '', pageNumber: '1', pageSize: '10', orderBy:'', sortOrder:'' }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        console.log(JSON.stringify(data)); // Do something with your data
});

api.emailCreate({ emailDetails : { fromName:'Steve',  fromEmail:'steve@example.com', emailName:'New Email', replyEmail:'steve@example.com', subject:'New Email Subject', templateContent:'Hello, <br> Welcome!', toListID:'/* LIST ID */' } }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        console.log(JSON.stringify(data)); // Do something with your data!
});
```