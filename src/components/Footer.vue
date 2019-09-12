<template>
    <div>
        <q-footer elevated>
            <q-toolbar class="footer">
            <q-toolbar-title>
                  <q-item-label class="t-logo t4">Footer</q-item-label>
            </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .footer {
        background: $c-color5;
        color: $c-color6;
    }

</style>