<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container class="text-center" style="max-width: 45rem">
            <v-img :src="logo" :height="$vuetify.breakpoint.mdAndUp ? '8rem' : '6rem'" contain></v-img>
            <h2 class="text-h4 text-md-h2 mt-6" v-text="$t('home.callToAction.title')"></h2>
            <p class="text-md-h6 mt-3" v-text="$t('home.callToAction.body')"></p>
            <v-btn light rounded x-large :href="clientUrl">
                <v-icon left>mdi-login-variant</v-icon>
                <span v-text="$t('home.callToAction.openAccount')"></span>
            </v-btn>
            <br>
            <v-btn class="mt-8" :href="githubHref" target="_blank" text>
                <v-icon left>mdi-github</v-icon>
                <span class="text-none" v-text="$t('home.callToAction.wereOnGitHub')"></span>
            </v-btn>
        </v-container>
    </v-sheet>
</template>

<script>
import logo from '@/assets/images/polymind-light.svg'

export default {
    name: "CallToAction",

    data: () => ({
        logo,
        clientUrl: process.env.VUE_APP_CLIENT_URL,
        githubHref: process.env.VUE_APP_GITHUB_URL,
    }),
}
</script>
