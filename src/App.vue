<template>
    <div id="app" style="display: none;">
        <router-view />
    </div>
</template>
<script>
export default {
    mounted() {
        document.getElementById('app').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
    }
}
</script>
<style lang="scss">
</style>
