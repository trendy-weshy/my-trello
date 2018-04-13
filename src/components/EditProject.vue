<template>
    <v-dialog v-model="dialog" persistent max-width="500px" hide-overlay lazy>
        <v-btn small slot="activator" color="white" dark fab flat @click.native.prevent="dialog = !dialog">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-card-title class="headline px-4">
                Edit your project details
                <v-subheader>
                    Press&nbsp;<strong class="info--text">Enter Button</strong>&nbsp;once done making changes
                </v-subheader>
            </v-card-title>
            <ProjectDetailsForm edit :stagedProject="project" @submit-project="edit($event)" class="px-4" />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" class="mr-3" @click.native.prevent="dialog = !dialog" flat>
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
    }),
  },
  data: () => ({ dialog: false }),
  methods: {
    edit(e) {
      const { title, rootDir, user } = e.project;
      this.$store.dispatch('ProjectModule/addProject', { title, rootDir, user });
      this.dialog = !this.dialog;
    },
  },
};
</script>
