<template>
  <v-flex xs6 justify-center align-baseline>
    <v-card color="primary" dark>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div class="headline">
                <h3>No Tasks Found</h3>
              </div>
              <p>Looks like you haven't created any task groups or tasks.</p>
            </div>
          </v-flex>
          <v-flex xs5>
            <v-card-media
              :src="`${baseUrl}not-found.png`"
              height="125px"
              contain></v-card-media>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="mb-4">
        <v-btn color="accent" flat dark>
          <v-icon dark>create_new_folder</v-icon>&nbsp;&nbsp;Create new Task Group
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'NoTasksView',
  data: () => ({
    baseUrl: process.env.BASE_URL,
  }),
};
</script>
