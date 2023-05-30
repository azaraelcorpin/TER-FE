<template>
  <div>
   <router-view v-if="$route.meta.isChild" />
  <div v-else>
    <h1>This is How to page</h1>
    
  </div>    
  </div>
</template>
