<template>
    <v-dialog v-model="taskForm.openModal" persistent max-width="450px" lazy transition="dialog-bottom-transition">
      <v-card>
        <v-card-title class="headline px-4">
            <span v-if="taskForm.edit">Edit Task</span>
            <span v-if="!taskForm.edit">Add a New Task</span>
        </v-card-title>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" class="mr-3" @click.native.prevent="close()" flat>
                <v-icon>close</v-icon> Close
            </v-btn>
            <v-btn color="primary" class="mr-3" @click.native.prevent="save()">
                <span v-if="taskForm.edit"><v-icon>edit</v-icon> Save Changes</span>
                <span v-if="!taskForm.edit"><v-icon>add_box</v-icon> Add Task</span>
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';

export default {
  name: 'TaskEditorComponent',
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      taskForm: 'UI/UIForms/get_TaskForm',
    })
  },
  methods: {
    save() {
      //
    },
    close() {
      // this.$v.$reset();
      this.$emit('close:task-editor');
    },
  },
};
</script>
