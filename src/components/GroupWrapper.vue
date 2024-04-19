<template>
  <div class="card flex p-0">
    <div v-if="data['group']" class="col-12" style="border-left: 5px solid green;">
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
      <div class="col-12 flex" style="text-align: start;">
        <ul v-if="showData" class="list-none flexwrap ml-0 pl-0" style="width:100%;">
          <li
            v-for="rs in data.data"
            :key="rs.title"
            style="width: 100%"
            class="ml-0 pl-0 mb-3"
          >
            <grouped-card-view
              :data="rs"
              :tagcolors="tagcolors"
              @search="(tag) => tagSearch(tag)"
            ></grouped-card-view>
          </li>
        </ul>
      </div>
    </div>
    <non-grouped-card-view
      v-else
      :data="data"
      :tagcolors="tagcolors"
      @search="(tag) => tagSearch(tag)"
      style="box-shadow: 0px 0px !important;"
    ></non-grouped-card-view>
  </div>
</template>

<script>
import NonGroupedCardView from "./NonGroupedCardView.vue";
import GroupedCardView from "./GroupedCardView.vue";

export default {
  data() {
    return {
      showData: false,
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
      this.showData = !this.showData;
    },
    getTagColor(tagcolors, tag) {
      return (
        "background-color:" +
        tagcolors[tag].color +
        "; color: " +
        tagcolors[tag].text +
        ";"
      );
    }
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
  components: {
    NonGroupedCardView,
    GroupedCardView
  },
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