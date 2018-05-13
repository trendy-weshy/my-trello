/**
 * created by John Waweru
 * UI State for All forms
 */

import { isNil } from 'lodash';

const uiForms = [
  'ProjectForm',
  'TaskGroupForm',
  'TaskForm',
];

const uiFormsState = ((forms) => {
  const obj = {};
  forms.forEach((form) => { obj[form] = { edit: false, stageData: null, openModal: false }; });
  return obj;
})([...uiForms]);

const uiFormMutations = ((forms) => {
  const obj = {};
  forms.forEach((form) => {
    obj[`edit_${form}`] = (state, dataModel) => {
      state[form] = { ...state[form], edit: true, stageData: dataModel };
    };

    obj[`clear_${form}`] = (state) => {
      state[form] = { ...state[form], edit: false, stageData: null };
    };

    obj[`toggle_${form}`] = (state, toggle_state = null) => {
      if (!isNil(toggle_state)) {
        state[form] = { ...state[form], openModal: toggle_state };
      } else if (state[form].openModal) {
        state[form] = { edit: false, stageData: null, openModal: false };
      } else {
        state[form] = { ...state[form], openModal: true };
      }
    };
  });

  return obj;
})([...uiForms]);


const uiFormGetters = ((forms) => {
  const obj = {};
  forms.forEach((form) => {
    obj[`get_${form}`] = state => state[form];
  });
  return obj;
})([...uiForms]);

const uiforms = {
  namespaced: true,
  state: { ...uiFormsState },
  mutations: { ...uiFormMutations },
  getters: { ...uiFormGetters },
  actions: {
    editForm(ctx, { form, stageData }) {
      ctx.commit(`edit_${form}`, stageData);
      ctx.commit(`toggle_${form}`);
    },
    closeForm(ctx, { form, toggleState, shouldClear }) {
      if (shouldClear) {
        ctx.commit(`clear_${form}`);
      }
      ctx.commit(`toggle_${form}`, toggleState);
    },
  },
};

export default uiforms;
