<template>
    <v-sheet :style="style" v-bind="$attrs" v-on="$listeners" v-intersect="{
        handler: onIntersect,
        options: {
            threshold: 0.66
        }
    }">
        <v-overlay
            v-if="background.overlayColor"
            :color="background.overlayColor"
            :opacity="background.overlayOpacity"
            absolute
        >
            <slot></slot>
        </v-overlay>
        <slot v-else></slot>
    </v-sheet>
</template>

<script>
export default {
    name: "Viewport",

    props: {
        background: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        style() {
            return {
                position: 'relative',
                minHeight: window.innerWidth > window.innerHeight ? 'calc(100vh - 80px)' : 'calc(' + window.innerWidth + 'px - 80px)',
                backgroundImage: 'url(' + this.background.url + ')',
                backgroundSize: this.background.size,
                backgroundPosition: this.background.position,
            }
        }
    },

    methods: {
        onIntersect(entries, observer) {
            if (this.$attrs.id && entries[0].isIntersecting) {
                this.$root.$emit('intersect', this.$attrs.id)
            }
        },
    },
}
</script>
