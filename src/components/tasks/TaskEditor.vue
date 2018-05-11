<template>
    <v-dialog v-model="dialog" persistent max-width="450px" lazy transition="dialog-bottom-transition">

        <v-card tile>
            <v-card-title>
                Add a new Task
            </v-card-title>
        </v-card>

    </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';

export default {
  name: 'TaskEditorComponent',
  mixins: [validationMixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  methods: {
    save() {
      //
    },
    close() {
      this.$v.reset();
      this.$emit('close:add-task-editor');
    },
  },
};
</script>
