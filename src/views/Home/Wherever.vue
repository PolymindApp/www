<template>
    <v-sheet v-bind="$attrs" v-on="$listeners">
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex align-center justify-center text-center">
                    <span class="text-h4 text-md-h3 font-weight-thin" v-text="$t('home.wherever.title')"></span>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
export default {

}
</script>
