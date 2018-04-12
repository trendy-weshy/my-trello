<template>
    <form name="addProject" class="pb-5">
        <v-text-field
            label="Project Title"
            single-line
            prepend-icon="title"
            v-model.trim="project.title"
            required
            clearable
            :error="$v.project.title.$dirty && $v.project.title.$invalid"
            @input="$v.project.title.$touch()"></v-text-field>

        <v-text-field
            label="Project Root Path"
            single-line
            prepend-icon="directions"
            v-model.trim="project.rootDir"
            required
            clearable
            :error="$v.project.rootDir.$dirty && $v.project.rootDir.$invalid"
            @input="$v.project.rootDir.$touch()"></v-text-field>

        <v-text-field
            label="Your Name"
            single-line
            prepend-icon="portrait"
            v-model.trim="project.user"
            required
            clearable
            :error="$v.project.user.$dirty && $v.project.user.$invalid"
            @input="$v.project.user.$touch()"></v-text-field>

        <v-btn
            fab
            absolute
            bottom
            right
            :disabled="!$v.project.$dirty || $v.project.$invalid"
            class="mt-4"
            color="primary"
            @click.prevent="submit()">

            <v-icon>note_add</v-icon>
        </v-btn>

    </form>
</template>

<script>
    import { isEmpty, isNil } from 'lodash';
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators';

    export default {
        name: 'MyTrelloProject',
        mixins: [validationMixin],
        props: {
            edit: {
                type: Boolean,
                default: false
            }
        },
        validations: {
            project: {
                title: { required },
                user: { required },
                rootDir: { required },
            } 
        },
        data: () => ({
            project: {
                title: '',
                rootDir: '',
                user: ''
            }
        }),
        methods: {
            submit () {
                this.$v.$touch();
                this.$emit('submit-project', { project: this.project });
            },
            clear () {
                this.$v.$reset();
                this.project = {
                    title: '',
                    rootDir: '',
                    user: ''
                };
            }
        }
    }
</script>
