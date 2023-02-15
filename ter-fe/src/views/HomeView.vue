<template>
  <div>
  <hello-world />
  <!-- <test-google/> -->
</div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld';
  // import TestGoogle from '../views/google.vue';

  export default {
    name: 'HomeView',

    components: {
      // TestGoogle,
      HelloWorld,
    },
  }
</script>
