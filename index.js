'use strict';
// IMPORTS
const Botkit = require('botkit');
const config = require('config');
const axios = require('axios');

// GLOBAL VARS
const controller = Botkit.slackbot({ debug: false });
const token = config.get('Slack.api_token');
const app_id = config.get('PandoraBots.app_id');

// SLACK VARS
const retries = 1000;

// connect the bot to a stream of messages
controller.spawn({ token, retries }).startRTM();

// Listenners
controller.hears(
    ['string'],
    (bot,message) => axios({
        method: 'post',
        url: `https://aiaas.pandorabots.com/talk/${app_id}/vitaebot/`,
        responseType: 'stream'
    }).then((resp) => {
        return bot.reply(message, resp)
    })
);
