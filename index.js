#!/usr/bin/env node

const request = require('request');

const time = (new Date()).getTime();
const rand = Math.floor(Math.random() * 1000);

request({
    method: 'GET',
    url: 'http://speedport.ip/data/Status.json?_time=' + time + '&_rand=' + rand + '&_lang=DE',
    json: true,
    headers: {
        Referer: 'http://speedport.ip/html/login/status.html?lang=de'
    }
}, (err, res, body) => {
    if (err) {
        console.log(err.toString());
        process.exit(2);
    } else {
        const data = {};
        body.forEach(val => {
            data[val.varid] = val.varvalue;
        });
        console.log('Status:', data.status, ' DSL Link:', data.dsl_link_status, ' Downstream:', data.dsl_downstream, 'kbit/s Upstream:', data.dsl_upstream, 'kbit/s');
        if (data.status !== 'online') {
            process.exit(2);
        } else if (data.dsl_downstream < 48000 || data.dsl_upstream < 9750) {
            process.exit(1);
        } else {
            process.exit(0);
        }
    }
});
