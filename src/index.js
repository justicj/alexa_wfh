"use strict";
var WFH_STATES = {
    TRIVIA: "_EXCUSE", // Asking For Excuses
    START: "_STARTMODE", // Entry point, start the wfh generator.
    HELP: "_HELPMODE" // The user is asking for help.
};
var questions = require("./excuses.js");
