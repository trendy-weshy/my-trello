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
            <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <!-- {{ project }} -->
                <v-layout column align-center>
                <img src="static/v.png" alt="Vuetify.js" class="mb-5" />
                <blockquote>
                    &#8220;First, solve the problem. Then, write the code.&#8221;
                    <footer>
                    <small>
                        <em>&mdash;John Johnson</em>
                    </small>
                    </footer>
                </blockquote>
                </v-layout>
            </v-slide-y-transition>
            </v-container>
        </v-content>

    </span>

</template>

<script>
    import Sidebar from 'components/Sidebar.vue';
    import EditProfile from 'components/EditProject.vue';
    import ToolOptions from 'components/ToolOptions.vue';
    import { mapGetters } from 'vuex';
    import { isEmpty } from 'lodash';

  export default {
    data: () => ({
        editProject: false
    }),
    computed: {
        ...mapGetters({
            projectErrors:  'ProjectModule/error',
            project: 'ProjectModule/project'
        })
    },
    components: {
        EditProfile,
        ToolOptions,
        Sidebar
    },
    mounted() {
        if (isEmpty(this.project) && isEmpty(this.project.title) || isEmpty(this.project.rootDir)) {
            this.$store.dispatch('ProjectModule/getProject');
        }
    },
    methods: {
        exitConsole () {
            this.$store.dispatch('ProjectModule/clearProject');
            this.$router.push({ path: 'start' });
        }
    }
  }
</script>
