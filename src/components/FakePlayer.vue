<template>
    <v-sheet class="fill-height pb-0 fake-player" color="transparent" dark>
        <v-container class="d-flex flex-column fill-height pa-0 w-100">
            <v-row class="w-100 pt-1 px-2" style="flex: 0; opacity: 0.66" no-gutters>
                <v-col cols="3" class="text-no-wrap">
                    <div class="d-flex align-center">
                        <img :src="logo" height="20" width="20" />
                        <span :class="{
                            'title text-none font-weight-light white--text': true,
                            'ml-2': !$vuetify.rtl,
                            'mr-2': $vuetify.rtl,
                        }" style="font-size: 0.75rem !important">Polymind</span>
                    </div>
                </v-col>
                <v-col cols="6" class="text-center"></v-col>
                <v-col cols="3" class="text-no-wrap text-right text-uppercase">
                    <small>
                        <small v-text="languageFrom"></small>
                        /
                        <small v-text="languageTo"></small>
                    </small>
                </v-col>
            </v-row>
            <v-row class="w-100 d-flex px-2" style="flex: 1" no-gutters>
                <v-col cols="3" class="text-no-wrap"></v-col>
                <v-col cols="6" class="text-center d-flex align-center justify-center">
                    <span v-if="index >= 0" :class="{
                        'text-uppercase font-weight-bold word': true,
                        'primary--text text-h5 text-md-h4': showFront,
                        'text-h4 text-md-h3': showBack,
                    }" v-text="deck[index][showFront ? 0 : 1]"></span>
                </v-col>
                <v-col cols="3" class="text-no-wrap text-right"></v-col>
            </v-row>
            <v-row class="w-100 pb-1 px-2" style="flex: 0" no-gutters>
                <v-col cols="3" class="text-no-wrap d-flex" style="gap: 0.5rem">
                    <v-icon disabled small>mdi-pause</v-icon>
                    <v-icon disabled small>mdi-volume-high</v-icon>
                </v-col>
                <v-col cols="6" class="text-center d-flex justify-center align-center" style="gap: 0.5rem">
                    <v-icon disabled small>mdi-page-first</v-icon>
                    <small><small>{{index + 1}} of {{deck.length}}</small></small>
                    <v-icon disabled small>mdi-page-last</v-icon>
                </v-col>
                <v-col cols="3" class="text-no-wrap text-right">
                    <v-icon disabled small>mdi-fullscreen</v-icon>
                </v-col>
            </v-row>
            <v-progress-linear v-once id="progress_bar" :value="progress" height="3" />
        </v-container>
    </v-sheet>
</template>

<script lang="ts">
import {Vue, Component, VModel, Prop} from 'vue-property-decorator';
import logo from '@/assets/images/polymind-light.svg'

@Component
export default class FakePlayer extends Vue {

    @VModel() deck!: Array<Array<string>>
    @Prop() languageFrom!: string
    @Prop() languageTo!: string

    logo = logo
    index = -1
    progress = 0
    delay = 5000
    startTime: Date = new Date()
    endTime: Date = new Date()
    showBack = false
    showFront = true
    repeat = 0

    get isOtherSide() {
        return this.showBack;
    }

    get minIndex() {
        return 0;
    }

    get maxIndex() {
        return this.deck.length - 1;
    }

    onFrame(progressBarElement: HTMLElement) {
        const nowTime = new Date().getTime();
        const remainingTime = this.endTime.getTime() - nowTime;
        const originalRange = this.endTime.getTime() - this.startTime.getTime();
        if (remainingTime <= 0) {
            this.next();
            this.setFirstSide(true);
            this.setOtherSide(false);
        } else {
            this.progress = (this.delay - remainingTime) * 100 / this.delay;
            if (progressBarElement) {
                progressBarElement.style.width = this.progress + '%';
            }

            const midProgress = originalRange / 2;
            if (!this.isOtherSide && remainingTime < midProgress) {
                this.setFirstSide(false);
                this.setOtherSide(true);
            }
        }

        requestAnimationFrame(() => this.onFrame(progressBarElement));
    }

    resetTime(date = new Date()) {
        this.startTime = date;
        this.endTime = new Date(date.getTime() + this.delay);
        this.progress = 0;

        const progressBarElement = document.getElementById('progress_bar');
        if (progressBarElement) {
            const element = progressBarElement.querySelector('.v-progress-linear__determinate');
            if (element) {
                // @ts-ignore
                element.style.width = this.progress + '%';
            }
        }
    }

    next() {
        this.repeat = 0;
        this.index++;
        if (this.index > this.maxIndex) {
            this.index = this.minIndex;
        }

        this.resetTime();
    }

    play() {
        const progressBarElement = document.getElementById('progress_bar');
        if (progressBarElement) {
            const element = progressBarElement.querySelector('.v-progress-linear__determinate');
            if (element) {
                // @ts-ignore
                requestAnimationFrame(() => this.onFrame(element));
            }
        }
    }

    setFirstSide(visible: boolean) {
        this.showFront = visible;
        this.showBack = !visible;
    }

    setOtherSide(visible: boolean) {
        this.showBack = visible;
        this.showFront = !visible;
    }

    mounted() {
        this.play();
    }
}
</script>

<style lang="scss" scoped>
.fake-player {
    background: rgb(2,0,36);
    background: linear-gradient(
            315deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(27, 142, 138, .77) 100%
    );
    user-select: none;

    .v-progress-linear {
        transition-duration: 0ms !important;
    }
    .word {
        text-shadow: rgba(0, 0, 0, 1) 1px 1px;
    }
}
</style>
