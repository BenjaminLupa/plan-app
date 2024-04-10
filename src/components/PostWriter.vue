<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import debounce from "lodash/debounce";
import { usePosts } from "../stores/posts";
import { useRouter } from "vue-router";
import highlightjs from "highlight.js";

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();

const posts = usePosts();
const router = useRouter();

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value;
      },
    },
    (_err, parseResult) => {
      html.value = parseResult;
    }
  );
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  { immediate: true }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("Wrong Data");
  }

  contentEditable.value.innerText = content.value;
});

function handleInput() {
  if (!contentEditable.value) {
    throw Error("Wrong Data");
  }

  content.value = contentEditable.value.innerText;
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  };
  await posts.createPost(newPost);
  router.push("/");
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>