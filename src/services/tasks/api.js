import { has } from 'lodash';

const Api = {
  validate(task) {
    if (has(task, 'title') && has(task, 'description') && has(task, 'addedBy')) {
      return true;
    }
    const err = new Error();
    err.name = 'InvalidTaskData';
    err.message = 'Some task information is missing';
    err.level = 'warning';
    err.code = 0;
    return err;
  },
};

export default Api;
