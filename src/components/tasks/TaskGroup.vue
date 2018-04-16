<template>
  <span>
  <v-card tile>
    <v-toolbar card dark color="accent">
      <v-toolbar-title>
        <v-tooltip top>
          <v-subheader slot="activator">{{ group.name | capitalize('multi') }}</v-subheader>
          <span>{{group.name}} - {{ group.createdAt | normalize_date }}</span>
        </v-tooltip>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <v-btn icon small slot="activator" flat color="white">
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Add a new Task</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon small slot="activator" flat color="primary">
          <v-icon dark>edit</v-icon>
        </v-btn>
        <span>Edit Task Group Profile</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon small slot="activator" flat color="error">
          <v-icon dark>delete_forever</v-icon>
        </v-btn>
        <span>Delete Task Group</span>
      </v-tooltip>
    </v-toolbar>
  </v-card>

  <v-subheader>Tasks</v-subheader>

  <TaskListView :idx="idx" />

  </span>
</template>

<script>
import TaskListView from './TaskList.vue';
import { isNil } from 'lodash';

export default {
  name: 'TaskGroupComponent',
  components: {
    TaskListView
  },
  props: {
    idx: {
      type: Number,
      default: null
    }
  },
  computed: {
    group() {
      if (isNil(this.idx)) return {};
      return this.$store.getters['TasksModule/taskGroup'](this.idx);
    }
  },
}
</script>
