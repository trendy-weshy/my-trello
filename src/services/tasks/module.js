import uuid from 'uuid';
import { findIndex, isNil, sortedUniq, sortBy } from 'lodash';
import Api from './api';

export default {
  namespaced: true,
  state: {
    tasks: [],
    errors: null,
  },
  mutations: {
    // #note: Load tasks (task groups with their respective tasks) to store
    load(state, taskGroup) {
      state.tasks = [].concat(taskGroup);
    },
    loadTasks(state, { id, tasks }) {
      state.tasks[findIndex(state.tasks, o => o.id === id)] = [].concat(tasks);
    },
    error: (state, error) => {
      if (isNil(error)) {
        state.error = null;
      } else {
        state.error = Object.assign({}, state.error, error);
      }
    },
    // #note: Add a new Task Group
    addTaskGroup(state, { name }) {
      state.tasks = state.tasks.concat({
        id: uuid.v4(),
        name,
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    // #note: Edit task group details
    editTaskGroup(state, { groupId, name }) {
      state.tasks = state.tasks.map((v) => {
        if (v.id === groupId) {
          return Object.assign({}, v, { name, updatedAt: new Date().toISOString() });
        }
        return v;
      });
    },
    // #note: Remove a whole task group
    removeTaskGroup(state, { groupId }) {
      state.tasks = state.tasks.filter(v => v.id !== groupId);
    },
    // #note: Add a new task in a task group
    addTask(state, { groupId, task }) {
      const taskGroup = findIndex(state.tasks, group => group.id === groupId);
      if (taskGroup !== -1) {
        state.tasks[taskGroup].tasks = state.tasks[taskGroup].tasks.concat(Object.assign({}, task, {
          id: uuid.v4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
      } else {
        state.error = new Error();
        state.error.name = 'NotFound';
        state.error.code = 404;
        state.error.message = 'Could not find the requested task. Might be deleted';
        state.error.level = 'error';
      }
    },
    // #note: Edit a single task in a task group
    editTask(state, { groupId, taskId, task }) {
      const taskGroup = findIndex(state.tasks, group => group.id === groupId);
      if (taskGroup !== -1) {
        state.tasks[taskGroup].tasks = state.tasks[taskGroup].tasks.map((v) => {
          if (v.id === taskId) {
            return Object.assign({}, task, { updatedAt: new Date().toISOString() });
          }
          return v;
        });
      } else {
        state.error = new Error();
        state.error.name = 'NotFound';
        state.error.code = 404;
        state.error.message = 'Could not find the requested task. Might be deleted';
        state.error.level = 'error';
      }
    },
    // #note: Remove a task from a task group
    removeTask(state, { groupId, taskId }) {
      const taskGroup = findIndex(state.tasks, group => group.id === groupId);
      if (taskGroup !== -1) {
        state.tasks[taskGroup].tasks = state.tasks[taskGroup].tasks.filter(v => v.id !== taskId);
      } else {
        state.error = new Error();
        state.error.name = 'NotFound';
        state.error.code = 404;
        state.error.message = 'Could not find the requested task. Might be deleted';
        state.error.level = 'error';
      }
    },
  },
  actions: {
    loadGroups(ctx, taskGroups) {
      ctx.commit('error', null);
      // perform Api request //
      ctx.commit('load', taskGroups);
    },
    loadTasks(ctx, tasks) {
      ctx.commit('error', null);
      // perform Api request //
      ctx.commit('loadTasks', tasks);
    },
    throwError(ctx, err) {
      ctx.commit('error', err);
    },
    addNewGroup(ctx, name) {
      ctx.commit('error', null);
      ctx.commit('addTaskGroup', { name });
    },
    addNewTask(ctx, { groupId, task }) {
      ctx.commit('error', null);
      const isValid = Api.validate();
      if (isValid) {
        ctx.commit('addTask', { groupId, task });
        return;
      }
      ctx.commit('error', isValid);
    },
    editGroup(ctx, { groupId, name }) {
      ctx.commit('error', null);
      // perform Api request//
      ctx.commit('editTaskGroup', { groupId, name });
    },
    editTask(ctx, { groupId, taskId, task }) {
      ctx.commit('error', null);
      // perform Api request//
      ctx.commit('editTask', { groupId, taskId, task });
    },
    removeGroup(ctx, { groupId }) {
      ctx.commit('error', null);
      // perform Api request //
      ctx.commit('removeTaskGroup', { groupId });
    },
    removeTask(ctx, { groupId, taskId }) {
      ctx.commit('error', null);
      // perform Api request //
      ctx.commit('removeTask', { groupId, taskId });
    },
  },
  getters: {
    error: state => state.error,
    taskGroups: state => state.tasks,
    taskGroup: (state, getters) => idx => getters.taskGroups[idx],
    sortedTaskGroups: (state, getters) => by => sortBy(getters.taskGroups, [o => o[by]]),
    taskList: (state, getters) => idx => getters.taskGroup(idx).tasks,
    singeTask: (state, getters) => (idx, taskIdx) => getters.taskGroup(idx).tasks[taskIdx],
    sortedTasks: (state, getters) => (idx, by) => sortBy(getters.taskList(idx), [o => o[by]]),
    selectSingleUserTasks: (state, getters) => (idx, user) => getters.taskList(idx).filter(v => v.addedBy === user),
    userList: (state, getter) => idx => sortedUniq(getter.taskList(idx).map(v => v.addedBy)),
  },
};
