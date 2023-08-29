<script async setup>
import { useConnectionsStore } from '@/stores/connections'
const store = useConnectionsStore()

const { createInvitation, cancelInvitation } = store

const user = useSupabaseUser()
const client = useSupabaseClient()

const invitationsCount = ref(0)
const showingNewInvitation = ref(false)
const email = ref('')

const { data: userData, error } = useAsyncData(() =>
  client.from('users').select().eq('id', user.value.id).single()
)

const { data: invitations, refresh } = useAsyncData(async () => {
  const { data } = await client
    .from('invitations')
    .select()
    .eq('inviter_id', user.value.id)
  if (data) {
    invitationsCount.value = data.length
  }
  return data
})

const openNewInvitation = async () => {
  showingNewInvitation.value = true
}

const invitationsLeft = computed(() => {
  return 2 - invitationsCount.value
})

const handleCreateInvitation = async () => {
  await createInvitation(email.value)
  showingNewInvitation.value = false
  refresh()
}

const handleCancelInvitation = async (email) => {
  console.log('Correo a cancelar', email)
  await cancelInvitation(email)
  refresh()
}
</script>

<template>
  <section>
    <p v-if="invitationsLeft">Te quedan {{ invitationsLeft }} invitaciones.</p>
    <p v-else>No te quedan invitaciones.</p>
    <div>
      <Button
        v-if="invitationsLeft > 0"
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
