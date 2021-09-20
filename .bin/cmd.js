#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const https = require('https');
const qs = require('qs');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const options = yargs
    .usage("Usage: -s <stage>")
    .option("s", {
        alias: "stage",
        describe: "Stage",
        type: "string",
        demandOption: true
    }).option("t", {
        alias: "template",
        describe: "Stage",
        type: "object",
        demandOption: true
    })
    .option("o", {
        alias: "outputSource",
        describe: "Stage",
        type: "object",
        demandOption: false
    })
    .option("c", {
        alias: "templateConfig",
        describe: "Stage",
        type: "object",
        demandOption: false
    }).option("docker", {
        alias: "docker",
        describe: "Stage",
        type: "object",
        demandOption: true
    }).argv;

console.log(options)

if (options.stage == 'docker') {
    require('./' + options.stage).init(options)
}