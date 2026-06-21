<script>
const team_a = JSON.parse(localStorage.getItem('team_a') || '{}')
const team_b = JSON.parse(localStorage.getItem('team_b') || '{}')
const game_configuration = JSON.parse(localStorage.getItem('game_configuration') || '{}')

export default {
  data() {
    let current_server, current_team_server

    if (game_configuration.first_server === 'team_a') {
      current_server = team_a.player_one
      current_team_server = 'team_a'
    } else {
      current_server = team_b.player_one
      current_team_server = 'team_b'
    }

    return {
      team_a_score: team_a.score ?? 0,
      team_b_score: team_b.score ?? 0,
      team_a_outside: team_a.outside_count ?? 0,
      team_b_outside: team_b.outside_count ?? 0,
      current_server,
      current_team_server,
      team_a_current_server: team_a.player_one,
      team_a_next_server: team_a.player_two,
      team_b_current_server: team_b.player_one,
      team_b_next_server: team_b.player_two,
      winner: game_configuration.winner ?? '',
    }
  },

  methods: {
    score(team) {
      if (team !== this.current_team_server) return
      if (team === 'team_a') this.team_a_score++
      if (team === 'team_b') this.team_b_score++
    },

    outside(team) {
      if (team !== this.current_team_server) return

      if (team === 'team_a') {
        this.team_a_outside++
        if (this.team_a_outside === 1) {
          this.current_server = this.team_a_next_server
          const old = this.team_a_current_server
          this.team_a_current_server = this.team_a_next_server
          this.team_a_next_server = old
        }
        if (this.team_a_outside >= 2) {
          this.team_a_outside = 0
          this.current_team_server = 'team_b'
          this.current_server = this.team_b_current_server
        }
      } else if (team === 'team_b') {
        this.team_b_outside++
        if (this.team_b_outside === 1) {
          this.current_server = this.team_b_next_server
          const old = this.team_b_current_server
          this.team_b_current_server = this.team_b_next_server
          this.team_b_next_server = old
        }
        if (this.team_b_outside >= 2) {
          this.team_b_outside = 0
          this.current_team_server = 'team_a'
          this.current_server = this.team_a_current_server
        }
      }
    },
  },

  watch: {
    team_a_score(newValue) {
      team_a.score = newValue
      localStorage.setItem('team_a', JSON.stringify(team_a))
      if (team_a.score >= 11 && team_a.score - team_b.score >= 2) {
        localStorage.setItem('winner', 'team_a')
        window.location.href = 'scoreboard_pickleball/result.html'
      }
    },
    team_b_score(newValue) {
      team_b.score = newValue
      localStorage.setItem('team_b', JSON.stringify(team_b))
      if (team_b.score >= 11 && team_b.score - team_a.score >= 2) {
        localStorage.setItem('winner', 'team_b')
        window.location.href = 'scoreboard_pickleball/result.html'
      }
    },
    team_a_outside(newValue) {
      team_a.outside_count = newValue
      localStorage.setItem('team_a', JSON.stringify(team_a))
    },
    team_b_outside(newValue) {
      team_b.outside_count = newValue
      localStorage.setItem('team_b', JSON.stringify(team_b))
    },
  },
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="w-full max-w-lg bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-6">

      <div class="flex items-baseline justify-between">
        <h1 class="text-2xl font-medium text-gray-900">Scoreboard</h1>
        <span class="text-sm text-gray-400">
          Serving: <span class="font-medium text-gray-900">{{ current_server }}</span>
        </span>
      </div>

      <div class="grid grid-cols-2 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        <div class="flex flex-col items-center gap-1 py-6 px-4">
          <p class="text-xs font-medium uppercase tracking-widest text-gray-400">Team A</p>
          <p class="text-6xl font-medium text-gray-900 leading-none my-2">{{ team_a_score }}</p>
          <p class="text-xs text-gray-400">outside: {{ team_a_outside }}</p>
        </div>
        <div class="flex flex-col items-center gap-1 py-6 px-4">
          <p class="text-xs font-medium uppercase tracking-widest text-gray-400">Team B</p>
          <p class="text-6xl font-medium text-gray-900 leading-none my-2">{{ team_b_score }}</p>
          <p class="text-xs text-gray-400">outside: {{ team_b_outside }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="grid grid-cols-2 gap-2">
          <button type="button" v-on:click="score('team_a')" :disabled="current_team_server !== 'team_a'" :class="[
            'py-3 text-sm font-medium rounded-lg transition-all duration-150',
            current_team_server === 'team_a'
              ? 'bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97]'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          ]">Score</button>
          <button type="button" v-on:click="outside('team_a')" :disabled="current_team_server !== 'team_a'" :class="[
            'py-3 text-sm font-medium rounded-lg border transition-all duration-150',
            current_team_server === 'team_a'
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.97]'
              : 'border-gray-100 text-gray-300 cursor-not-allowed'
          ]">Outside</button>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button type="button" v-on:click="score('team_b')" :disabled="current_team_server !== 'team_b'" :class="[
            'py-3 text-sm font-medium rounded-lg transition-all duration-150',
            current_team_server === 'team_b'
              ? 'bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97]'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          ]">Score</button>
          <button type="button" v-on:click="outside('team_b')" :disabled="current_team_server !== 'team_b'" :class="[
            'py-3 text-sm font-medium rounded-lg border transition-all duration-150',
            current_team_server === 'team_b'
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.97]'
              : 'border-gray-100 text-gray-300 cursor-not-allowed'
          ]">Outside</button>
        </div>
      </div>

      <p class="text-xs text-gray-400 text-center">Only the serving team can score</p>

    </div>
  </div>
</template>

<style scoped></style>
