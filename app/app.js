import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

import formatCounterHelper from "./helpers/format-counter";

Ember.MODEL_FACTORY_INJECTIONS = true;
Ember.Handlebars.registerBoundHelper("format-counter", formatCounterHelper);

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
