<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-y-auto",
    },
  },

  content: "<p>I'm running tiptap with vue js</p>",
  extensions: [
    StarterKit,
    Underline,
    // BulletList.configure({
    //   HTMLAttributes: {
    //     class: "bullet", // Add bullet list style
    //   },
    // }),
    // BulletList,
    // OrderedList,
    // ListItem,
  ],
});
</script>

<template>
  <v-container>
    <section
      v-if="editor"
      class="buttons flex items-center flex-wrap gap-x-4 border border-t border-l border-r border-gray-400 p-4"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-gray-200': editor.isActive('bold') }"
        class="p-1"
      >
        <v-icon> mdi-format-bold </v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-200': editor.isActive('italic') }"
        class="p-1 font-weight-bold rounded"
        style="font-style: italic"
      >
        I
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :class="{ 'bg-gray-200': editor.isActive('underline') }"
        class="p-1 font-weight-bold rounded"
        style="font-style: italic"
      >
        U
      </button>

      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          'bg-gray-200 rounded': editor.isActive('heading', { level: 1 }),
        }"
        class="p-1"
      >
        h1
      </button>

      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200 rounded': editor.isActive('bulletList') }"
        class="p-1"
      >
        Bullet List
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-gray-200 rounded': editor.isActive('orderedList') }"
        class="p-1"
      >
        OrderLit
      </button>
    </section>
    <EditorContent :editor="editor" />
  </v-container>
</template>
<style>
.tiptap h1 {
  font-size: 32px;
  font-weight: bold;
}
.tiptap ul li {
  list-style-type: disc;
  margin-left: 22px;
}
.tiptap ol li {
  list-style: decimal;
  margin-left: 22px;
}
</style>
