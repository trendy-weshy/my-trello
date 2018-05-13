<template>
    <form novalidate name="addProject" class="pb-5" @keypress.enter.prevent="!$v.$invalid && submit()">
        <v-text-field
            tabindex="1"
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
            tabindex="2"
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
            tabindex="3"
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
            tabindex="4"
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
import { isNil } from 'lodash';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'MyTrelloProject',
  mixins: [validationMixin],
  props: {
    provideSubmitBtn: {
      type: Boolean,
      default: false,
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
  computed: {
    ...mapGetters({
      projectForm: 'UI/UIForms/get_ProjectForm',
    }),
  },
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
  },
  watch: {
    projectForm: {
      handler: function (newV) {
        if (newV.edit && !isNil(newV.stageData)) {
          this.$v.$reset();
          this.project = Object.assign({}, newV.stageData);
        }
      },
      deep: true,
      immediate: true
    },
  },
};
</script>
