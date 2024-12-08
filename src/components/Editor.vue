<template>
  <div class="editor-wrapper">
    <div class="editor-menu-bar border-b border-gray-200 p-2 mb-4 flex flex-wrap gap-2">
      <button
        v-for="item in menuItems"
        :key="item.action"
        @click="item.action"
        class="px-2 py-1 rounded hover:bg-gray-100"
        :class="{ 'bg-blue-100': item.isActive?.() }"
      >
        {{ item.icon }}
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  extensions: [StarterKit],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

const menuItems = [
  {
    icon: 'B',
    action: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold')
  },
  {
    icon: 'I',
    action: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic')
  },
  {
    icon: 'H1',
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 })
  },
  {
    icon: 'H2',
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 })
  },
  {
    icon: '•',
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList')
  },
  {
    icon: '1.',
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList')
  },
  {
    icon: '""',
    action: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.isActive('blockquote')
  }
]

// 외부에서 modelValue가 변경될 때 에디터 내용 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    const isSame = newValue === editor.getHTML()
    if (!isSame) {
      editor.commands.setContent(newValue)
    }
  }
)

// 컴포넌트가 제거될 때 에디터 인스턴스 제거
onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style>
.editor-wrapper {
  @apply border border-gray-300 rounded-lg overflow-hidden;
}

.ProseMirror {
  @apply p-4 min-h-[200px];
}

.ProseMirror:focus {
  @apply outline-none;
}

/* 기본 스타일 */
.ProseMirror > * + * {
  @apply mt-4;
}

/* 제목 스타일 */
.ProseMirror h1 {
  @apply text-2xl font-bold;
}

.ProseMirror h2 {
  @apply text-xl font-bold;
}

/* 리스트 스타일 */
.ProseMirror ul {
  @apply list-disc pl-4;
}

.ProseMirror ol {
  @apply list-decimal pl-4;
}

/* 인용구 스타일 */
.ProseMirror blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic;
}
</style>
