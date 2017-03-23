'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = require("./excuses.js");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetExcuse');
    },
    'Unhandled': function() {
        this.emit(':ask', 'WFH did not understand that');
    },
    'GetNewExcuseIntent': function () {
        this.emit('GetExcuse');
    },
    'GetExcuse': function () {
        // Get a random EXCUSE from the EXCUSES list
        // Use this.t() to get corresponding language data
        var ExcuseArr = this.t('EXCUSES');
        var ExcuseIndex = Math.floor(Math.random() * ExcuseArr.length);
        var randomExcuse = ExcuseArr[ExcuseIndex];

        // Create speech output
        var speechOutput = this.t("GET_EXCUSE_MESSAGE") + randomExcuse;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomExcuse)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
