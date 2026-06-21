<script>
const team_a = JSON.parse(localStorage.getItem('team_a') || '{}')
const team_b = JSON.parse(localStorage.getItem('team_b') || '{}')

export default {
  data() {
    const winner = localStorage.getItem('winner') || ''

    return {
      winner,
      team_a,
      team_b,
    }
  },

  computed: {
    winning_team() {
      if (this.winner === 'team_a') return this.team_a
      if (this.winner === 'team_b') return this.team_b
      return null
    },
    winning_team_label() {
      if (this.winner === 'team_a') return 'Team A'
      if (this.winner === 'team_b') return 'Team B'
      return null
    },
  },

  methods: {
    reset_match() {
      localStorage.removeItem('team_a')
      localStorage.removeItem('team_b')
      localStorage.removeItem('game_configuration')
      localStorage.removeItem('winner')
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center gap-6">

      <p class="text-xs font-medium uppercase tracking-widest text-gray-400">Pickleball scorer — match over</p>

      <div class="flex flex-col items-center gap-1 py-4">
        <p class="text-sm text-gray-400">Winner</p>

        <template v-if="winning_team">
          <h1 class="text-4xl font-medium text-gray-900">{{ winning_team_label }}</h1>
          <p class="text-sm text-gray-400 mt-1">{{ winning_team.player_one }} & {{ winning_team.player_two }}</p>
        </template>

        <h1 v-else class="text-2xl font-medium text-gray-400">No result</h1>
      </div>

      <button type="button" v-on:click="reset_match()"
        class="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.98] transition-all duration-150">
        New match
      </button>

    </div>
  </div>
</template>

<style scoped></style>
