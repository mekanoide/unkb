<script setup>
const config = useRuntimeConfig()

const copied = ref(null)

const { data: role, pending: pendingRole } = await useFetch('/api/v1/user/role')

const { data: invites, refresh: refreshInvites } = await useFetch(
  '/api/v1/invites'
)

const numInvites = computed(() => {
  return invites.value.length
})

const numInvitesLeft = computed(() => {
  return role.value.max_invitations - numInvites.value
})

const hasInvitesLeft = computed(() => {
  return numInvitesLeft.value > 0
})

const pendingInvites = computed(() => {
  return invites.value.filter((item) => item.used === false)
})

const usedInvites = computed(() => {
  return invites.value.filter((item) => item.used === true).length
})

const inviteLink = (token) => {
  return `${config.public.baseUrl}/invite/${token}`
}

const createNewInvite = async () => {
  const { data, error } = await useFetch('/api/v1/invites/create', {
    method: 'post'
  })
  refreshInvites()
}

const cancelInvite = async (id) => {
  const { error } = await useFetch('/api/v1/invites/cancel', {
    method: 'delete',
    body: {
      id: id
    }
  })
  refreshInvites()
}

const copyLink = (id, url) => {
  navigator.clipboard.writeText(url)
  copied.value = id
  setTimeout(() => {
    copied.value = null
  }, 3000)
}
</script>

<template>
  <section>
    <p v-if="hasInvitesLeft">
      Has usado {{ usedInvites }} invitaciones. Te quedan {{ numInvitesLeft }} invitaciones.
    </p>
    <p v-else>No tienes invitaciones.</p>
    <div>
      <Button
        v-if="hasInvitesLeft"
        @click="createNewInvite">
        Nueva invitación
      </Button>
    </div>
  </section>
  <section v-if="pendingInvites && pendingInvites.length > 0">
    <h3>Invitaciones pendientes</h3>
    <ul>
      <li
        class="pending"
        v-for="invite in pendingInvites">
        <div class="actions">
          <div
            class="invite-link"
            @click="
              copyLink(invite.id, inviteLink(invite.token))
            ">
            {{ inviteLink(invite.token) }}
            <Transition name="fade">
              <div
                v-if="copied === invite.id"
                class="copied">
                Enlace copiado al portapapeles!
              </div>
            </Transition>
          </div>
          <Button
            @click="cancelInvite(invite.id)">
            Cancelar
          </Button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: var(--spaceM);
}

form {
  display: grid;
  gap: var(--spaceS);
}

footer {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: var(--spaceXS);
}

.invite {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.actions {
  margin-top: var(--spaceS);
  display: grid;
  gap: var(--spaceS);
  grid-template-columns: 1fr auto;
}

.invite-link {
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

