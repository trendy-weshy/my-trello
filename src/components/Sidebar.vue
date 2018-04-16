<template>
    <v-list>

        <v-list-tile avatar class="py-2">
            <v-list-tile-avatar>
                <v-icon class="secondary white--text">group_work</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{ project.title }}</v-list-tile-title>
                <v-tooltip bottom>
                    <v-list-tile-sub-title slot="activator">{{ project.rootDir }}</v-list-tile-sub-title>
                    <span>{{ project.rootDir }}</span>
                </v-tooltip>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-tooltip bottom>
                    <v-icon slot="activator" style="cursor: pointer;" color="secondary">face</v-icon>
                    <span>{{ project.user }}</span>
                </v-tooltip>
            </v-list-tile-action>
        </v-list-tile>

        <v-divider class="mb-3"></v-divider>
        <v-subheader>Project Tools</v-subheader>
        <v-list-tile ripple to="/console/tasks">
            <v-list-tile-action>
                <v-icon>view_list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Your Tasks</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple to="/console/notes">
            <v-list-tile-action>
                <v-icon>assignments</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Your Notes</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

    </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyTrelloSidebar',
  computed: {
    ...mapGetters({
      project: 'ProjectModule/project',
    }),
  },
};
</script>
