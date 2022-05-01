<template>
    <v-app>
        <Snack v-model="$root.snack.visible" v-bind="$root.snack" transition="slide-y-reverse-transition" bottom left />
        <ErrorHandler :value="$root.error" max-width="500" icon="mdi-alert" color="error" dark scrollable :fullscreen="$vuetify.breakpoint.smAndDown" />
        <GlobalModal v-model="$root.modal.visible" v-bind="{ ...$root.modal, ...$root.modal.attrs }" scrollable />

        <v-fade-transition>
            <v-overlay v-if="!loaded" style="z-index: 25">
                <v-progress-circular indeterminate />
            </v-overlay>
        </v-fade-transition>

        <v-expand-transition>
            <Toolbar
                v-if="showToolbar"
                color="transparent"
                class="py-4 px-md-2"
                absolute
                app
                flat
                tile
                @drawer="drawer = true"
            />
        </v-expand-transition>

<!--        <Sidebar-->
<!--            v-if="showSidebar"-->
<!--            v-model="drawer"-->
<!--            :social-links="$root.socialLinks"-->
<!--            width="270"-->
<!--            fixed-->
<!--            temporary-->
<!--            :right="$vuetify.rtl"-->
<!--        />-->

        <v-main>
            <router-view :key="$route.path" />
        </v-main>

        <Footer
            :social-links="$root.socialLinks"
        />
    </v-app>
</template>

<script>
import Vue from 'vue';
// import Sidebar from "@/components/layout/Sidebar";
import Toolbar from "@/components/layout/Toolbar";
import Footer from "@/components/layout/Footer";
import ErrorHandler from "@/components/generic/ErrorHandler";
import GlobalModal from "@/components/generic/Modal";
import Snack from "@/components/generic/Snack";
import EventBus from "@/utils/EventBus";
import { rtlLanguages } from "@/locales";

let languageSwitchBus;

export default Vue.extend({
    name: 'App',

    components: { Toolbar, Footer, ErrorHandler, GlobalModal, Snack },

    data: () => ({
        loading: true,
        loaded: false,
        drawer: false,
    }),

    computed: {
        showToolbar() {
            return true;
        },
        showSidebar() {
            return true;
        },
    },

    methods: {
        load() {
            this.loaded = true;
            // this.loading = true;
            // return Services.getDecks()
            //     .then(decks => {
            //         decks.unshift(new DeckModel({ i18n: 'state.unclassified', id: null }));
            //         Object.assign(this.$root, { decks });
            //     })
            //     .catch(this.$handleError)
            //     .finally(() => {
            //         this.loading = false;
            //         this.loaded = true;
            //     });
        },
    },

    created() {
        this.load();

        languageSwitchBus = EventBus.subscribe('LANGUAGE_SWITCH', lang => {
            this.$vuetify.rtl = rtlLanguages.indexOf(lang) !== -1;
        });

        this.$router.beforeEach((to, from, next) => {
            document.title = this.$i18n.t('route.' + to.name);
            next();
        });
        document.title = this.$i18n.t('route.' + this.$route.name);
    },

    destroyed() {
        languageSwitchBus.unsubscribe();
    }
});
</script>
