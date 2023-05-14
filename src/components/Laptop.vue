<template>
    <div v-bind="$attrs" style="position: relative">
      <img :src="laptopImg" alt="Laptop" />
      <v-responsive class="inner d-flex flex-column">
        <slot></slot>
      </v-responsive>
    </div>
</template>

<script lang="ts">
import laptopImg from '@/assets/images/laptop.png';
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Laptop extends Vue {
    laptopImg = laptopImg
}
</script>

<style lang="scss" scoped>
.inner {
    position: absolute;
    height: 100%;
    padding: 2.9% 14.9% 12% 14.9%;
    z-index: 1;
    top: 0;
    width: 100%;
}
</style>
