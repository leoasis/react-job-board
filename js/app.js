/** @jsx React.DOM */

var React = require('react');
var SearchBar = require('./search_bar');
var JobList = require('./job_list');
var getInitialState = require('./initial_state');

module.exports = React.createClass({
  displayName: 'App',

  getInitialState: getInitialState,

  render: function() {
    var jobs = this.filteredAndSortedJobs();
    return <div>
      <div className="page-header">
        <h1>Eligible Jobs <small>({this.state.jobs.length})</small></h1>
      </div>
      <SearchBar filter={this.state.filter} onFilter={this.handleJobFilter} />
      <JobList jobs={jobs} onJobApplied={this.handleJobApplied} />
    </div>
  },

  filteredAndSortedJobs: function() {
    return this.state.jobs.filter(this.jobFilter).sort(function(a, b) {
      var sortBy = this.state.filter.sortBy;

      if (sortBy.prop === 'title') {
        return this.sortByTitle(a, b, sortBy.direction);
      } else {
        return this.sortByPostedAt(a, b, sortBy.direction);
      }
    }.bind(this));
  },

  sortByTitle: function(a, b, direction) {
    if (direction == 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  },

  sortByPostedAt: function(a, b, direction) {
    if (direction == 'asc') {
      return a.postedAt - b.postedAt;
    } else {
      return b.postedAt - a.postedAt;
    }
  },

  jobFilter: function(job) {
    return job.title.match(this.state.filter.text) &&
      (this.state.filter.workTypes.length == 0 || this.state.filter.workTypes.indexOf(job.workType) != -1) &&
      (this.state.filter.commitments.length == 0 || this.state.filter.commitments.indexOf(job.commitment) != -1);
  },

  handleJobFilter: function(filter) {
    this.setState({filter: filter});
  },

  handleJobApplied: function(job) {
    job.applied = true;
    this.setState({jobs: this.state.jobs});
  }
});
