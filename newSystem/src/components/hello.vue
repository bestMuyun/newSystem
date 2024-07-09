<template>
    <div class="hello">
        <i class="iconfont icon-xihuan"></i><span>很高兴遇见你,{{ userData.name }}。</span>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, onMounted } from 'vue';

export default {

    setup() {
        const store = useStore();
        const userData = ref('');
        userData.value = store.state.user;
        return {
            userData
        }
    }
}

</script>

<style>
.hello {
    font-size: 20px;
    color: #726f70;
    background-image: url("@/assets/img/loginbg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    .icon-xihuan {
        font-size: 30px;
        color: #dd6572;
    }
}
</style>