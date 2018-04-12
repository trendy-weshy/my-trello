<template>
  <v-app>
    <router-view></router-view>
    <v-footer fixed dark app color="accent" class="px-5" style="z-index:5 0;">
      &copy; {{ year }} &nbsp; <strong>{{ title }}</strong>&nbsp;-&nbsp;{{ author }}
        <v-tooltip right lazy color="primary">
          <v-icon color="primary" slot="activator" ripple @click="reportBug()" style="cursor: pointer;">bug_report</v-icon>
          <span>Report any bugs</span>
        </v-tooltip>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { isEmpty } from 'lodash';
  import Meta from 'mixins/meta';

  export default {
    mixins: [Meta],
    data: () => ({
      year: new Date().getFullYear(),
      title: 'MyTrello - Your Personal Project Manager',
      author: 'John Waweru',
      social: {
          bitbucket: 'https://bitbucket.org/trendy_weshy',
          twitter: 'https://twitter.com/trendyweshy',
          github: 'https://github.com/trendy-weshy',
          gitlab: 'https://gitlab.com/trendy-weshy',
          email: 'mailto:waweruj00@gmail.com',
      },
      country: 'Nairobi, Kenya.'
    }),
    methods: {
      reportBug: () => window.location.replace('mailto:waweruj00@gmail.com')
    },
    mounted() {
      this.$store.dispatch('ProjectModule/getProject');
    },
    computed: {
      ...mapGetters({
        project: 'ProjectModule/project'
      })
    }
  }
</script>
