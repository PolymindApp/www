<template>
    <v-sheet :style="style" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
    </v-sheet>
</template>

<script>
export default {
    name: "Viewport",

    computed: {
        style() {
            return {
                minHeight: window.innerWidth > window.innerHeight ? '100vh' : window.innerWidth,
            }
        }
    },
}
</script>
