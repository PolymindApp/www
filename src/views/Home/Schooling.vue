<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1 class="text-h5 text-md-h4 text-center text-md-left" v-html="$t('home.schooling.title')"></h1>
                    <p class="mt-4 mb-0 text--secondary" v-html="$t('home.schooling.body')"></p>
                </v-col>
            </v-row>
            <v-row class="mt-4">
                <v-col :key="feature.key" v-for="feature in features" cols="12" sm="6" md="6" lg="4" class="d-flex flex-column align-stretch">
                    <v-card class="fill-height d-flex align-center">
                        <v-img :src="feature.thumbnail" transition="fade" style="width: 5rem; border-top-right-radius: 0; border-bottom-right-radius: 0; height: 100%" alt="Thumbnail" />
                        <div class="pa-4 pa-lg-8">
                            <h2 class="text-h5 text-md-h4 primary--text font-weight-light mb-4" v-text="$t('home.schooling.' + feature.key + '.title')"></h2>
                            <div class="text--secondary" v-text="$t('home.schooling.' + feature.key + '.body')"></div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <p class="mb-0 text--secondary" v-html="$t('home.schooling.footer')"></p>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import Vue from 'vue';
import language from '@/assets/images/schooling/language.jpg';
import geography from '@/assets/images/schooling/geography.jpg';
import anatomy from '@/assets/images/schooling/anatomy.jpg';
import biology from '@/assets/images/schooling/biology.jpg';
import history from '@/assets/images/schooling/history.jpg';
import law from '@/assets/images/schooling/law.jpg';

export default Vue.extend({
    data: () => ({
        features: [
            { key: 'language', thumbnail: language, },
            { key: 'geography', thumbnail: geography, },
            { key: 'anatomy', thumbnail: anatomy, },
            { key: 'biology', thumbnail: biology, },
            { key: 'history', thumbnail: history, },
            { key: 'law', thumbnail: law, },
        ],
    }),
});
</script>
