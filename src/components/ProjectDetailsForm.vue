<template>
    <form novalidate name="addProject" class="pb-5" @keypress.enter.prevent="!$v.$invalid && submit()">
        <v-text-field
            label="Title"
            single-line
            prepend-icon="title"
            v-model.trim="project.title"
            hint="Enter the title of your project"
            required
            clearable
            :error="$v.project.title.$dirty && $v.project.title.$invalid"
            @input="$v.project.title.$touch()"></v-text-field>

        <v-text-field
            label="Root Path"
            single-line
            prepend-icon="directions"
            v-model.trim="project.rootDir"
            required
            hint="Please make sure to enter a directory that exist"
            clearable
            :error="$v.project.rootDir.$dirty && $v.project.rootDir.$invalid"
            @input="$v.project.rootDir.$touch()"></v-text-field>

        <v-text-field
            label="Name"
            single-line
            prepend-icon="portrait"
            hint="Enter your name"
            v-model.trim="project.user"
            required
            clearable
            :error="$v.project.user.$dirty && $v.project.user.$invalid"
            @input="$v.project.user.$touch()"></v-text-field>

        <v-btn
            v-if="provideSubmitBtn"
            fab
            absolute
            bottom
            right
            :disabled="!$v.$dirty || $v.$invalid"
            class="mt-4"
            color="primary"
            @click.prevent="submit()">

            <v-icon>note_add</v-icon>
        </v-btn>

    </form>
</template>

<script>
import { isEmpty } from 'lodash';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'MyTrelloProject',
  mixins: [validationMixin],
  props: {
    provideSubmitBtn: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    stagedProject: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  validations: {
    project: {
      title: { required },
      user: { required },
      rootDir: { required },
    },
  },
  data: () => ({
    project: {
      title: '',
      rootDir: '',
      user: '',
    },
  }),
  methods: {
    submit() {
      this.$v.$touch();
      this.$emit('submit-project', { project: this.project });
    },
    clear() {
      this.$v.$reset();
      this.project = {
        title: '',
        rootDir: '',
        user: '',
      };
    },
    populateProjectModel() {
      if (this.edit && !isEmpty(this.stagedProject)) {
        this.project = Object.assign({}, this.stagedProject);
      }
    },
  },
  mounted() {
    this.populateProjectModel();
  },
};
</script>
