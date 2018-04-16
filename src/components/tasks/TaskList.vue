<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="task in sortedTasks()" :key="task.id" expand-icon="expand_more" ripple lazy>
      <div slot="header">{{ task.title }}</div>
      <v-card>
        <v-card-text>{{ task.description }} <br /> --addedby {{ task.addedBy }}</v-card-text>
        <v-card-action>
          <v-spacer />
          <v-tooltip bottom>
            <v-btn icon small slot="activator" flat color="error">
              <v-icon dark>delete</v-icon>
            </v-btn>
            <span>Delete Task</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn icon small slot="activator" flat color="primary">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <span>Edit Task</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn icon small slot="activator" flat color="accent">
              <v-icon dark>label</v-icon>
            </v-btn>
            <span>Move Task to Another Group</span>
          </v-tooltip>
        </v-card-action>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { isNil } from 'lodash';

export default {
  name: 'TaskListView',
  props: {
    idx: {
      type: Number,
      default: null,
    },
    by: {
      type: String,
      default: null,
    },
  },
  methods: {
    sortedTasks() {
      if (isNil(this.idx)) return [];
      return this.$store.getters['TasksModule/sortedTasks'](this.idx, this.by || 'title');
    },
  },
};
</script>
