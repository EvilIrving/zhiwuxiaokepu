<template>
  <div class="float-right w-24 h-10 cursor-pointer select-none" @click="logout">
    <section class="flex justify-center items-center">
      <el-icon>
        <SwitchButton />
      </el-icon>
      <span class="pl-4">退出登录</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_URL } from "@/config/config";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ElMessageBox, ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    // 1.执行退出登录接口
    // await logoutApi();

    // 2.清除 Token
    userStore.setToken("");

    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success("退出登录成功！");
  });
};
</script>
