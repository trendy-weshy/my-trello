import { isNil, isError, isEmpty } from 'lodash';
import Api from './api';

export default {
  namespaced: true,
  state: {
    project: { title: '', rootDir: '', user: '' },
    error: null,
  },
  mutations: {
    load: (state, project) => {
      state.project = Object.assign({}, project);
    },
    error: (state, error) => {
      if (isNil(error)) {
        state.error = null;
      } else {
        state.error = Object.assign({}, state.error, error);
      }
    },
    reset: (state) => {
      state.project = Object.assign({}, { title: '', rootDir: '', user: '' });
    },
  },
  actions: {
    addProject(ctx, project) {
      ctx.commit('error', null);
      const isInvalid = Api.validate(project);
      if (isInvalid) {
        ctx.commit('error', project);
        return;
      }
      Api.save(project);
      ctx.commit('load', project);
    },
    clearProject(ctx) {
      ctx.commit('error', null);
      Api.remove();
      ctx.commit('reset');
    },
    throwError(ctx, err) {
      ctx.commit('error', err);
    },
    getProject(ctx) {
      ctx.commit('error', null);
      const project = Api.retrieve();
      if (isError(project)) {
        ctx.commit('error', project);
        return;
      }
      if (!isNil(project) && !isEmpty(project)) {
        ctx.commit('load', project);
      }
    },
  },
  getters: {
    project: state => state.project,
    error: state => state.error,
  },
};
