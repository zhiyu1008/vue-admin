<template>
  <div class="container">
    <ul class="tagsview_list">
      <li
        class="tag"
        v-for="(item, index) in tagsView"
        :key="index"
        @click="handleSelected(item.path)"
        :class="{ active: $route.path === item.path }"
      >
        {{ item.title }}
        <span @click.stop="handleCloseTag(index,item.path)" class="icon">
          <p v-if="($route.path === item.path)">x</p>
        </span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
// 监听点击的页面的路由
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    if (route.meta && route.meta.title && route.path) {
      const obj = {
        title: route.meta.title,
        path: route.path
      }
      store.commit('tagsview/setTagsView', obj)
    }
  },
  // immediate: true 进入页面就开始监听
  // deep: true 开启深度监听
  { immediate: true, deep: true }
)
// 获取tagsview的数据
const tagsView = computed(() => {
  return store.getters.tagsview
})
// tagsview的点击事件
const handleSelected = (path) => {
  router.push(path)
}
// tagsview的删除事件
const handleCloseTag = (index, routePath) => {
  // 如果点击首页不可以删除
  if (routePath === '/home') {
    return
  }
  let path = ''
  // 如果点击的是最后一个
  if (index === tagsView.value.length - 1) {
    // 如果最后一个不是第一个
    if (index !== 0) {
      // 如果点击的上一个存在，跳转路径就是上一项的路径，反之则跳转当前页面(也就是只有一个)
      path = tagsView.value[index - 1].path ? tagsView.value[index - 1].path : tagsView.value[index].path
    } else {
    // 如果最后一个是第一个（也就是只有一个）
      path = tagsView.value[index].path
      return
    }
  // 如果tagsview中不止一项
  } else if (tagsView.value.length !== 1) {
    // 跳转路径是下一项的路径
    path = tagsView.value[index + 1].path
  }
  router.push(path)
  store.commit('tagsview/removeTagsView', index)
}
</script>
<style scoped lang="scss">
.tagsview_list {
  height: 34px;
  width: 100%;
  background: #fff;
  .tag {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 16px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    .icon{
      position:absolute;
      top:0;
      right:5px;
    }
  }

  .tagsview_list {
    overflow-x: auto;
  }

  .tag.active {
    color: #409eff;
  }
}
</style>
