const lodashId = require('lodash-id');

function addIds(entry) {
  return { ...entry, id: lodashId.createId() };
}

const MEETUP_ENTRIES = [
  {
    name: 'Berlin.js',
    location: 'co.up',
    coordinates: {
      latitude: '52.500330',
      longitude: '13.419786'
    },
    description:
      'Berlin.js is a montly meetup for everything around JavaScript',
    time: '19:00',
    day: 'Every 3rd Thursday',
    nextMeetup: new Date(),
    twitter: 'berlinjs',
    url: 'https://www.meetup.com/Berlin-JS/'
  },
  {
    name: 'Angular Berlin',
    location: 'bitcrowd GmbH',
    coordinates: {
      latitude: '52.499892',
      longitude: '13.425056'
    },
    description: 'A monthly meetup around AngularJS & Angular',
    time: '19:00',
    day: 'Every 2nd Wednesday',
    nextMeetup: new Date(),
    twitter: 'angular_berlin',
    url: 'https://www.meetup.com/AngularJS-Meetup-Berlin/'
  },
  {
    name: 'Ionic Berlin',
    location: 'JustWatch GmbH',
    coordinates: {
      latitude: '52.512911',
      longitude: '13.455111'
    },
    description: 'A quarterly meetup around Ionic & Stencil',
    time: '19:00',
    day: 'Irregularly Thursdays',
    nextMeetup: new Date(),
    twitter: 'IonicBerlin',
    url: 'https://www.meetup.com/Ionic-Berlin/'
  },
  {
    name: 'Ember Berlin',
    location: 'kloeckner.i',
    coordinates: {
      latitude: '52.531530',
      longitude: '13.383500'
    },
    description: 'A monthly meetup around Ember & Glimmer',
    time: '19:00',
    day: 'First Tuesday',
    nextMeetup: new Date(),
    twitter: 'emberliners',
    url: 'https://www.meetup.com/Ember-js-Berlin/'
  }
].map(addIds);

const MEETUP_KEY = 'meetups';

const MEETUP_MANDATORY_KEYS = [
  'name',
  'location',
  'description',
  'day',
  'time'
];

const MEETUP_VALID_KEYS = [
  'name',
  'location',
  'coordinates',
  'description',
  'time',
  'day',
  'nextMeetup',
  'twitter'
];

const USER_KEY = 'users';

const DB_DEFAULTS = {
  [MEETUP_KEY]: MEETUP_ENTRIES,
  [USER_KEY]: []
};

const DB_PATH = '.data/db.json';

module.exports = {
  MEETUP_ENTRIES,
  MEETUP_KEY,
  MEETUP_MANDATORY_KEYS,
  MEETUP_VALID_KEYS,
  USER_KEY,
  DB_DEFAULTS,
  DB_PATH
};
