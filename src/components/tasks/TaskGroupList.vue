<template>
  <v-flex xs12 justify-center>
    <TaskGroupEditorModal />

    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12 class="mb-4">
          <v-toolbar dense color="primary">
            <v-text-field color="white" prepend-icon="search" hide-details single-line label="Search Task Groups" />
            <v-spacer />
            <v-btn flat dark @click.prevent="$store.commit('UI/UIForms/toggle_TaskGroupForm')">
              <v-icon>add</v-icon> New Task Group
            </v-btn>
            <v-menu lazy transition="slide-x-reverse-transition" left>
              <v-btn icon small slot="activator" flat color="white">
                <v-icon dark>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile ripple @click="sortTasksGroupsBy = 'title'">
                    <v-list-tile-action>
                        <v-icon>sort_by_alpha</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sort Groups by Title</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple @click="sortTasksGroupsBy = 'createdAt'">
                    <v-list-tile-action>
                        <v-icon>date_range</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sort Groups by Creation Date</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple @click="sortTasksGroupsBy = 'updatedAt'">
                    <v-list-tile-action>
                        <v-icon>timeline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sort Groups by Updated Date</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-flex>
        <v-flex class="my-2 mx-2" xs5 v-for="(taskGroup, idx) in sortedTaskGroups(sortTasksGroupsBy || 'name')" :key="taskGroup.id">
          <TaskGroupComponent :idx="idx" :key="taskGroup.id" @edit:task-group="editTaskGroup($event)" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskGroupComponent from './TaskGroup.vue';
import TaskGroupEditorModal from './TaskGroupEditor.vue';

export default {
  name: 'TaskGroupListView',
  components: {
    TaskGroupComponent,
    TaskGroupEditorModal,
  },
  computed: {
    ...mapGetters({
      taskGroups: 'TasksModule/taskGroups',
    }),
  },
  methods: {
    sortedTaskGroups(by) {
      return this.$store.getters['TasksModule/sortedTaskGroups'](by);
    },
    getTaskGroup(idx) {
      return this.$store.getters['TasksModule/taskGroup'](idx);
    },
    getTaskGroupById(id) {
      return this.$store.getters['TasksModule/taskGroupById'](id);
    },
    editTaskGroup(e) {
      this.$store.dispatch('UI/UIForms/editForm', { form: 'TaskGroupForm', stageData: this.getTaskGroupById(e) });
    },
  },
  data: () => ({
    sortTasksGroupsBy: null,
  }),
};
</script>

