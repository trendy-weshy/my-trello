<template>
    <v-dialog v-model="projectForm.openModal" persistent max-width="500px" lazy>
        <v-btn small slot="activator" color="white" dark flat fab @click.native.prevent="editForm()">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-card-title class="headline px-4">
                Edit Your Project Details
                <v-subheader>
                    Press&nbsp;<strong class="info--text">Enter Button</strong>&nbsp;once done making changes
                </v-subheader>
            </v-card-title>
            <ProjectDetailsForm @submit-project="edit($event)" class="px-4" />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" class="mr-3" @click.native.prevent="close()" flat>
                    <v-icon>close</v-icon> Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ProjectDetailsForm from '@/components/ProjectDetailsForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'MyTrelloEditProject',
  components: {
    ProjectDetailsForm,
  },
  computed: {
    ...mapGetters({
      project: 'ProjectModule/project',
      projectForm: 'UI/UIForms/get_ProjectForm',
    }),
  },
  methods: {
    edit(e) {
      const { title, rootDir, user } = e.project;
      this.$store.dispatch('ProjectModule/addProject', { title, rootDir, user });
      this.$store.dispatch('UI/UIForms/closeForm', { form: 'ProjectForm', toggleState: false, shouldClear: false });
    },
    editForm() {
        this.$store.dispatch('UI/UIForms/editForm', { form: 'ProjectForm', stageData: this.project });
    },
    close() {
      this.$store.commit('UI/UIForms/toggle_ProjectForm');
    },
  },
};
</script>
