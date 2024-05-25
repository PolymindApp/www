<template>
    <v-sheet v-bind="$attrs" v-on="$listeners" v-intersect="{
        handler: onIntersect,
        options: {
            threshold: 0.66
        }
    }">
        <v-container>
            <v-row class="justify-center">
                <v-col cols="12" md="5" class="pr-md-12">
                    <div style="max-width: 20rem; margin: 0 auto">
                        <IPhone
                            v-model="images"
                            :index="0"
                            include-border
                        />
                    </div>
                </v-col>
                <v-col cols="12" md="7" class="pl-md-12">
                    <div class="mb-8">
                        <h1 class="text-h4 text-md-h3 text-center font-weight-light" v-html="$t('home.features.title')"></h1>
                        <v-divider class="mt-6 mx-auto" style="max-width: 15rem; border-color: rgba(255, 255, 255, 0.33)" />
                    </div>

                    <v-expansion-panels v-model="panel" light>
                        <v-expansion-panel
                            v-for="feature in features"
                            :key="feature.title"
                            active-class="primary--text"
                        >
                            <v-expansion-panel-header>
                                <span class="text-h5" v-text="feature.title"></span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div class="black--text" v-text="feature.body"></div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TranslateResult } from "vue-i18n";
import IPhone from "@/components/IPhone.vue";
import appImage from '@/assets/images/polymind-app.jpg';

interface IFeature {
    image: string,
    title: string | TranslateResult,
    body: string | TranslateResult,
}

@Component({
    components: {
        IPhone,
    }
})
export default class Features extends Vue {
    panel = 0

    get images(): Array<string> {
        return this.features.map(feature => feature.image);
    }

    get features(): Array<IFeature> {
        return [
            { image: appImage, title: this.$i18n.t('home.features.incrementalLearning.title'), body: this.$i18n.t('home.features.incrementalLearning.body'), },
            { image: appImage, title: this.$i18n.t('home.features.dictionaries.title'), body: this.$i18n.t('home.features.dictionaries.body'), },
            { image: appImage, title: this.$i18n.t('home.features.listManagement.title'), body: this.$i18n.t('home.features.listManagement.body'), },
            { image: appImage, title: this.$i18n.t('home.features.automaticPlayback.title'), body: this.$i18n.t('home.features.automaticPlayback.body'), },
            { image: appImage, title: this.$i18n.t('home.features.multiPlatform.title'), body: this.$i18n.t('home.features.multiPlatform.body'), },
        ];
    }

    onIntersect(entries: Array<any>) {
        this.$root.$emit('toolbarDark', entries[0].isIntersecting)
    }
}
</script>
