import Vue from 'vue';
import Vuex from 'vuex';

import ProjectModule from '@/services/project/module';
import TasksModule from '@/services/tasks/module';
import UIModules from '@/services/ui/module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ProjectModule,
    TasksModule,
    UI: UIModules,
  },
});
