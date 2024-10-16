<template>
  <div>
    <Navbar/>
    <!-- <Sidebar @data-sent="handlesent" v-if="sidebarOpen"/> -->

    <RouterView/>
  </div>
</template>


<script setup>
import { reactive, ref } from "vue";
import {RouterView} from "vue-router";
import {ChevronRight } from "lucide-vue-next"
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

const sidebarOpen = ref(true)
const handlesent=(data)=>{
   sidebarOpen.value=data
}
</script>

<style>

</style>