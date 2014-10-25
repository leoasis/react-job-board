var loremIpsum = require('lorem-ipsum');
var moment = require('moment');

module.exports = function() {
  return {
    filter: {
      text: '',
      workTypes: [],
      commitments: [],
      sortBy: {
        prop: null,
        direction: 'asc'
      }
    },
    jobs: getJobs()
  };
};

var id = 1;
var generateJob = module.exports.generateJob = function(title) {
  return {
    id: id++,
    title: title,
    postedAt: date(),
    status: 'Pending Engineer',
    company: companyName(),
    commitment: commitment(),
    timeZone: timezone(),
    workType: workType(),
    requiredSkills: skills(),
    description: description(),
    applied: false
  };
};

function getJobs() {
  var jobs = [];
  for (var i = 0; i < 10; i++) {
    jobs.push(generateJob(title()));
  }

  return jobs;
}

function title() {
  return sample([
    'Wordpress Developer',
    'iOS Developer',
    'Task Manager & Task Completer',
    'iOS developer needed for app launch',
    'Full-stack Java developer for Android + Google App Engine',
    'PC based Digital Filter',
    'Wordpress Engineer',
    'Magento PHP Developer',
    'Intelligent Margin Enhancement',
    'Software Developer, mostly using AngularJS'
  ]);
}

function description() {
  return loremIpsum({count: 3});
}

function skills() {
  var count = 2 + Math.floor(Math.random() * 8);
  var skls = [];
  var sampleSkills = ['Java', 'Ruby', 'Javascript', 'React', 'Amazon', 'Unix', 'Windows', 'AWS', 'Socket.io', 'Node', 'C#', 'Cocoa', 'Swift', 'Objective C'];
  for (var i = 0; i < count; i++) {
    skls.push(sample(sampleSkills));
  }
  return skls;
}

function date() {
  var daysToSubtract = Math.floor(Math.random() * 60);
  return moment().subtract(daysToSubtract, 'days').toDate();
}

function commitment() {
  return sample(['Full time', 'Part time', 'Hourly']);
}

function workType() {
  return sample(['Remote', 'Onsite', 'Mixed', 'Recruiting Only']);
}

function companyName() {
  return sample(['Good Corp', 'Apple', 'Microsoft', 'Google', 'Bad Corp', 'Awesome & Co']);
}

function timezone() {
  return sample(['No preference', '(GMT-08:00) Pacific Time (US & Canada)', '(GMT-07:00) Mountain Time (US & Canada), min 2 hours overlap']);
}

function sample(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
