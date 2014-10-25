var React = require('react');
var App = require('./js/app');
var element = document.getElementById('app');

var app = React.renderComponent(App(), element);
window.React = React;








////////////////////////////////////////////////////////////////
var generateJob = require('./js/initial_state').generateJob;
window.addJob = function(title) {
  var jobs = app.state.jobs;
  jobs.push(generateJob(title));
  app.setState({jobs: jobs});
}
