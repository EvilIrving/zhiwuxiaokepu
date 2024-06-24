<template>
    <section class="bg-gray-50 w-full h-full bg-gradient-to-b from-line-green-start to-line-green-end">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo">
                植物小科普管理地址
            </a>
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        请登录您的账户
                    </h1>
                    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-position="top"
                        label-width="auto" size="large">
                        <el-form-item label="用户名" prop="account">
                            <base-input v-model="loginForm.account" placeholder="用户名" @keyup.enter="goPassword" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <base-input v-model="loginForm.password" ref="passwordRef" showPassword placeholder="密码"
                                @keyup.enter="submitForm" />
                        </el-form-item>
                        <el-form-item class="mt-10 float-right">
                            <el-button type="primary" @click="submitForm">进入管理系统</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { reactive, ref, unref } from 'vue'
import { BaseInput } from "@/components";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { useUserStoreWithOut } from "@/stores/user";
const userStore = useUserStoreWithOut();

const router = useRouter();

const loginFormRef = ref();
const passwordRef = ref();


const loginForm = reactive({
    account: '',// 'sz_botany',
    password: '' // '123456',
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
            router.push(HOME_URL)
        } finally {
            console.log('--login--');
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