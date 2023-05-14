<template>
    <v-sheet v-bind="$attrs" v-on="$listeners" class="overflow-hidden">
        <v-container style="z-index: 1; position: relative">
            <v-row>
                <v-col cols="12" md="6" class="pr-md-16 d-flex flex-column pt-md-12">
                    <div class="mb-6">
                        <h3 class="text-h3 primary--text" v-text="$t('home.dictionaries.subtitle')"></h3>
                        <v-divider class="mt-6 black" style="max-width: 5rem; opacity: 0.15" />
                    </div>
                    <p class="body-1 text--secondary mb-0" v-text="$t('home.dictionaries.body')"></p>
                </v-col>
                <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="6" style="max-height: calc(100vh - 96px - 80px)">
                    <v-row class="mansory">
                        <v-col
                            v-for="(dictionary, dictionaryIdx) in dictionaries"
                            :key="dictionaryIdx"
                            cols="4"
                        >
                            <IPhone v-model="dictionary.image" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <v-sheet v-if="$vuetify.breakpoint.mdAndUp" class="footer" style="padding-bottom: 15rem" color="primary" dark>
            <v-container>
                <v-row>
                    <h1 class="text-uppercase background--text font-weight-black text-lg-h1 text-h2" v-text="$t('home.dictionaries.title')"></h1>
                </v-row>
            </v-container>
        </v-sheet>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import IPhone from "@/components/IPhone.vue";
import language from '@/assets/images/schooling/language.jpg';
import geography from '@/assets/images/schooling/geography.jpg';
import anatomy from '@/assets/images/schooling/anatomy.jpg';
import biology from '@/assets/images/schooling/biology.jpg';
import history from '@/assets/images/schooling/history.jpg';

interface IDictionary {
    image: string,
}

@Component({
    components: {
        IPhone,
    }
})
export default class Dictionaries extends Vue {

    dictionaries: Array<IDictionary> = []

    created() {
        this.dictionaries.push(...[
            { image: language,  },
            { image: geography, },
            { image: anatomy, },
            { image: biology, },
            { image: history, },
            { image: language, },
            { image: geography, },
            { image: anatomy, },
            { image: biology, },
            { image: history, },
            { image: language, },
            { image: geography, },
            { image: anatomy, },
            { image: biology, },
            { image: history, },
        ])
    }
}
</script>

<style lang="scss" scoped>
.mansory {
    transform: rotateZ(-10deg) translateX(5rem);
    margin-top: -20rem;

    & > :nth-child(3n - 1) {
        margin-top: -12.5rem;
    }
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    h1 {
        position: absolute;
        top: -0.2em;
    }
}
</style>
