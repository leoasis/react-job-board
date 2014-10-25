/** @jsx React.DOM */

var React = require('react');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var ApplyModal = require('./apply_modal');
var timeAgo = require('timeago');

module.exports = React.createClass({
  displayName: 'Job',

  render: function() {
    var job = this.props.job;
    var requiredSkillsLabels = job.requiredSkills.map(function(skill, index) {
      return <span key={index} className="label label-default">{skill}</span>
    }).reduce(function(arr, comp) {
      arr.push(comp);
      arr.push(' ');
      return arr;
    }, []);

    return <li>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <div className="btn-group pull-right">
              {
                !job.applied ? <ModalTrigger modal={<ApplyModal job={job} onJobApplied={this.props.onJobApplied} />}>
                    <button href="#" className="btn btn-success btn-sm">Apply to this job</button>
                  </ModalTrigger> :
                  <button href="#" disabled="disabled" className="btn btn-primary btn-sm">Already applied to this job</button>
              }
            </div>
            {job.title}
          </h3>
          <div className="clearfix"></div>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                Job Posted
              </div>
              <div className="col-md-3">
                {timeAgo(job.postedAt)}
              </div>
              <div className="col-md-3">
                Status
              </div>
              <div className="col-md-3">
                {job.status}
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                Company
              </div>
              <div className="col-md-3">
                {job.company}
              </div>
              <div className="col-md-3">
                Desired Commitment
              </div>
              <div className="col-md-3">
                {job.commitment}
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                Time Zone
              </div>
              <div className="col-md-3">
                {job.timeZone}
              </div>
              <div className="col-md-3">
                Work Type
              </div>
              <div className="col-md-3">
                {job.workType}
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                Required Skills
              </div>
              <div className="col-md-9">
                {requiredSkillsLabels}
              </div>
            </div>
          </li>
        </ul>
        <div className="panel-body">
          {job.description}
        </div>
      </div>
    </li>
  }
});
