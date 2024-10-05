<script lang="ts" setup>

defineOptions({ name: 'the-footer' })


</script>

<template>
  <div class="the-footer border-horizontal top">
    <!-- -->
    <TheSection class="grid sm:grid-cols-12 gap-10 py-8 md:py-12">
      <div class="sm:col-span-12 lg:col-span-4 space-y-2">
        <div>
          <!-- Logo -->
          <nuxt-link class="inline-flex" to="/" aria-label="Cruip">
            <img src="~/assets/images/logo.svg" width="32" height="32" alt="Docs" />
          </nuxt-link>
        </div>
        <div class="text-sm text-gray-600">
          &copy; Cruip.com - All rights reserved.
        </div>
      </div>
      <!-- 2nd block -->
      <div class="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-2">
        <h3 class="text-sm font-medium pt-0!">Product</h3>
        <ul class="text-sm space-y-2">
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Features</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Integrations</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Pricing & Plans</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Changelog</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Our method</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 3rd block -->
      <div class="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-2">
        <h3 class="text-sm font-medium pt-0!">Company</h3>
        <ul class="text-sm space-y-2">
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">About us</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Diversity &
              Inclusion</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Blog</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Careers</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Financial
              statements</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 4th block -->
      <div class="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-2">
        <h3 class="text-sm font-medium pt-0!">Resources</h3>
        <ul class="text-sm space-y-2">
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Community</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Terms of service</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-gray-600 hover:text-gray-900 transition" to="#0">Report a
              vulnerability</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 5th block -->
      <div class="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-2">
        <h3 class="text-sm font-medium pt-0!">Social</h3>
        <ul class="flex gap-1">
          <li>
            <NuxtLink class="flex justify-center items-center text-blue-500 hover:text-blue-600 transition" to="#0"
              aria-label="Twitter">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z">
                </path>
              </svg>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex justify-center items-center text-blue-500 hover:text-blue-600 transition" to="#0"
              aria-label="Medium">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z">
                </path>
              </svg>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex justify-center items-center text-blue-500 hover:text-blue-600 transition" to="#0"
              aria-label="Github">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z">
                </path>
              </svg>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </TheSection>
    <!-- Big text -->
    <div class="relative -mt-10 h-40 w-full -z-10" aria-hidden="true">
      <div
        class="the-footer-big-letter">
      </div>
      <!-- Glow -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3" aria-hidden="true">
        <div class="w-60 h-60 rounded-full border-[20px] border-indigo-900 border-solid blur-[70px]"></div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.the-footer {
  @apply w-full pt-8 bg-indigo-400/10 dark:bg-indigo-800/10 overflow-hidden;
}

.the-footer li {
  @apply list-none;
}

.the-footer-big-letter {
  @apply 
    absolute 
    left-1/2 
    pointer-events-none 
    -z-10 
    -translate-x-1/2 
    text-[240px] 
    leading-none 
    text-center 
    font-bold 
    before:content-['FANPORT'] 
    before:bg-gradient-to-b 
    dark:before:from-gray-800
    before:from-gray-200 
    before:to-gray-100/30 
    before:to-80% 
    before:text-transparent 
    before:bg-clip-text 
    
    after:content-['FANPORT'] 
    after:absolute 
    after:inset-0 
    dark:after:bg-gray-800/70
    after:bg-gray-300/70 
    after:text-transparent 
    after:bg-clip-text 
    after:[text-shadow:0_1px_0_white] 
    dark:after:[text-shadow:0_1px_0_#000] 
    after:mix-blend-darken;
}
</style>
