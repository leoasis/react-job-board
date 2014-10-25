/** @jsx React.DOM */

var React = require('react');
var Modal = require('react-bootstrap/Modal');

module.exports = React.createClass({
  displayName: 'ApplyModal',

  getInitialState: function() {
    return {value: '', acceptedTerms: false};
  },

  render: function() {
    return <Modal title="Apply to Job" onRequestHide={this.props.onRequestHide}>
      <div className="modal-body">
        <p>Why do you think you are suitable for this job?</p>
        <p><b>{this.props.job.title}</b></p>
        <p className="help-block">Please give a thoughtful reason greater than 140 characters.</p>
        <form>
          <textarea className="form-control" rows="3" value={this.state.value} onChange={this.handleTextChange}></textarea>
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this.state.acceptedTerms} onChange={this.handleTermsChecked} />
              {"I understand that I'm writing to a Toptal recruiter to review my qualifications for this job."}
            </label>
          </div>
          <span className="help-block">Minimum 140 characters. You entered {this.state.value.length} characters.</span>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={this.props.onRequestHide}>Cancel</button>
        {
          this.validForm() ? <button type="button" className="btn btn-primary" onClick={this.handleClick}>Apply!</button>
          : <button type="button" disabled="disabled" className="btn btn-primary" onClick={this.handleClick}>Apply!</button>
        }
      </div>
    </Modal>
  },

  validForm: function() {
    return this.state.value.length >= 140 && this.state.acceptedTerms;
  },

  handleClick: function() {
    this.props.onJobApplied(this.props.job);
  },

  handleTextChange: function(ev) {
    this.setState({value: ev.target.value});
  },

  handleTermsChecked: function(ev) {
    this.setState({acceptedTerms: ev.target.checked});
  }
});
