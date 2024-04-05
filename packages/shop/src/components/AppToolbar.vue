<script setup></script>

<template>
  <div class="toolbar">
    <BContainer size="m">
      <div class="toolbar_inner">
        <div class="toolbar_item">genres</div>
        <div class="toolbar_item">loading</div>
        <div class="toolbar_item">cart</div>
      </div>
    </BContainer>
  </div>
</template>

<style scope>
.toolbar {
  border-bottom: 1px solid var(--color-neutral-02);
}
.toolbar_inner {
  display: flex;
  justify-content: space-between;
}
</style>
