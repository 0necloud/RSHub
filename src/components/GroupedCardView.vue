<template>
  <div class="card flex p-0 m-0" style="border-left: 5px solid yellow">
    <Toast position="top-right" style="max-width:88%;"/>
    <div class="col-10">
      <div class="col-12 flex" @click="clickHandler()">
        <p class="text-xl">{{ data.title }} <i :class="icon"></i></p>
      </div>
      <div class="col-12 grid">
        <Button
          v-for="tag in data.tags"
          :key="tag"
          rounded
          severity="secondary"
          class="text-xs m-1"
          :style="getTagColor(tagcolors, tag)"
          @click="$emit('search', tag)"
          >{{ tag }}</Button
        >
      </div>
      <div class="col-12 flex" style="text-align: start">
        <p v-if="showDesc" style="white-space: pre-line">
          {{ data.description }}
        </p>
      </div>
    </div>
    <div
      class="col-2 surface-50 p-2 flex justify-content-center"
      style="min-height: 100%"
    >
      <Button
        :icon="getButtonProperties(data.url).icon"
        :severity="getButtonProperties(data.url).severity"
        rounded
        outlined
        aria-label="Filter"
        @touchstart="beginToastSequence(data.url)"
        @touchend="cancelToastSequence"
        @mousedown="beginToastSequence(data.url)"
        @mouseup="cancelToastSequence"
        @click="redirectToExternalWebsite(data.url)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDesc: false,
    };
  },
  computed: {
    icon() {
      return this.showDesc
        ? "pi pi-angle-double-up"
        : "pi pi-angle-double-down";
    },
  },
  methods: {
    clickHandler() {
      this.showDesc = !this.showDesc;
    },
    getTagColor(tagcolors, tag) {
      return (
        "background-color:" +
        tagcolors[tag].color +
        "; color: " +
        tagcolors[tag].text +
        ";"
      );
    },
    getButtonProperties(url) {
      return url !== "#"
        ? { icon: "pi pi-arrow-right", severity: "info" }
        : { icon: "pi pi-minus", severity: "danger" };
    },
    redirectToExternalWebsite(url) {
      if (url !== "#") window.open(url, "_blank");
    },
    toastURL(url) {
      this.$toast.add({severity:'info', detail: url, life: 2000});
    },
    beginToastSequence(url) {
      this.timerId = setTimeout(this.toastURL.bind(this,url), 750);
      setTimeout(() => {
        clearTimeout(this.intervalId); // Clear interval if the user doesn't let go for >5 seconds
      }, 5000);
    },
    cancelToastSequence() {
      clearTimeout(this.timerId);
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    tagcolors: {
      type: Object,
      required: true,
    },
  },
  emits: ["search"],
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 100%;
}
</style>