<template>
    <v-sheet style="min-height: 100vh" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
    </v-sheet>
</template>

<script>
export default {
    name: "Viewport",
}
</script>
