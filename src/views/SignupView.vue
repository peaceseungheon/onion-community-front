<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ isSubmitting }">
        <div class="mt-8 space-y-6">
          <FormInput name="name" label="이름" />
          <FormInput name="email" label="이메일" type="email" />
          <FormInput name="password" label="비밀번호" type="password" />
          <FormInput name="passwordConfirm" label="비밀번호 확인" type="password" />

          <div>
            <button type="submit" :disabled="isSubmitting"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              가입하기
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import ajax from '@/api/axios'
import FormInput from '@/components/FormInput.vue'

const schema = yup.object({
  name: yup.string().required('이름을 입력해주세요'),
  email: yup.string().required('이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 가능합니다')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])/,
      '비밀번호는 영문 소문자, 숫자를 포함해야 합니다'
    ),
  passwordConfirm: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
})

const onSubmit = async (values) => {
  try {
    await ajax.post('/users/sign-up', {
      name: values.name,
      email: values.email,
      password: values.password
    })
    alert('회원가입에 성공하였습니다.')
  } catch (error) {
    alert('회원가입에 실패하였습니다.')
  }
}
</script>
