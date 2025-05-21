<script lang="ts" setup>

defineOptions({ name: 'homepage' })
</script>

<template>
  <ThePageContainer>
    <TheSection>
      <div class="md:grow md:pl-64 lg:pr-6 xl:pr-0">
        <div class="pt-16 md:pt-20 pb-8 md:pl-6 lg:pl-12">
          <h1>收拾精神，自作主宰</h1>
          
          <div>
            <NuxtLink to="/language/javascript/ecmascript-features">
              <h4>Knowledge</h4>
            </NuxtLink>
            <NuxtLink to="/live/food/drink">
              <h4>Live</h4>
            </NuxtLink>
            <NuxtLink to="/language/javascript/ecmascript-features">
              <h4>Language</h4>
            </NuxtLink>
            <NuxtLink to="/language/javascript/ecmascript-features">
              <h4>Framework</h4>
            </NuxtLink>
          </div>
        </div>
      </div>
    </TheSection>
  </ThePageContainer>
</template>

<style lang="postcss">


</style>
