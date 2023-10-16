<script setup>
const config = useRuntimeConfig()

const copied = ref(null)

const { data: role, pending: pendingRole } = await useFetch('/api/v1/user/role')

const { data: invitations, refresh: refreshInvitations } = await useFetch(
  '/api/v1/invitations'
)

const numInvitations = computed(() => {
  return invitations.value.length
})

const numInvitationsLeft = computed(() => {
  return role.value.max_invitations - numInvitations.value
})

const hasInvitationsLeft = computed(() => {
  return numInvitationsLeft.value > 0
})

const pendingInvitations = computed(() => {
  return invitations.value.filter((item) => item.used === false)
})

const usedInvitations = computed(() => {
  return invitations.value.filter((item) => item.used === true).length
})

const invitationLink = (token) => {
  return `${config.public.baseUrl}/invitation/${token}`
}

const createNewInvitation = async () => {
  const { data, error } = await useFetch('/api/v1/invitations/create', {
    method: 'post'
  })
  refreshInvitations()
}

const cancelInvitation = async (id) => {
  const { error } = await useFetch('/api/v1/invitations/cancel', {
    method: 'delete',
    body: {
      id: id
    }
  })
  refreshInvitations()
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
    <p v-if="hasInvitationsLeft">
      Has usado {{ usedInvitations }} invitaciones. Te quedan {{ numInvitationsLeft }} invitaciones.
    </p>
    <p v-else>No tienes invitaciones.</p>
    <div>
      <Button
        v-if="hasInvitationsLeft"
        @click="createNewInvitation">
        Nueva invitación
      </Button>
    </div>
  </section>
  <section v-if="pendingInvitations && pendingInvitations.length > 0">
    <h3>Invitaciones pendientes</h3>
    <ul>
      <li
        class="pending"
        v-for="invitation in pendingInvitations">
        <div class="actions">
          <div
            class="invitation-link"
            @click="
              copyLink(invitation.id, invitationLink(invitation.token))
            ">
            {{ invitationLink(invitation.token) }}
            <Transition name="fade">
              <div
                v-if="copied === invitation.id"
                class="copied">
                Enlace copiado al portapapeles!
              </div>
            </Transition>
          </div>
          <Button
            @click="cancelInvitation(invitation.id)">
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

.invitation {
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

