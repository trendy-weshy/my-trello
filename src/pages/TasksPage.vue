<template>
  <v-container justify-center align-center wrap>
    <v-layout row wrap justify-center align-baseline>
      <v-flex justify-start v-if="taskGroups.length > 0">
        <h1>Tasks Page</h1>
      </v-flex>
      <no-task-view v-else />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import NoTaskView from '@/components/tasks/NoTasks.vue';

export default {
  name: 'TasksPage',
  components: {
    NoTaskView,
  },
  computed: {
    ...mapGetters({
      taskGroups: 'TasksModule/taskGroups',
      tasksError: 'TasksModule/error',
    }),
  },
};
</script>
