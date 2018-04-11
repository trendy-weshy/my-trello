<template>
    <v-list>
        <v-subheader>Project Tools</v-subheader>
        <v-list-tile ripple href="javascript:;">
            <v-list-tile-action>
                <v-icon>assignment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Your Tasks</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple href="javascript:;">
            <v-list-tile-action>
                <v-icon>note</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Your Notes</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: 'MyTrelloSidebar',
        data: () => ({
            project: {
                title: 'My Trello User Interface',
                name: 'John Waweru'
            }
        })
    }
</script>

<style lang="sass">

</style>
