<template>
  <div>
    <span>*</span>
    <span>*</span>
    <span>*</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  place-content: center;
  padding: var(--spaceL) var(--spaceM);
}

span {
  font-size: var(--fontSizeL);
  animation: pulse 0.25s infinite alternate;
}

span:nth-child(1) {
  animation-delay: 0.1s;
}

span:nth-child(2) {
  animation-delay: 0.2s;
}

span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  from {
    color: var(--colorText);
  }
  to {
    color: var(--colorBackground);
  }
}
</style>