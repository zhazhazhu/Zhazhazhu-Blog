<script lang='ts' setup>
import { useEvent } from 'balm-ui';

const balmUI = useEvent()
</script>

<template>
  <ui-button>11</ui-button>
  <ui-file accept="image/*" @change="balmUI.onChange('files', $event)"></ui-file>
</template>

<style lang="scss" scoped>
</style>
