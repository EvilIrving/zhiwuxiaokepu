<template>
  <div class="float-right w-24 h-8 cursor-pointer select-none">
    <section class="h-full flex justify-center items-center">
      <!-- <el-icon>
        <SwitchButton />
      </el-icon>
      <span class="pl-4">退出登录</span> -->

      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="outline-none cursor-pointer flex items-center">
          用户中心
          <el-icon class="ml-1">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item :icon="EditPen" command="updatePassword">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </div>
</template>

<script setup>
import { LOGIN_URL } from "@/config/config";
import { modifyPassword } from "@/api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  SwitchButton,
  EditPen,
} from '@element-plus/icons-vue'


const handleCommand = (command) => {
  if (command === 'logout') logout();
  if (command === 'updatePassword') updatePassword();
}
const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = async (showConfirm = true) => {
  let confirmText = ''
  if (showConfirm === false) {
    confirmText = 'confirm'
  } else {
    confirmText = await ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
  }

  console.log(confirmText);
  if (confirmText === 'confirm') {
    // 1.执行退出登录接口
    // await logoutApi();

    // 2.清除 Token
    userStore.setToken("");

    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    showConfirm && ElMessage.success("退出登录成功！");
  }
};

const updatePassword = () => {
  ElMessageBox.prompt("请输入新密码", "修改密码", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputType: "password",
    inputPattern: /^.{6,8}$/,  //密码不能为空且  密码长度为6到7位
    inputErrorMessage: '密码不能为空且密码长度为6到8位',
  }).then(async ({ value }) => {
    console.log(value, 'value');
    if (value) {
      // 调用修改密码接口
      const res = await modifyPassword({ newPassword: value });
      console.log(res);
      if (res) {
        ElMessage.success("密码修改成功,请重新登录!");
        logout(false);
      }
    }
  })
}
</script>
