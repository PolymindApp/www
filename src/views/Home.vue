<template>
    <Viewport class="d-flex align-center py-12">
        <Hero class="fill-height" />
    </Viewport>
</template>

<script lang="ts">
import Viewport from '@/components/layout/Viewport.vue'
import Hero from '@/views/Home/Hero.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: { Hero, Viewport },
})
export default class Home extends Vue {

}
</script>
