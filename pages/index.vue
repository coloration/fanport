<script lang="ts" setup>

defineOptions({ name: 'home' })


</script>

<template>
  <ThePageContainer class="home">
    <div class="min-h-screen">
      <TheSection>

        <h2>Columns</h2>
        <div class="grid grid-cols-1 gap-4">
          <NuxtLink to="/tech">

            <div class="border-1 px-4 border-solid border-indigo-400/60 rounded">
              <h3 class="text-4xl">编程技术</h3>
              <h3 class="pt-1">
                Programming Technology
              </h3>
              <h4>最近更新</h4>
              <ul>
                <li>123</li>
              </ul>
            </div>
          </NuxtLink>
          <NuxtLink to="/tech">

            <div class="border-1 px-4 border-solid border-indigo-400/60 rounded">
              <h3 class="text-4xl">经济金融</h3>
              <h3 class="pt-1">
                Programming Technology
              </h3>
              <ul>
                <li>指数跟踪</li>
                <li>产经数据</li>
              </ul>
            </div>
          </NuxtLink>
          <NuxtLink to="/tech">

            <div class="border-1 px-4 border-solid border-indigo-400/60 rounded">
              <h3 class="text-4xl">人文社科</h3>
              <h3 class="pt-1">
                Programming Technology
              </h3>
              
            </div>
          </NuxtLink>
        </div>
      </TheSection>
    </div>
    <!-- -->
  </ThePageContainer>
</template>

<style lang="postcss">
.home {
  @apply;
}
</style>
