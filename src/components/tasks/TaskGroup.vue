<template>
  <span>
  <ConfirmationComponent
    :dialog="taskGroupDeleteDialog" 
    :title="'Confirm Deletion of ' + group.name" 
    message="Deleting a task group will cause the deletion of all tasks created in it. The data will also be delete on the private file database. This action is irreversible!"
    id="task-group-deletion"
    truthyPlaceholder="I know what I am doing"
    @user:answer="deleteTaskGroup($event)"
  />

  <v-card tile>
    <v-toolbar dense card dark color="accent">

      <v-text-field
        autofocus
        color="white" class="mx-4"
        v-if="showSearch"
        prepend-icon="search"
        hide-details
        single-line label="Search Tasks"
        @blur.prevent="showSearch = !showSearch"
      />

      <v-toolbar-title v-if="!showSearch">
        <v-tooltip top>
          <v-subheader slot="activator">{{ group.name | capitalize('multi') }}</v-subheader>
          <span>{{group.name}} - {{ group.createdAt | normalize_date }}</span>
        </v-tooltip>
      </v-toolbar-title>
      <v-spacer v-if="!showSearch"></v-spacer>
      <v-tooltip top v-if="!showSearch">
        <v-btn icon small slot="activator" flat color="white" @click.native="addTask()">
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Add a new Task</span>
      </v-tooltip>
      <v-tooltip top v-if="!showSearch">
        <v-btn icon small slot="activator" flat color="white" @click.prevent="showSearch = !showSearch">
          <v-icon dark>search</v-icon>
        </v-btn>
        <span>Search for Tasks</span>
      </v-tooltip>
      <v-menu v-if="!showSearch" lazy transition="slide-x-reverse-transition" left>
        <v-btn icon small slot="activator" flat color="white">
          <v-icon dark>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile ripple @click="sortTasksBy = 'title'">
              <v-list-tile-action>
                  <v-icon>sort_by_alpha</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Sort Tasks by Title</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile ripple @click="sortTasksBy = 'createdAt'">
              <v-list-tile-action>
                  <v-icon>date_range</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Sort Tasks by Creation Date</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile ripple @click="sortTasksBy = 'updatedAt'">
              <v-list-tile-action>
                  <v-icon>timeline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Sort Tasks by Updated Date</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-divider />
          <v-list-tile ripple @click="$emit('edit:task-group', group.id)">
              <v-list-tile-action>
                  <v-icon>edit</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Edit Task Group</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile ripple @click="taskGroupDeleteDialog = !taskGroupDeleteDialog">
              <v-list-tile-action>
                  <v-icon>delete_forever</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Delete Task Group</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-card>

  <v-subheader>Tasks</v-subheader>

  <TaskListView :idx="idx" :by="sortTasksBy" />

  </span>
</template>

<script>
import { isNil } from 'lodash';
import TaskListView from './TaskList.vue';
import ConfirmationComponent from '@/components/misc/Confirmation.vue';

export default {
  name: 'TaskGroupComponent',
  components: {
    TaskListView,
    ConfirmationComponent,
  },
  props: {
    idx: {
      type: Number,
      default: null,
    },
  },
  computed: {
    group() {
      if (isNil(this.idx)) return null;
      return this.$store.getters['TasksModule/taskGroup'](this.idx);
    },
  },
  data: () => ({
    showSearch: false,
    sortTasksBy: null,
    taskGroupDeleteDialog: false
  }),
  methods: {
    deleteTaskGroup(e) {
      this.taskGroupDeleteDialog = false; // close modal
      if (e.id === 'task-group-deletion' && e.action) {
        this.$store.dispatch('TasksModule/removeGroup', { groupId: this.group.id });
      }
    },
    addTask() {
      this.$store.commit('UI/UIForms/toggle_TaskForm');
    },
  },
};
</script>
