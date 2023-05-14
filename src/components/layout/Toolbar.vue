<template>
    <v-app-bar v-bind="$attrs" v-on="$listeners" v-scroll="onScroll">

        <v-btn text x-large exact class="px-2" :to="{ name: 'home' }" @click="() => goTo('#app')">
            <v-img :src="logo" width="2.5rem" />
            <span :class="{
                'text-h6 text-none font-weight-light': true,
                'primary--text': !dark,
                'white--text': dark,
                'ml-4': !$vuetify.rtl,
                'mr-4': $vuetify.rtl,
            }">Polymind</span>
        </v-btn>

        <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer />

            <div class="text-right mr-12">
                <v-tabs v-model="panel" background-color="transparent" height="80" slider-size="3" :dark="dark">
                    <v-tab
                        v-for="(item, itemIdx) in panels"
                        :key="item"
                        :class="{
                            'd-none': itemIdx === 0
                        }"
                        v-text="$t('toolbar.' + item)"
                        @click="() => goTo('#' + item)"
                    ></v-tab>
                </v-tabs>
            </div>
        </template>

        <v-spacer />

        <v-btn :color="!dark ? 'primary' : 'white'" rounded :large="$vuetify.breakpoint.mdAndUp" :href="clientUrl">
            <span v-text="$t('toolbar.openClient')"></span>
            <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import logoLight from '@/assets/images/polymind-light.svg'
import logoDark from '@/assets/images/polymind-dark.svg'

let goingToTimeout;

export default {
    name: "Toolbar",

    props: {
        dark: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        logo() {
            return this.dark ? logoLight : logoDark;
        },
    },

    methods: {
        onScroll(event) {
            this.flat = window.scrollY === 0;
            if (window.scrollY === 0) {
                this.panel = null;
            }
        },

        goTo(key) {
            if (this.isGoingTo !== key) {
                this.isGoingTo = key;
                this.$vuetify.goTo(key);
                clearTimeout(goingToTimeout)
                goingToTimeout = setTimeout(() => {
                    this.isGoingTo = null;
                }, 600);
            }
        }
    },

    data: () => ({
        panel: null,
        panels: [
            'app', // Invisible hack
            'howItWorks',
            'features',
            'dictionaries',
            'schooling',
            'mobility',
        ],
        clientUrl: process.env.VUE_APP_CLIENT_URL,
        isGoingTo: null,
    }),

    created() {
        this.$root.$on('intersect', id => {
            if (this.isGoingTo === null) {
                this.panel = this.panels.indexOf(id) || 0;
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.theme--light.v-btn--active:before,
.theme--light.v-btn--active:hover:before {
    opacity: 0;
}
</style>
