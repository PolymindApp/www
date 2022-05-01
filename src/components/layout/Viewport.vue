<template>
    <v-sheet class="fill-height" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
    </v-sheet>
</template>

<script>
export default {
    name: "Viewport",
}
</script>
