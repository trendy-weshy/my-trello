<template>
  <v-container justify-center align-center wrap>
    <v-layout row wrap justify-center>
      <TaskGroupListView v-if="taskGroups.length > 0" />
      <no-task-view v-else />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import NoTaskView from '@/components/tasks/NoTasks.vue';
import TaskGroupListView from '@/components/tasks/TaskGroupList.vue';

export default {
  name: 'TasksPage',
  components: {
    NoTaskView,
    TaskGroupListView,
  },
  computed: {
    ...mapGetters({
      taskGroups: 'TasksModule/taskGroups',
      tasksError: 'TasksModule/error',
    }),
  },
};
</script>
