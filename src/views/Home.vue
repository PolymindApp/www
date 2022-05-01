<template>
    <v-sheet>
        <Viewport class="d-flex align-center">
            <Hero class="w-100 fill-height pb-12" color="transparent" />
        </Viewport>
        <Viewport color="background" class="d-flex align-center">
            <Voice class="w-100 fill-height py-12" color="transparent" />
        </Viewport>
        <Viewport class="d-flex align-center">
            <Situations class="w-100 fill-height py-12" color="transparent" />
        </Viewport>
        <Wherever class="w-100 py-12" color="primary" dark />
        <Viewport color="background" class="d-flex align-center">
            <UseCases class="w-100 fill-height py-12" color="transparent" />
        </Viewport>
    </v-sheet>
</template>

<script lang="ts">
import Viewport from '@/components/layout/Viewport.vue'
import Hero from '@/views/Home/Hero.vue';
import Voice from '@/views/Home/Voice.vue';
import Situations from '@/views/Home/Situations.vue';
import Wherever from '@/views/Home/Wherever.vue';
import UseCases from '@/views/Home/UseCases.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: { Viewport, Hero, Voice, Situations, Wherever, UseCases },
})
export default class Home extends Vue {

}
</script>
