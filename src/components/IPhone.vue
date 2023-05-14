<template>
    <div :class="{
        'iphone': includeBorder
    }">
        <div class="notch">
            <div class="inner-notch"></div>
        </div>
        <v-img
            v-if="formattedImages.length <= 1"
            v-bind="$attrs"
            :aspect-ratio="828/1792"
            :src="formattedImages[0]"
        />
        <v-carousel
            v-else
            v-model="index"
            v-bind="$attrs"
            :show-arrows="false"
            height="auto"
            hide-delimiters
        >
            <v-carousel-item
                v-for="item in formattedImages"
                :key="item"
            >
                <v-img
                    :src="item"
                    :aspect-ratio="828/1792"
                ></v-img>
            </v-carousel-item>
        </v-carousel>
        <div class="shadow"></div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, VModel, Prop} from 'vue-property-decorator';

@Component
export default class IPhone extends Vue {

    @VModel({
        default: () => ([])
    }) images!: string | Array<string>

    @Prop({
        type: Boolean,
        default: false
    }) includeBorder!: boolean

    @Prop({
        type: Number,
        default: 0
    }) index!: number

    get formattedImages(): Array<string> {
        return typeof this.images === 'string'
            ? [this.images]
            : this.images;
    }
}
</script>

<style lang="scss" scoped>
.iphone {
    position: relative;

    & > .v-responsive,
    & > .v-window {
        border-radius: 3rem;
        border: black solid 1rem;
        background-color: white;
    }

    .shadow {
        width: 100%;
        height: 5rem;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        margin-top: -5.5rem;
        border-radius: 3rem;
        box-shadow: 0 2.5rem 3rem -1.5rem rgba(0, 0, 0, 1);
    }

    .notch {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 6%;
        width: 50%;
        background-color: black;
        border-radius: 0 0 1rem 1rem;
        z-index: 1;

        .inner-notch {
            width: 25%;
            height: 5px;
            border-radius: 1rem;
            background-color: rgba(255, 255, 255, 0.15);
            position: absolute;
            bottom: 25%;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>
