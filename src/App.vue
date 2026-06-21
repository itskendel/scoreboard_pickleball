<script setup>
function add_player() {
  const player_one = document.getElementById('player_one').value
  const player_two = document.getElementById('player_two').value
  const player_three = document.getElementById('player_three').value
  const player_four = document.getElementById('player_four').value
  const first_server = document.getElementById('first_server').value

  const team_a = { player_one, player_two, score: 0, outside_count: 0 }
  const team_b = { player_one: player_three, player_two: player_four, score: 0, outside_count: 0 }
  const game_configuration = { winner: '', first_server }

  try {
    localStorage.setItem('team_a', JSON.stringify(team_a))
    localStorage.setItem('team_b', JSON.stringify(team_b))
    localStorage.setItem('game_configuration', JSON.stringify(game_configuration))
    window.location.href = '/score.html'
  } catch (error) {
    console.log(error)
    window.alert('Try again.')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-6">

      <div>
        <p class="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Pickleball scorer</p>
        <h1 class="text-2xl font-medium text-gray-900">New match</h1>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <p class="text-xs font-medium text-gray-500">Team A</p>
          <input id="player_one" type="text" placeholder="Player 1"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
          <input id="player_two" type="text" placeholder="Player 2"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xs font-medium text-gray-500">Team B</p>
          <input id="player_three" type="text" placeholder="Player 1"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
          <input id="player_four" type="text" placeholder="Player 2"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="first_server" class="text-xs font-medium text-gray-500">First to serve</label>
        <select id="first_server"
          class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white">
          <option disabled selected>Select team</option>
          <option value="team_a">Team A</option>
          <option value="team_b">Team B</option>
        </select>
      </div>

      <button type="button" @click="add_player"
        class="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 active:scale-[0.98] transition-all duration-150">
        Start match
      </button>

    </div>
  </div>
</template>

<style scoped></style>
