<template>
    <v-sheet v-bind="$attrs" v-on="$listeners" :dark="dark">
        <v-container>

            <div class="text-center mx-auto position-relative" style="max-width: 50rem; z-index: 2">
                <h1 :class="{
                    'text-h4 text-md-h3 font-weight-light': true,
                    'primary--text': !dark
                }" v-html="$t('home.voice.title')"></h1>

                <v-btn
                    class="mt-5 mt-md-12 mb-n12 mb-n4"
                    color="primary"
                    :height="btnSize * 1.5"
                    :width="btnSize * 1.5"
                    :disabled="!audio || playing"
                    x-large
                    fab
                    @click="toggle()"
                >
                    <v-icon :size="btnSize">mdi-play</v-icon>
                </v-btn>
            </div>

            <div class="tiles-container">
                <div ref="tiles" class="tiles">
                    <div v-for="i in 100" :key="i"></div>
                </div>
            </div>

            <div class="mt-6">
                <div class="text-center text-h5" v-text="$t('home.voice.alsoAvailable')"></div>
                <div class="d-flex align-center justify-center mt-4" style="gap: 1rem">
                    <v-chip :key="locale.value" v-for="locale in availableLocales" :disabled="playing" v-text="locale.text" @click="() => handleSwitchLanguageClick(locale)"></v-chip>
                </div>
            </div>
        </v-container>
    </v-sheet>
</template>

<script>
import Vue from 'vue';
import * as d3 from 'd3';
import arEgVoice from '@/assets/voices/ar-EG.mp3';
import enCaVoice from '@/assets/voices/en-CA.mp3';
import esMxVoice from '@/assets/voices/es-MX.mp3';
import frCaVoice from '@/assets/voices/fr-CA.mp3';
import hiInVoice from '@/assets/voices/hi-IN.mp3';
import ptPtVoice from '@/assets/voices/pt-PT.mp3';
import ruRuVoice from '@/assets/voices/ru-RU.mp3';
import zhCnVoice from '@/assets/voices/zh-CN.mp3';
import languages from "@/assets/languages.json";

const Muvis = function (path, options = {}) {

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const context = new AudioContext();
    const dataMax = options.dataMax || 10;

    let bufferSource, analyzer, frequency, fileData;

    function loadFile() {
        const request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = fileLoaded;
        request.onerror = fileError;
        request.send();
    }

    function fileLoaded(e) {
        fileData = e.target.response;
        if (options.onLoad) {
            options.onLoad(fileData);
        }
    }

    function fileError() {
        if (options.onError) {
            options.onError('Unable to load file.');
        }
    }

    function onAudioDecode(buffer) {
        bufferSource = context.createBufferSource();
        analyzer = context.createAnalyser();
        frequency = new Uint8Array(analyzer.frequencyBinCount);

        bufferSource.buffer = buffer;
        bufferSource.connect(context.destination);
        bufferSource.connect(analyzer);
        bufferSource.onended = () => {
            self.stop();
            if (options.onEnded) {
                options.onEnded(this);
            }
        }
        bufferSource.start(0);

        if (options.onReady) {
            options.onReady(this);
        }

        render();
    }

    function onAudioDecodeError() {
        if (options.onError) {
            options.onError('Unable to decode audio.');
        }
    }

    function render() {
        if (self.isPlaying) {
            requestAnimationFrame(render);
            analyzer.getByteFrequencyData(frequency);
            if (options.onData) {
                options.onData(frequency.slice(0, dataMax));
            }
        }
    }

    this.play = () => {
        if (!self.isPlaying) {
            self.isPlaying = true;
            if (fileData instanceof ArrayBuffer) {
                context.decodeAudioData(fileData, onAudioDecode, onAudioDecodeError);
            }
            if (options.onPlay) {
                options.onPlay(this);
            }
        }
    }

    this.stop = () => {
        if (self.isPlaying) {
            self.isPlaying = false;
            if (bufferSource) {
                bufferSource.stop();
            }
        }
    }

    loadFile();
};

