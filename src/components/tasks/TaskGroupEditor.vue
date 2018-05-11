<template>
  <v-dialog v-model="dialog" persistent max-width="450px" lazy transition="dialog-bottom-transition">

    <v-card tile>
      <v-toolbar card dark color="accent">
        <v-btn icon @click.native="$emit('close:task-group-editor')" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span v-if="!edit">Add a New Task Group</span>
          <span v-if="edit">Edit Task Group</span>
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip color="accent" bottom>
          <v-btn slot="activator" color="primary" @click.prevent="!$v.$invalid && save()">
            <v-icon dark>done_all</v-icon>&nbsp;&nbsp;Done
          </v-btn>
          <span>Save Task Group</span>
        </v-tooltip>
      </v-toolbar>

      <form novalidate name="tasksForm" @submit.prevent="!$v.$invalid && save()" class="px-4 py-4">
          <v-text-field
            autofocus
            label="Name of the Task Group"
            single-line
            prepend-icon="library_add"
            v-model.lazy="model.name"
            hint="The name used to identify a list of tasks"
            required
            clearable
            :error="$v.model.name.$dirty && $v.model.name.$invalid"
            @input="$v.model.name.$touch()"></v-text-field>
      </form>

    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { isEmpty } from 'lodash';

export default {
  name: 'TaskGroupEditorModal',
  mixins: [validationMixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    stagedTaskGroup: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    model: { name: '' },
  }),
  validations: {
    model: { name: { required } },
  },
  methods: {
    save() {
      this.$v.$touch();
      if (this.edit && !isEmpty(this.stagedTaskGroup)) {
        this.$store.dispatch('TasksModule/editGroup', { name: this.model.name, groupId: this.stagedTaskGroup.id })
      } else {
        this.$store.dispatch('TasksModule/addNewGroup', this.model.name);
      }
      
      this.clear();
      this.$emit('close:task-group-editor');
    },
    clear() {
      this.$v.$reset();
      this.model = { name: '' };
    },
    populateTaskGroupModel() {
      if (this.edit && !isEmpty(this.stagedTaskGroup)) {
        this.model = Object.assign({}, { name: this.stagedTaskGroup.name });
      }
    },
  },
  mounted() {
    this.populateTaskGroupModel();
    console.log('i ran!');
  },
};
</script>
