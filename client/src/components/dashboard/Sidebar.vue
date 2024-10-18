<script setup lang="ts">
import { ref } from "vue";
import { useSidebar } from "../../composable/useSidebar";
import { HiViewGrid } from "oh-vue-icons/icons/hi";

const { isOpen } = useSidebar();
const activeClass = ref("bg-indigo-400 ");
const inactiveClass = ref(
  "text-gray-500 hover:bg-indigo-400  hover:text-gray-100 border-gray-100"
);
</script>

<template>
  <div class="flex px-4">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <svg
            class="w-12 h-12"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
              fill="#4C51BF"
              stroke="#4C51BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
              fill="white"
            />
          </svg>

          <span class="mx-2 text-3xl font-bold">NotusPad</span>
        </div>
      </div>

      <nav class="flex flex-col gap-1 mt-10">
        <div>
          <h6 class="font-bold text-sm">GENERAL</h6>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[$route.name === 'dashboard' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <v-icon name="hi-solid-cube" scale="1.2" />

            <span class="mx-4">Dashboard</span>
          </router-link>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[
              $route.name === 'dashboard.note' ? activeClass : inactiveClass,
            ]"
            to="/dashboard/note"
          >
            <v-icon name="hi-solid-collection" scale="1.2" />

            <span class="mx-4">Manage Note</span>
          </router-link>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[
              $route.name === 'dashboard.task' ? activeClass : inactiveClass,
            ]"
            to="/dashboard/task"
          >
            <v-icon name="hi-solid-clipboard-list" scale="1.2" />

            <span class="mx-4">Manage Tasks</span>
          </router-link>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[$route.name === 'Modal' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <v-icon name="hi-solid-briefcase" scale="1.2" />

            <span class="mx-4">Manage Project</span>
          </router-link>
        </div>

        <div class="mt-10">
          <h6 class="font-bold text-sm">OTHERS</h6>
          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <v-icon name="hi-solid-pencil-alt" scale="1.2" />

            <span class="mx-4">Report</span>
          </router-link>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <v-icon name="hi-solid-cog" scale="1.2" />

            <span class="mx-4">Setting</span>
          </router-link>

          <router-link
            class="flex items-center px-6 py-3 mt-4 font-bold duration-200 border border-gray-200 rounded-full"
            :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <v-icon name="hi-solid-support" scale="1.2" />

            <span class="mx-4">Upgrade Plans</span>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
