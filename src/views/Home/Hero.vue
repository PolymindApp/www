<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container>
            <v-row>
                <v-col order="last" order-md="first" cols="12" md="6" class="d-flex flex-column justify-center text-center text-md-left">
                    <h1 class="text-h4 text-md-h3 font-weight-light primary--text" v-text="$t('home.hero.title')"></h1>
                    <p class="subtitle-1 mt-8 mb-0" v-text="$t('home.hero.body')"></p>
                </v-col>
                <v-col order="first" order-md="last" cols="12" md="6" class="d-flex flex-column justify-center align-center position-relative mt-12 mb-4 my-md-0">
                    <v-img :src="round" :style="roundStyle" class="round" contain></v-img>
                    <video v-if="supportsTransparentVideo" :style="videoStyle" muted autoplay loop>
                        <source :src="video" type="video/webm">
                    </video>
                    <img v-else :src="fallbackImg" :style="videoStyle" title="Your browser does not support the <video> tag" />
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import round from '@/assets/images/round.svg';

export default  {
    data: () => ({
        round,
        video: '/assets/videos/hero.webm',
        fallbackImg: '/assets/videos/hero.png',
        supportsTransparentVideo: ![
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform),
    }),

    computed: {
        roundStyle() {
            return {
                width: '100%',
                maxWidth: this.$vuetify.breakpoint.mdAndUp
                    ? '85%'
                    : '20rem',
            }
        },
        videoStyle() {
            return {
                zIndex: 1,
                maxHeight: '70vh',
                minHeight: '20rem',
                pointerEvents: 'none',
                width: '100%',
                maxWidth: this.$vuetify.breakpoint.mdAndUp
                    ? '100%'
                    : '20rem',
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.round {
    position: absolute;
    animation: spin 24s linear infinite;
    pointer-events: none;
    user-select: none;
}
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
