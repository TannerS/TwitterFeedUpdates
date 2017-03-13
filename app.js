/*
 http://techknights.org/workshops/nodejs-twitterbot/
 https://www.npmjs.com/package/twitter

 */

var elasticsearch = require('elasticsearch');
var express = require('express');
var fs = require('fs');
var TwitterPackage = require('twitter');
// Twitter = null;

var url = "http://quote.cnbc.com/quote-html-webservice/quote.htm?partnerId=2&requestMethod=quick&exthrs=1&noform=1&fund=1&output=json&symbols=.IBEX|.FTMIB|.OMXS30|.STOXX|.AXJO|.SSEC|.KS11|.STI|.SETI|.FTFCNBCA|.VIX|.VXN|.VXD&callback=quoteHandler2";
var auth = {};
var app = express();

var elastic = new elasticsearch.Client({
    host: 'search-tanners-nv2iphulfkualyxfwwhsijkqr4.us-east-1.es.amazonaws.com/',
    log: 'info'
});

function test()
{
    fs.readFile("/home/tanners/.twitter/auth.json", {encoding: 'utf-8'}, function(err, data) {
        if (!err)
        {
            var Twitter = new TwitterPackage(JSON.parse(data));
            console.log(Twitter);


            // Twitter.stream('statuses/filter', {track: '#test'}, function(stream)
            Twitter.stream('statuses/filter', {track: '#trump'}, function(stream)
            {

                console.log("debug");

                stream.on('data', function(tweet)
                {
                    console.log(tweet);
                    console.log(JSON.stringify(tweet));

                });

                stream.on('error', function(error) {
                    console.log(error);
                });
            })


        }
        else
        {
            console.log(err);
        }
    });



}


function authenticate()
{


    fs.readFile("/home/tanners/.twitter/auth.json", {encoding: 'utf-8'}, function(err, data) {
        if (!err)
        {
            var Twitter = new TwitterPackage(JSON.parse(data));
            // console.log(Twitter);


            console.log("DEBUG: ");

            return Twitter;


        }
        else
        {
            console.log(err);
        }
    });

    return null;
}

function getTweet(Twitter)
{
    Twitter.stream('statuses/filter', {track: '#makeamericagreatagian'}, function(stream)
    {
        stream.on('data', function(tweet)
        {
            console.log(tweet.text);
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
}

elastic.ping({
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.log('elasticsearch cluser is not operational');
    } else {
        console.log('elasticsearch cluser is operational');
    }
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.listen(3006, function () {
    console.log('Example app listening on port 3000!');
    // var Twitter = authenticate();
    test();
    // console.log(Twitter);


    // getTweet(Twitter);
});
