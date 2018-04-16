<template>
  <v-flex xs12 justify-center>
    <TaskGroupEditorModal :dialog="openTaskGroupEditor" @close:task-group-editor="openTaskGroupEditor = !openTaskGroupEditor" />
    <v-container>
      <v-layout row wrap justify-center="">
        <v-flex xs12 class="mb-4">
          <v-toolbar dense color="transparent" flat>
            <v-btn flat color="primary" @click.prevent="openTaskGroupEditor = !openTaskGroupEditor">
              <v-icon>add</v-icon> New Task Group
            </v-btn>
            <v-text-field prepend-icon="search" hide-details single-line label="Search Task Groups"></v-text-field>
          </v-toolbar>
        </v-flex>
        <v-flex class="my-2 mx-2" xs5 v-for="(taskGroup, idx) in sortedTaskGroups('name')" :key="taskGroup.id">
          <TaskGroupComponent :idx="idx" :key="taskGroup.id" />
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
    TaskGroupEditorModal
  },
  computed: {
    ...mapGetters({
      taskGroups: 'TasksModule/taskGroups'
    })
  },
  methods: {
    sortedTaskGroups(by) {
      return this.$store.getters['TasksModule/sortedTaskGroups'](by);
    },
    getTaskGroup(idx) {
      return this.$store.getters['TasksModule/taskGroup'](idx);
    }
  },
  data: () => ({
    openTaskGroupEditor: false
  }),
}
</script>

