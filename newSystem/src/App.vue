<template>
    <div id="app">
        <router-view />
    </div>
    <!-- <register></register> -->
</template>

<script>
import { useRouter } from 'vue-router';
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import index from '@/components/index.vue'


export default {
    name: 'App',
    data() {
        return
    },
    components: {
        login,
        register,
        index
    }
}


</script>



<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}

html {
    width: 100%;
    height: 100%;
}

body {
    height: 100%;
}
</style>
