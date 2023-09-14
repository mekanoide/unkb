<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useInvitationsStore } from '@/stores/invitations'

const connectionsStore = useConnectionsStore()
const invitationsStore = useInvitationsStore()

const { cancelInvitation, fetchInvitations } = invitationsStore

const showingNewInvitation = ref(false)
const email = ref('')

const { data: role, pending: pendingRole } = await useFetch('/api/v1/user/role')

const {
      data:invitations,
      pending: pendingInvitations,
      refresh: refreshInvitations
    } = await useFetch('/api/v1/invitations')

const numInvitations = computed(() => {
  return invitations.value.length
})

const numInvitationsLeft = computed(() => {
  return role.value.max_invitations - numInvitations.value
})

const hasInvitationsLeft = computed(() => {
  return numInvitationsLeft.value > 0
})

const openNewInvitation = async () => {
  showingNewInvitation.value = true
}

const handleCreateInvitation = async () => {
  /* await createInvitation(email.value) */
  const { data, error } = await useFetch('/api/v1/invitations/create', {
    method: 'post',
    body: {
      email: email.value
    }
  })
  showingNewInvitation.value = false
  refreshInvitations()
}

const handleCancelInvitation = async (email) => {
  await cancelInvitation(email)
  refreshInvitations()
}
</script>

<template>
  <section>
    <p v-if="hasInvitationsLeft">
      Te quedan {{ numInvitationsLeft }} invitaciones.
    </p>
    <p v-else>No tienes invitaciones.</p>
    <div>
      <Button
        v-if="hasInvitationsLeft"
        @click="openNewInvitation">
        Nueva invitación
      </Button>
    </div>
  </section>
  <section>
    <h3>Invitaciones enviadas</h3>
    <ul v-if="invitations">
      <li
        class="invitation"
        v-for="invitation in invitations">
        <span>{{ invitation.target_email }}</span>
        <Button
          size="small"
          v-if="!invitation.used"
          @click="handleCancelInvitation(invitation.target_email)"
          >Cancelar</Button
        >
      </li>
    </ul>
  </section>
  <Modal v-if="showingNewInvitation">
    <h1>Invitación</h1>
    <form @submit.prevent="handleCreateInvitation">
      <TextField
        type="email"
        v-model="email"
        label="Correo del invitado"
        placeholder="fulanit@ejemplo.com" />
      <footer>
        <Button type="submit">Invitar</Button>
        <Button @click="showingNewInvitation = false">Cancelar</Button>
      </footer>
    </form>
  </Modal>
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

section + section {
  margin-top: var(--spaceL);
}
</style>
