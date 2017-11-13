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
    description: 'This is some description',
    time: '19:00',
    day: 'Every 3rd Thursday',
    nextMeetup: new Date(),
    twitter: 'berlinjs'
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

const DB_DEFAULTS = {
  [MEETUP_KEY]: MEETUP_ENTRIES
};

module.exports = {
  MEETUP_ENTRIES,
  MEETUP_KEY,
  MEETUP_MANDATORY_KEYS,
  MEETUP_VALID_KEYS,
  DB_DEFAULTS
};
