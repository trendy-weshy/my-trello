import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import ProjectModule from './projects.module';

export function createStore () {

  return new Vuex.Store({
    modules: {
      ProjectModule
    }
  });

}
