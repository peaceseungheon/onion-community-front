<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto min-h-screen bg-white p-6">
      <div>
        <h2 class="text-center text-2xl font-bold text-gray-900 mb-8">
          로그인
        </h2>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ isSubmitting }">
        <div class="space-y-6">
          <FormInput name="email" label="이메일" type="email" />
          <FormInput name="password" label="비밀번호" type="password" />

          <div>
            <button type="submit" :disabled="isSubmitting"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              로그인
            </button>
          </div>

          <div class="text-center">
            <RouterLink to="/signup" class="text-sm text-blue-600 hover:text-blue-500">
              회원가입하기
            </RouterLink>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import FormInput from '@/components/FormInput.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const schema = yup.object({
  email: yup.string()
    .required('이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: yup.string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 가능합니다')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])/,
      '비밀번호는 영문 소문자, 숫자를 포함해야 합니다'
    )
})

const onSubmit = async (values) => {
  try {
    await authStore.login(values.email, values.password)
    alert('로그인에 성공하였습니다.')
    router.push('/')
  } catch (error) {
    console.error(error.message)
    alert('로그인에 실패하였습니다.')
  }
}
</script>
