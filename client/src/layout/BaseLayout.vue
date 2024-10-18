<script setup>
import Sidebar from "../components/dashboard/Sidebar.vue";
</script>
<template>
  <div class="flex h-full">
    <div class="h-screen">
      <Sidebar />
    </div>

    <div class="flex flex-1 flex-col">
      <header class="bg-white py-10">Header</header>
      <main class="bg-indigo-100 h-full rounded-2xl flex mr-10">
        <slot />
      </main>
      <footer
        class="bg-white w-full py-2 text-gray-400 font-bold text-sm text-center"
      >
        &copy; Notuspad All Rights Reserved 2024
      </footer>
    </div>
  </div>
</template>
