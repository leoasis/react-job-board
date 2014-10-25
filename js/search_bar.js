/** @jsx React.DOM */

var React = require('react');
SplitButton = require('react-bootstrap/SplitButton');

module.exports = React.createClass({
  displayName: 'SearchBar',

  getInitialState: function() {
    return {
      expandedOptions: false,
      text: this.props.text
    };
  },

  render: function() {
    return <form className="well">
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." value={this.state.text} onChange={this.handleTextChange}/>
            <div className="input-group-btn">
              <button type="submit" className="btn btn-default" onClick={this.handleSearch}>Search</button>
              <button type="button" className="btn btn-default" onClick={this.handleOptionsClick}>
                <span className="caret"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {this.state.expandedOptions ? this.renderExpandedOptions() : this.renderCollapsedOptions() }
      <div className="row form-horizontal">
        <div className="form-group">
          <label className="col-md-2 control-label">
            Sort by:
          </label>
          <div className="col-md-2">
            <button className="btn btn-link" onClick={this.handleSort('postedAt')}>
              Creation Date
              {this.renderSortingArrowFor('postedAt')}
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-link" onClick={this.handleSort('title')}>
              Title
              {this.renderSortingArrowFor('title')}
            </button>
          </div>
        </div>
      </div>
    </form>
  },

  renderSortingArrowFor: function(sortProp) {
    return this.props.filter.sortBy.prop == sortProp ?
      this.props.filter.sortBy.direction == 'asc' ?
        <span className="dropup"><span className="caret"></span></span> :
        <span className="caret"></span> :
      null;
  },

  renderExpandedOptions: function() {
    return <div className="row form-horizontal">
      <div className="col-md-12">
        <div className="form-group">
          <label className="col-md-2 control-label">
            Work Type:
          </label>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('workTypes', 'Remote')} onChange={this.handleCheckbox('workTypes', 'Remote')} /> Remote
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('workTypes', 'Onsite')} onChange={this.handleCheckbox('workTypes', 'Onsite')} /> Onsite
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('workTypes', 'Mixed')} onChange={this.handleCheckbox('workTypes', 'Mixed')} /> Mixed
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('workTypes', 'Recruiting Only')} onChange={this.handleCheckbox('workTypes', 'Recruiting Only')} /> Recruiting Only
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-2 control-label">
            Commitment:
          </label>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('commitments', 'Full time')} onChange={this.handleCheckbox('commitments', 'Full time')} /> Full time
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('commitments', 'Part time')} onChange={this.handleCheckbox('commitments', 'Part time')} /> Part time
              </label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={this.isChecked('commitments', 'Hourly')} onChange={this.handleCheckbox('commitments', 'Hourly')} /> Hourly
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  },

  renderCollapsedOptions: function() {
    var workTypeItems = this.props.filter.workTypes.map(function(type) {
      return <span key={'workType_' + type} className="label label-default">Work Type: {type} | <span style={{cursor: 'pointer'}} onClick={this.handleOptionLabelRemove('workTypes', type)}>x</span></span>
    }.bind(this));
    var commitmentItems = this.props.filter.commitments.map(function(commitment) {
      return <span key={'commitment_' + commitment} className="label label-default">Commitment: {commitment} | <span style={{cursor: 'pointer'}} onClick={this.handleOptionLabelRemove('commitments', commitment)}>x</span></span>
    }.bind(this));

    var allChecks = workTypeItems.concat(commitmentItems).reduce(function(arr, item) {
      arr.push(item);
      arr.push(' ');
      return arr;
    }, []);
    return <div className="row">
      <div className="col-sm-12">
        {allChecks}
      </div>
    </div>
  },

  handleOptionsClick: function() {
    this.setState({expandedOptions: !this.state.expandedOptions});
  },

  handleTextChange: function(ev) {
    this.setState({text: ev.target.value});
  },

  handleSearch: function(ev) {
    ev.preventDefault();

    var filter = this.props.filter;
    filter.text = this.state.text;
    this.props.onFilter(filter);
  },

  isChecked: function(filterProp, value) {
    return this.props.filter[filterProp].indexOf(value) != -1;
  },

  handleCheckbox: function(filterProp, value) {
    return function(ev) {
      var filter = this.props.filter;
      var prop = filter[filterProp];
      if (ev.target.checked) {
        prop.push(value);
      } else {
        prop.splice(prop.indexOf(value), 1);
      }
      this.props.onFilter(filter);
    }.bind(this);
  },

  handleOptionLabelRemove: function(filterProp, value) {
    return function(ev) {
      ev.preventDefault();

      var filter = this.props.filter;
      filter[filterProp].splice(filter[filterProp].indexOf(value), 1);
      this.props.onFilter(filter);
    }.bind(this);
  },

  handleSort: function(sortProp) {
    return function(ev) {
      ev.preventDefault();

      var filter = this.props.filter;
      var sortBy = filter.sortBy;
      var prop = sortBy.prop;
      if (prop != sortProp) {
        sortBy.direction = 'asc';
      } else if (sortBy.direction === 'asc') {
        sortBy.direction = 'desc'
      } else {
        sortBy.direction = 'asc'
      }
      sortBy.prop = sortProp;
      this.props.onFilter(filter);
    }.bind(this);
  }
});
