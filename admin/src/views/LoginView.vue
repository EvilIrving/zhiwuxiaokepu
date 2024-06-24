<template>
    <div class="login-container absolute top-0 left-0 bottom-0 right-0">
        <div class="  absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
                <el-form-item label="用户名" prop="account">
                    <base-input v-model="loginForm.account" placeholder="用户名" @keyup.enter="goPassword" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <base-input v-model="loginForm.password" ref="passwordRef" showPassword placeholder="密码"
                        @keyup.enter="submitForm" />
                </el-form-item>
                <el-form-item class="mt-10 float-right">
                    <el-button type="primary" @click="submitForm()">进入管理系统</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>


<script setup>
import { reactive, ref, unref } from 'vue'
import { BaseInput } from "@/components";
import { useRouter } from "vue-router";
import { useUserStoreWithOut } from "@/stores/user";
const userStore = useUserStoreWithOut();

const router = useRouter();

const loginFormRef = ref();
const passwordRef = ref();


const loginForm = reactive({
    account: 'sz_botany',
    password: '123456',
})

const loginRules = {
    account: [
        {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
        }
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
        },
        { min: 6, max: 7, trigger: 'blur', message: '密码长度为6到7位' },
    ]
};

const submitForm = async () => {
    await unref(loginFormRef).validate(async (valid) => {
        if (!valid) return;
        try {
            await userStore.login(loginForm);
            router.push({ path: "/" })
        } finally {
        }
    });
}


const goPassword = () => {
    unref(passwordRef).instance.focus();
};

</script>

<style scoped>
.login-container {
    /* background: url("@/assets/images/background.png") no-repeat; */
    background-size: 100% 100%;
}
</style>