<script setup>
import { useConnectionsStore } from '@/stores/connections'
import { useMainStore } from '@/stores/main'

const connectionStore = useConnectionsStore()
const mainStore = useMainStore()

const { createInvitation, cancelInvitation, fetchInvitations } = connectionStore
const { fetchOwnUser, fetchRole } = mainStore

const user = useSupabaseUser()
const client = useSupabaseClient()

const showingNewInvitation = ref(false)
const email = ref('')

const { data: role, pending: rolePending } = useAsyncData(() => fetchRole())
const {
  data: invitations,
  pending: invitationsPending,
  refresh
} = useAsyncData(() => fetchInvitations())

const numInvitations = computed(() => {
  if (invitationsPending.value) {
    return 0
  }
  return invitations.value.length
})

const numInvitationsLeft = computed(() => {
  if (rolePending.value || invitationsPending.value) {
    return 0
  }
  return role.value.max_invitations - numInvitations.value
})

const hasInvitationsLeft = computed(() => {
  return numInvitationsLeft.value > 0
})

const openNewInvitation = async () => {
  showingNewInvitation.value = true
}

const handleCreateInvitation = async () => {
  /*   await createInvitation(email.value) */
  const { data } = await client.auth.inviteUserByEmail(email.value) 
  showingNewInvitation.value = false
  refresh()
}

const handleCancelInvitation = async (email) => {
  await cancelInvitation(email)
  refresh()
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
        variant="primary"
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
        v-for="invitation in invitations"
        :key="invitation.id">
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
        <Button
          variant="primary"
          type="submit"
          >Invitar</Button
        >
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