export default Vue.extend({

    props: {
        dark: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        playing: false,
        audio: null,
        divs: null,
        voices: {},
        availableLocales: [],
        forcedLocale: null,
    }),

    computed: {
        btnSize() {
            return this.$vuetify.breakpoint.lgAndUp ? 64 : 48;
        }
    },

    watch: {
        '$i18n.locale'() {
            this.init();
        }
    },

    methods: {
        handleSwitchLanguageClick(locale) {
            this.forcedLocale = locale.value;

            this.stop();
            setTimeout(() => {
                this.audio.play();
                this.playing = true;
            }, 1000)
        },

        toggle() {
            if (!this.audio.isPlaying) {
                this.audio.play();
                this.playing = true;
            } else {
                this.stop();
            }
        },

        stop() {
            this.audio.stop();
            this.playing = false;
            this.init();
        },

        init() {
            const toZero = () => {
                const data = [];
                for (let i = 0; i < 100; i++) {
                    data.push(0);
                }
                this.apply(data);
            }

            this.audio = new Muvis(this.voices[this.forcedLocale || this.$i18n.locale], {
                dataMax: 100,
                onData: this.apply,
                onPlay: () => {
                    this.playing = true;
                },
                onEnded: () => {
                    this.playing = false;
                    this.toggle();
                    setTimeout(() => {
                        this.toggle();
                    }, 300);
                },
            });

            this.divs = d3.selectAll('.tiles div');
            toZero();
        },

        apply(data) {
            this.divs
                .data(data)
                .style('transform', h => {
                    return 'translateZ(' + ((h / 255) * 100) / 10 + 'vmax)';
                })
                .style('opacity', o => {
                    return this.audio.isPlaying ? (o / 255) : 255;
                });
        }
    },

    created() {
        this.voices['ar-EG'] = arEgVoice;
        this.voices['en-CA'] = enCaVoice;
        this.voices['es-MX'] = esMxVoice;
        this.voices['fr-CA'] = frCaVoice;
        this.voices['hi-IN'] = hiInVoice;
        this.voices['pt-PT'] = ptPtVoice;
        this.voices['ru-RU'] = ruRuVoice;
        this.voices['zh-CN'] = zhCnVoice;

        // Unsupported voices
        this.voices['bn-IN'] = enCaVoice;
        this.voices['ur-PK'] = enCaVoice;

        this.availableLocales = this.$i18n.availableLocales.map(lang => ({
            value: lang,
            text: (languages.find(item => item.code === lang.replace('_', '-')) || { native: lang }).native,
        })).filter(item => ['bn-IN', 'ur-PK'].indexOf(item.value) === -1);
    },

    mounted() {
        this.init();
    },
});
</script>

<style lang="scss" scoped>
.v-btn--disabled {
    opacity: 0;
}

.tiles-container {
    margin-bottom: -3.3rem;

    @media all and (max-width: 767px) {
        overflow: hidden;
        margin: 0 -0.75rem;
        margin-bottom: -5rem;
    }
}

.tiles {
    width: 100%;
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateX(66deg);
    transition: opacity 300ms ease;

    &.ended {
        opacity: 0;
    }

    &::after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    ::v-deep div {
        float: left;
        background: #1B8E8A;
        width: 4%;
        height: 4vw;
        border: white solid 2px;
    }

    @media all and (orientation: portrait) {
        width: 200vw;
        left: -50vw;
        position: relative;

        ::v-deep div {
            width: 12vw;
            height: 12vw;
        }

        @media all and (min-width: 768px) {
            width: 160vw;
            left: -25vw;
            position: relative;

            ::v-deep div {
                width: 8vw;
                height: 8vw;
            }
        }
    }
}

.theme--dark {
    .tiles {
        ::v-deep div {
            background: rgba(255, 255, 255, 0.5);
            border: #1B8E8A solid 2px;
        }
    }
}
</style>
