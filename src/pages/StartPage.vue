<template>
    <v-container fluid justify-center>
        <v-layout row wrap justify-center>
            <v-flex xs5 align-content-center fill-height class="mt-3">
                <v-card class="mb-5">
                    <v-card-title primary-title class="accent white--text">
                        <h2><v-icon dark>library_add</v-icon> Add New Project</h2>
                    </v-card-title>

                    <div class="mt-2 px-4">
                        <ProjectDetailsForm @submit-project="submit($event)" provideSubmitBtn />
                    </div>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProjectDetailsForm from '@/components/ProjectDetailsForm.vue';
import { mapGetters } from 'vuex';
import { isEmpty, isNil } from 'lodash';

export default {
  computed: {
    ...mapGetters({ projectErrors: 'ProjectModule/error', project: 'ProjectModule/project' }),
  },
  components: {
    ProjectDetailsForm,
  },
  methods: {
    submit(e) {
      const { title, rootDir, user } = e.project;
      this.$store.dispatch('ProjectModule/addProject', { title, rootDir, user });
      this.$router.push({ path: 'console' });
    },
  },
  created() {
    const condition = !isNil(this.project) &&
      (!isEmpty(this.project.title) &&
      !isEmpty(this.project.rootDir) &&
      !isEmpty(this.project.user));

    if (condition) {
      this.$router.push({ path: 'console' });
    }
    this.$store.commit('UI/UIForms/clear_ProjectForm');    
  },
};
</script>

