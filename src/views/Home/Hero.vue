<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container>
            <v-row>
                <v-col order="last" order-md="first" cols="12" md="6" class="d-flex align-center text-center position-relative text-md-left pr-md-16">
                    <div style="z-index: 2">
                        <i18n path="home.hero.title" class="text-h4 text-md-h3" tag="h1">
                            <span class="primary--text font-weight-thin" v-text="$t('home.hero.titleFlashcards')"></span>
                        </i18n>
                        <p class="subtitle-1 mt-8 mb-0 text--secondary" v-text="$t('home.hero.body')"></p>
                        <v-btn class="mt-6" color="primary" :x-large="$vuetify.breakpoint.mdAndUp" :href="clientUrl">
                            <span v-text="$t('home.hero.tryNow')"></span>
                            <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                    </div>
                </v-col>
                <v-col order="first" order-md="last" cols="12" md="6" class="d-flex flex-column justify-center align-center position-relative mt-12 mb-4 my-md-0">
                    <v-img :src="round" :style="roundStyle" class="round" contain></v-img>
                    <Laptop :style="laptopStyle">
                        <FakePlayer
                            v-model="deck"
                            :language-from="languageFrom.substring(0, 2)"
                            :language-to="languageTo.substring(0, 2)"
                        />
                    </Laptop>
                </v-col>
            </v-row>
        </v-container>

        <div class="primary" style="height: 1.5rem; position: absolute; bottom: 0; width: 100%"></div>
    </v-sheet>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import round from '@/assets/images/round.svg';
import Laptop from '@/components/Laptop.vue';
import FakePlayer from '@/components/FakePlayer.vue';

@Component({
    components: {
        Laptop,
        FakePlayer,
    }
})
export default class Hero extends Vue {

    round = round
    clientUrl = process.env.VUE_APP_CLIENT_URL

    get roundStyle() {
        return {
            width: '100%',
            maxWidth: this.$vuetify.breakpoint.mdAndUp
                ? '95%'
                : '17.5rem',
        }
    }

    get laptopStyle() {
        return {
            transform: this.$vuetify.breakpoint.mdAndUp
                ? 'scale(1.2)'
                : null
        }
    }

    get languageFrom() {
        return this.$i18n.locale;
    }

    get languageTo() {
        return this.$i18n.locale === 'en-CA' ? 'es-MX' : 'en-CA';
    }

    get deck() {
        const deck = [];
        for (let i = 1; i <= 3; i++) {
            deck.push([
                this.$i18n._t('home.hero.deck.word' + i, this.languageFrom, this.$i18n.messages),
                this.$i18n._t('home.hero.deck.word' + i, this.languageTo, this.$i18n.messages),
            ]);
        }
        return deck;
    }
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
