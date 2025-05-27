import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base: '/Project_zoo/', //깃허브 액션 사용시
  base: '/', //앰플리파이 사용시
  plugins: [react()],
})
