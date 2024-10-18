<script setup>
import Header from "../components/dashboard/Header.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
</script>
<template>
  <div class="flex h-full">
    <div class="h-screen">
      <Sidebar />
    </div>

    <div class="flex flex-1 flex-col mr-4">
      <Header />
      <main class="bg-indigo-100 h-full rounded-2xl flex p-4">
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
