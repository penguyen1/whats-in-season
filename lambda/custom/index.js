/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
// const cookbook = require('alexa-cookbook.js');

const SKILL_NAME = 'seasonal chef';
const HELP_MESSAGE = 'You can say give me a seasonal ingredient, or, you can say exit... How may I help you?';
const HELP_REPROMPT = 'I beg your pardon?';
const FALLBACK_MESSAGE = 'Chef is busy in the kitchen right now. What else can I do for ya?';
const FALLBACK_REPROMPT = 'Say what?';
const STOP_MESSAGE = 'Bye, bye, butterfly!';

const seasonalData = [
  'Strawberries are at their sweetest between April through June. A ripe strawberry will be fragrant and red through and through.',
  'Cucumbers are best between June and September. A ripe cucumber should be bright medium to dark green and firm.',
  'Tomatoes ripen at different times based on its variety. Nonetheless, they should all be firm, but have a little bit of give when you squeeze it.',
  'Bell pepper peak season runs from July through September. Their skins should be glossy, taut and unwrinkled, and their stems fresh and green.',
  'Cherry season begins in early May and ends in late August. Mature cherries are firm and juicy, but tender enough to bite into easily.',
  'Peaches are harvested from late June through August. A golden yellow color and medium-soft flesh when gently squeezed is a great indicator for ripeness.',
];

const GetSeasonalIngredientHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetSeasonalIngredientIntent');
  },
  handle(handlerInput) {
    // const randomIngredient = cookbook.getRandomItem(seasonalData);
    const seasonalArr = seasonalData;
    const seasonalIndex = Math.floor(Math.random() * seasonalArr.length);
    const seasonalItem = seasonalArr[seasonalIndex];
    const speechOutput = seasonalItem;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, seasonalItem)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();
// const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetSeasonalIngredientHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
