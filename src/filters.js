import Vue from 'vue';
import { map, join } from 'lodash';
import moment from 'moment';

Vue.filter('capitalize', (value, type = 'single') => {
  if (!value) return '';
  value = value.toString();
  if (type === 'single') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return join(map(value.split(' '), v => (v.charAt(0).toUpperCase() + v.slice(1))), ' ');
});

Vue.filter('normalize_date', (value) => {
  if (!value) return '';
  const datetime = moment(value);
  if (!datetime.isValid()) return value;
  return datetime.format('dddd, MMMM Do YYYY, h:mm:ss a');
});
