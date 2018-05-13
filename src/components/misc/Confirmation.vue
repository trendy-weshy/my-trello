<template>
    <span>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ title ? title : 'Are you sure ?' }}</v-card-title>
        <v-card-text>
           {{ message }}
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" dark flat @click.native="$emit('user:answer', { action: false, id: id })">
                {{ falseyPlaceholder ? falseyPlaceholder : 'No' }}
            </v-btn>
            <v-btn color="secondary" dark @click.native="$emit('user:answer', {  action: true, id: id  })">
              {{ truthyPlaceholder ? truthyPlaceholder : 'Yes, I agree' }}
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </span>
</template>

<script>
export default {
  name: 'ConfirmationComponent',
  props: {
      id: {
          type: String,
          required: true,
      },
      dialog: {
          type: Boolean,
          default: false,
      },
      title: {
        type: String,
        required: false,
      },
      message: {
          type: String,
          required: true,
      },
      falseyPlaceholder: {
        type: String,
        required: false,
      },
      truthyPlaceholder: {
        type: String,
        required: false,
      },
  },
};
</script>
