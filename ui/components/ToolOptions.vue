<template>
    <v-menu lazy transition="slide-x-transition">
        <v-btn slot="activator" small color="white" dark fab flat>
            <v-icon>build</v-icon>
        </v-btn>
        <v-list>
            <v-list-tile @click="dummyMethod('about')">
                <v-list-tile-action>
                    <v-icon>info_outline</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>About MyTrello</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="dummyMethod('about')">
                <v-list-tile-action>
                    <v-icon>toc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Your Activity Log</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-tooltip left lazy>
                        <v-icon color="error" slot="activator">warning</v-icon>
                        <span>Coming Soon...</span>
                    </v-tooltip>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider />       
            <v-list-tile @click="$emit('console:exit')">
                <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Exit This Project</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'MyTrelloToolOptions',
        computed: {
            ...mapGetters({
                project: 'ProjectModule/project'
            })
        },
        methods: {
            dummyMethod: v => console.dir(v)
        },
    }
</script>
