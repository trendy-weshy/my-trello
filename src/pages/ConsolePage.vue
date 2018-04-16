<template>
    <span>

        <v-navigation-drawer fixed permanent touchless stateless clipped app>
            <Sidebar />
        </v-navigation-drawer>

        <v-toolbar clipped-left app dark class="accent">
            <v-toolbar-title>MyTrello</v-toolbar-title>
            <v-spacer></v-spacer>
            <EditProfile />
            <ToolOptions @console:exit="exitConsole($event)" />
        </v-toolbar>

        <!-- page -->
        <v-content>
            <v-container fluid justify-space-around>
            <v-slide-x-transition mode="out-in">
                <router-view></router-view>
            </v-slide-x-transition>
            </v-container>
        </v-content>

    </span>

</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import EditProfile from '@/components/EditProject.vue';
import ToolOptions from '@/components/ToolOptions.vue';
import { mapGetters } from 'vuex';
import { isEmpty, isNil } from 'lodash';

export default {
  data: () => ({
    editProject: false,
  }),
  computed: {
    ...mapGetters({
      projectErrors: 'ProjectModule/error',
      project: 'ProjectModule/project',
    }),
  },
  components: {
    EditProfile,
    ToolOptions,
    Sidebar,
  },
  methods: {
    exitConsole() {
      this.$store.dispatch('ProjectModule/clearProject');
      this.$router.push({ path: 'start' });
    },
  },
  created() {
    const condition = isNil(this.project) ||
      isEmpty(this.project.title) ||
      isEmpty(this.project.rootDir) ||
      isEmpty(this.project.user);
    if (condition) {
      this.$router.push({ path: 'start' });
    }
  },
};
</script>
