<template>
    <v-app-bar v-bind="$attrs" v-on="$listeners">

        <v-btn text x-large exact class="px-2" :to="{ name: 'home' }">
            <v-img :src="logo" width="2.5rem" />
            <span :class="{
                'text-h6 text-none font-weight-light primary--text': true,
                'ml-4': !$vuetify.rtl,
                'mr-4': $vuetify.rtl,
            }">Polymind</span>
        </v-btn>

        <v-spacer />

        <v-btn color="primary" rounded :x-large="$vuetify.breakpoint.mdAndUp" :href="clientUrl">
            <span v-text="$t('toolbar.openClient')">Open app</span>
            <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import logoLight from '@/assets/images/polymind-light.svg'
import logoDark from '@/assets/images/polymind-dark.svg'

export default {
    name: "Toolbar",

    computed: {
        logo() {
            return this.$vuetify.theme.dark ? logoLight : logoDark;
        },
    },

    data: () => ({
        clientUrl: process.env.VUE_APP_CLIENT_URL,
    }),
}
</script>

<style lang="scss" scoped>
.theme--light.v-btn--active:before,
.theme--light.v-btn--active:hover:before {
    opacity: 0;
}
</style>
