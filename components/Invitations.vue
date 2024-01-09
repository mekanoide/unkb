<script setup>
const config = useRuntimeConfig()

const copied = ref(false)

const { data: role, pending: pendingRole } = await useFetch('/api/user/role')
const { data: userData, refresh } = await useFetch('/api/user/me')

const numInvitations = computed(() => {
  return userData.value.invitations_used
})

const numInvitationsLeft = computed(() => {
  return role.value.max_invitations - numInvitations.value
})

const hasInvitationsLeft = computed(() => {
  return numInvitationsLeft.value > 0
})

const invitationLink = (token) => {
  return `${config.public.baseUrl}/invitation/${token}`
}

const copyLink = (url) => {
  navigator.clipboard.writeText(url)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 3000)
}
</script>

<template>
  <div v-if="hasInvitationsLeft">
    <p>
      Has usado {{ numInvitations }} invitaciones. Te quedan
      {{ numInvitationsLeft }} invitaciones.
    </p>
    <p>Copia y comparte este enlace para invitar a nuevos usuarios.</p>
  </div>
  <p v-else>No tienes invitaciones.</p>
  <div
    class="invitation-link"
    @click="copyLink(invitationLink(userData.invitation_token))">
    {{ invitationLink(userData.invitation_token) }}
    <Transition name="fade">
      <div
        v-if="copied"
        class="copied">
        Enlace copiado al portapapeles!
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.invitations-left {
  padding-top: var(--spaceL);
  display: grid;
  gap: var(--spaceM);
}

.invitations {
  padding-top: var(--spaceL);
}

footer {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: var(--spaceXS);
}

.invitation {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.pending {
  display: grid;
  gap: var(--spaceS);
  grid-template-columns: 1fr auto;
}

.invitation-link {
  border: 2px solid currentColor;
  padding: var(--spaceS);
  border-radius: var(--corner);
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copied {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  background-color: var(--colorText);
  color: var(--colorBackground);
}

section + section {
  margin-top: var(--spaceL);
}
</style>
