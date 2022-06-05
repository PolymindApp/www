<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex align-center justify-center text-center">
                    <h2 class="text-h4 text-md-h3 primary--text" v-text="$t('home.situations.title')"></h2>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mt-6" style="max-width: 40rem">
            <v-row>
                <v-col :key="situation.key" v-for="situation in situations" cols="12" md="6">
                    <v-card dark>
                        <v-img class="rounded-bottom" :aspect-ratio="1.6" :src="situation.thumbnail" />
                        <v-card-actions class="primary justify-center align-center">
                            <span class="text-h6 text-md-h5" v-text="$t('home.situations.' + situation.key)"></span>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import walking from '@/assets/images/situations/walking.jpg';
import driving from '@/assets/images/situations/driving.jpg';
import hiking from '@/assets/images/situations/hiking.jpg';
import relaxing from '@/assets/images/situations/relaxing.jpg';
import sleeping from '@/assets/images/situations/sleeping.jpg';
import working from '@/assets/images/situations/working.jpg';

export default {
    data: () => ({
        situations: [
            { key: 'walking', thumbnail: walking },
            { key: 'driving', thumbnail: driving },
            { key: 'hiking', thumbnail: hiking },
            { key: 'relaxing', thumbnail: relaxing },
            { key: 'sleeping', thumbnail: sleeping },
            { key: 'working', thumbnail: working },
        ],
    }),
}
</script>
