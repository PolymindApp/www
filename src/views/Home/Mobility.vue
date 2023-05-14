<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <div style="flex: 1">
            <v-container>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <h2 class="text-h4 text-md-h3" v-text="$t('home.mobility.title')"></h2>
                        <p class="mt-4 mb-0 text--disabled" v-text="$t('home.mobility.body')"></p>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="mt-6" style="max-width: 60rem">
                <v-row>
                    <v-col :key="situation.key" v-for="situation in situations" cols="6" md="4">
                        <v-card dark>
                            <v-img class="rounded-bottom" :aspect-ratio="1.6" :src="situation.thumbnail" />
                            <v-card-actions class="primary justify-center align-center">
                                <span class="body-1 text-md-h5" v-text="$t('home.mobility.' + situation.key)"></span>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import walking from '@/assets/images/mobility/walking.jpg';
import driving from '@/assets/images/mobility/driving.jpg';
import hiking from '@/assets/images/mobility/hiking.jpg';
import relaxing from '@/assets/images/mobility/relaxing.jpg';
import sleeping from '@/assets/images/mobility/sleeping.jpg';
import working from '@/assets/images/mobility/working.jpg';

@Component
export default class Mobility extends Vue {
    situations = [
        { key: 'walking', thumbnail: walking },
        { key: 'driving', thumbnail: driving },
        { key: 'hiking', thumbnail: hiking },
        { key: 'relaxing', thumbnail: relaxing },
        { key: 'sleeping', thumbnail: sleeping },
        { key: 'working', thumbnail: working },
    ]
}
</script>
