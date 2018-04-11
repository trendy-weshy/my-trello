<template>
    <form name="addProject" class="pb-5">

        <v-text-field label="Project Title" v-model="project.title" required></v-text-field>
        <v-text-field label="Project Root Path" v-model="project.rootDir" required></v-text-field>
        <v-text-field label="Your Name" v-model="project.user" required></v-text-field>

        <v-btn fab absolute bottom right class="mt-4" color="primary" @click.prevent="$emit('submit-project', { project })">
            <v-icon>note_add</v-icon>
        </v-btn>
    </form>
</template>

<script>
    export default {
        name: 'MyTrelloProjectName',
        props: {
            projectData: {
                type: Object,
                required: false,
                default: () => ({})
            }
        },
        data: () => ({
            project: {
                title: '',
                rootDir: '',
                user: ''
            }
        }),
        methods: { }
    }
</script>
