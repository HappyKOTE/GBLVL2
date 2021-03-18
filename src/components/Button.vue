<template>
  <div :style="[$style.wrapper]" @click="$emit('clicked')><slot></slot></div>
</template>

<script>
export default {};
</script>

<style module>
    .wrapper {
        display: inline-block;
        padding: 5px;
    }
</style>