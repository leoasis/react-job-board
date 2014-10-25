/** @jsx React.DOM */

var React = require('react');
var Job = require('./job');

module.exports = React.createClass({
  displayName: 'JobList',

  render: function() {
    var jobs = this.props.jobs.map(function(job) {
      return <Job job={job} key={job.id} onJobApplied={this.props.onJobApplied} />;
    }.bind(this));
    return <ul className="list-unstyled">
      {jobs}
    </ul>
  }
});
