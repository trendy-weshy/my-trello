<template>
  <v-dialog v-model="taskGroupForm.openModal" persistent max-width="450px" lazy transition="dialog-bottom-transition">

    <v-card tile>
      <v-toolbar card dark color="accent">
        <v-btn icon @click.native="close()" dark tabindex="2">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span v-if="!taskGroupForm.edit">Add a New Task Group</span>
          <span v-if="taskGroupForm.edit">Edit Task Group</span>
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip color="accent" bottom tabindex="3">
          <v-btn slot="activator" color="primary" @click.prevent="!$v.$invalid && save()">
            <v-icon dark>done_all</v-icon>&nbsp;&nbsp;Done
          </v-btn>
          <span>Save Task Group</span>
        </v-tooltip>
      </v-toolbar>

      <form novalidate name="tasksForm" @submit.prevent="!$v.$invalid && save()" class="px-4 py-4">
          <v-text-field
            tabindex="1"
            autofocus
            label="Name of the Task Group"
            single-line
            prepend-icon="library_add"
            v-model="model.name"
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
import { mapGetters } from 'vuex';
import { isNil } from 'lodash';

export default {
  name: 'TaskGroupEditorModal',
  mixins: [validationMixin],
  props: {
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
  computed: {
    ...mapGetters({
      taskGroupForm: 'UI/UIForms/get_TaskGroupForm',
    }),
  },
  validations: {
    model: { name: { required } },
  },
  methods: {
    save() {
      this.$v.$touch();

      if (this.taskGroupForm.edit) {
        this.$store.dispatch('TasksModule/editGroup', { name: this.model.name, groupId: this.taskGroupForm.stageData.id });
      } else {
        this.$store.dispatch('TasksModule/addNewGroup', this.model.name);
      }

      this.clear();
      this.$store.commit('UI/UIForms/toggle_TaskGroupForm');
    },
    clear() {
      this.$v.$reset();
      this.model = { name: '' };
    },
    close() {
      this.$store.commit('UI/UIForms/toggle_TaskGroupForm');
    },
  },
  watch: {
    taskGroupForm: {
      deep: true,
      handler(newV) {
        if (newV.edit && !isNil(newV.stageData)) {
          this.$v.$reset();
          this.model = { name: newV.stageData.name };
        }
      },
    },
  },
};
</script>
