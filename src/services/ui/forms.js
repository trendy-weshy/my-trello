/**
 * created by John Waweru
 * UI State for All forms
 */

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

    obj[`toggle_${form}`] = (state) => {
      state[form] = { ...state[form], openModal: !state[form].openModal };
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
    openForm(ctx, { form }) {
      ctx.commit(`toggle_${form}`);
    },
    editForm(ctx, { form, stageData }) {
      ctx.commit(`edit_${form}`, stageData);
      ctx.commit(`toggle_${form}`);
    },
  },
};

export default uiforms;
