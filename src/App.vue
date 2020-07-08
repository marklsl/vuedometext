<template>
    <div id="app">
        <mapPage></mapPage>
    </div>
</template>

<script>
import mapPage from 'C/mapPage';

export default {
    name: 'App',
    components: {
        mapPage,
    },
};
</script>

<style lang="scss">
body {
    margin: 0px;
    padding: 0px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
}
</style>
