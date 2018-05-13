<template>
    <span>
          <ConfirmationComponent
            :dialog="exitProjectDialog" 
            title="Do you want to exit the project ?"
            message="The project details are safely backup on a private file database in your project. In order to use it make sure to include it in your version control software, e.g: Git"
            id="project-exit"
            @user:answer="exitConsole($event)"
            truthyPlaceholder="Yes, exit project"
            falseyPlaceholder="No, Take me back"
          />
                <v-navigation-drawer fixed permanent touchless stateless clipped app>
            <Sidebar />
        </v-navigation-drawer>

        <v-toolbar clipped-left app dark class="accent">
            <v-toolbar-title>MyTrello</v-toolbar-title>
            <v-spacer></v-spacer>
            <EditProfile />
            <ToolOptions @console:exit="exitProjectDialog = !exitProjectDialog" />
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
import ConfirmationComponent from '@/components/misc/Confirmation.vue';

export default {
  data: () => ({
    editProject: false,
    exitProjectDialog: false,
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
    ConfirmationComponent,
  },
  methods: {
    exitConsole(e) {
      this.exitProjectDialog = false; // close modal
      if (e.id === 'project-exit' && e.action) {
        this.$store.dispatch('ProjectModule/clearProject');
        this.$router.push({ path: 'start' });
      }
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
