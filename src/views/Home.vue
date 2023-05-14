<template>
    <v-sheet>
        <Viewport id="home" class="d-flex align-center" style="min-height: calc(100vh - 80px)">
            <Hero class="w-100 fill-height pb-12" color="transparent" />
        </Viewport>
        <Viewport id="howItWorks" color="background" class="d-flex align-center">
            <HowItWorks class="w-100 fill-height py-12" color="transparent" />
        </Viewport>
        <Viewport id="features" color="primary" class="d-flex align-center">
            <Features class="w-100 fill-height py-12" color="transparent" dark />
        </Viewport>
        <Viewport id="dictionaries" color="background" class="d-flex align-center">
            <Dictionaries class="w-100 fill-height py-12" color="transparent" />
        </Viewport>
        <Viewport id="schooling" color="background" class="d-flex align-center">
            <Schooling class="w-100 fill-height py-md-12" color="transparent" />
        </Viewport>
        <Viewport id="mobility" color="background" class="d-flex flex-column" :background="{
            url: backgroundImg, // http://getdrawings.com/get-vector#mountain-vector-png-4.png
            size: 'cover',
            position: 'center bottom'
        }">
            <Mobility class="w-100 d-flex flex-column pt-12" style="flex: 1" color="transparent" />
        </Viewport>
        <Viewport id="cta" color="primary" class="d-flex align-center" dark>
            <CallToAction class="w-100 fill-height py-12" color="transparent" />
        </Viewport>

        <Footer
            :social-links="$root.socialLinks"
            :absolute="$vuetify.breakpoint.mdAndUp"
            color="primary"
            dark
        />
    </v-sheet>
</template>

<script lang="ts">
import Viewport from '@/components/layout/Viewport.vue'
import Hero from '@/views/Home/Hero.vue';
import HowItWorks from '@/views/Home/HowItWorks.vue';
import Features from '@/views/Home/Features.vue';
import Dictionaries from '@/views/Home/Dictionaries.vue';
import Mobility from '@/views/Home/Mobility.vue';
import Schooling from '@/views/Home/Schooling.vue';
import CallToAction from '@/views/Home/CallToAction.vue';
import Footer from "@/components/layout/Footer.vue";
import {Component, Vue} from 'vue-property-decorator';
import backgroundImg from '@/assets/images/background.png';

@Component({
    components: {
        Viewport,
        Hero,
        HowItWorks,
        Features,
        Dictionaries,
        Mobility,
        Schooling,
        CallToAction,
        Footer
    },
})
export default class Home extends Vue {
    backgroundImg = backgroundImg
}
</script>
