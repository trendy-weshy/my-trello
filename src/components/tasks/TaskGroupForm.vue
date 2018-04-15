<template>
  <form novalidate name="tasksForm" @keypress.enter="!$v.invalid && submit()">
      <v-text-field
        label="Name of the Task Group"
        single-line
        prepend-icon="library_add"
        v-model.trim="model.name"
        hint="The name used to identify a list of tasks"
        required
        clearable
        :error="$v.taskGroup.name.$dirty && $v.taskGroup.name.$invalid"
        @input="$v.taskGroup.name.$touch()"></v-text-field>

      <v-btn
        :disabled="!$v.$dirty || $v.$invalid"
        class="mt-4 mb-2"
        color="primary"
        @click.prevent="submit()">
      </v-btn>
  </form>
</template>

<script>
import { isEmpty } from 'lodash';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'TaskGroupFormEditor',
  mixins: [validationMixin],
  props: {
    onSubmit: Function,
    edit: {
      type: Boolean,
      required: false,
    },
    taskGroup: {
      type: Object,
      required: false,
    },
  },
  validations: {
    taskGroup: {
      name: { required },
    },
  },
  data: () => ({
    model: {
      name: '',
    },
  }),
  methods: {
    populateModel() {
      if (this.edit && !isEmpty(this.taskGroup)) {
        this.model = Object.assign({}, this.taskGroup);
      }
    },
    submit() {
      this.$v.$touch();
      this.onSubmit({ taskGroup: this.model });
    },
    clear() {
      this.$v.$reset();
      this.model = { name: '' };
    },
  },
  mounted() {
    this.populateModel();
  },
};
</script>
