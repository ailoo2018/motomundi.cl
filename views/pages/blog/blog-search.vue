<script setup lang="ts">

interface BlogArticle {
  id: number;
  title: string;
  createDate: string;
  modifiedDate: string;
  domainId: number;
  isFeatured: boolean;
  previewImage: string;
  youtubeVideo: string;
  friendlyUrl: string;
  createUser: { id: number; username: string };
  mainCategory: { id: string; name: string; title: string | null; friendlyUrl: string };
  webSiteId: number;
  visibility: number;
  previewText: string;
}

const router = useRouter();
const sword = ref<string>("");
const searchResults = ref<BlogArticle[]>([]);
const isLoading = ref(false);
const selectedArticle = ref<BlogArticle | null>(null);
const isOpen = ref(false);

// Debounce timer
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const onSearch = async () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  if (!sword.value || sword.value.length < 2) {
    searchResults.value = [];
    return;
  }
  isLoading.value = true;
  debounceTimer = setTimeout(async () => {
    try {
      const data = await $fetch<BlogArticle[]>("/api/blog/search", {
        method: "GET",
        query: { sword: sword.value },
      });

      console.log("search returned: " + data.entries.length)
      searchResults.value = data.entries || [];
      isOpen.value = searchResults.value.length > 0;
    } catch (e) {
      searchResults.value = [];
      isOpen.value = false;
    } finally {
      isLoading.value = false;
    }
  }, 350);
};

const onSelectArticle = (article: BlogArticle) => {
  selectedArticle.value = article;
  sword.value = article.title;
  searchResults.value = [];
  router.push(article.friendlyUrl);
};

const onGoToSearch = () => {
  router.push({ path: "/moto-blog/search", query: { sword: sword.value } });
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") onGoToSearch();
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const clearSearch = () => {
  sword.value = "";
  searchResults.value = [];
  selectedArticle.value = null;
};
</script>

<template>
  <div class="blog-search-wrapper">

      <v-menu
      v-model="isOpen"
      :close-on-content-click="false"
      location="bottom start"
      transition="slide-y-transition"
      :open-on-click="false"
      width="100%"
      max-width="620"
    >
      <template #activator="{ props: menuProps }">
        <div class="search-control" v-bind="menuProps">
          <!-- Icon -->
          <div class="search-icon-area">
            <VIcon :size="18" stroke-width="2" class="tabler-search" />
          </div>

          <!-- Input -->
          <input
            v-model="sword"
            class="search-input"
            placeholder="Buscar artículos del blog..."
            autocomplete="off"
            @input="onSearch"
            @keydown="onKeydown"
            @focus="isOpen = searchResults.length > 0"
          />

          <!-- Clear -->
          <button
            v-if="sword"
            class="clear-btn"
            @click.stop="clearSearch"
            title="Limpiar"
          >
            <v-icon size="16">mdi-close</v-icon>
          </button>

          <!-- Divider -->
          <div class="search-divider" />

          <!-- Search Button -->
          <button class="search-btn" @click="onGoToSearch" title="Buscar">

            <span class="search-btn-text">Buscar</span>
          </button>
        </div>
      </template>

      <!-- Dropdown Results -->
      <v-card class="results-card" elevation="8" rounded="lg">
        <div v-if="isLoading" class="results-loading">
          <v-progress-circular indeterminate color="primary" size="24" width="2" />
          <span class="loading-text">Buscando...</span>
        </div>

        <div
          v-else-if="searchResults.length === 0 && sword.length >= 2 && !isLoading"
          class="results-empty"
        >
          <IconArticle :size="32" class="empty-icon" />
          <p>No se encontraron artículos para <strong>"{{ sword }}"</strong></p>
        </div>

        <v-list v-else-if="searchResults.length > 0" class="results-list" density="compact">
          <div class="results-header">
            <span class="results-count">{{ searchResults.length }} resultado{{ searchResults.length !== 1 ? 's' : '' }}</span>
            <button class="see-all-btn" @click="onGoToSearch">Ver todos</button>
          </div>

          <v-list-item
            v-for="article in searchResults.slice(0, 6)"
            :key="article.id"
            class="result-item"
            @click="onSelectArticle(article)"
          >
            <!-- Preview Image -->
            <template #prepend>
              <div class="result-image-wrap">
                <img
                  v-if="article.previewImage"
                  :src="getBaseCDN() + article.previewImage"
                  :alt="article.title"
                  class="result-image"
                />
                <div v-else class="result-image-placeholder">
                  <VIcon class="tabler-user" :size="18" />
                </div>
              </div>
            </template>

            <!-- Content -->
            <div class="result-content">
              <p class="result-title">{{ article.title }}</p>
              <div class="result-meta">
                <span class="result-category">
                  <IconTag :size="11" />
                  {{ article.mainCategory?.name }}
                </span>
                <span class="result-date">
                  <VIcon class="tabler-calendar" :size="11" />
                  {{ formatDate(article.createDate) }}
                </span>
              </div>
            </div>
          </v-list-item>

          <div v-if="searchResults.length > 6" class="results-footer">
            <button class="footer-more-btn" @click="onGoToSearch">
              Ver los {{ searchResults.length - 6 }} resultados restantes →
            </button>
          </div>
        </v-list>
      </v-card>
    </v-menu>


  </div>

</template>

<style scoped>
.blog-search-wrapper {
  width: 100%;
  max-width: 620px;
  font-family: "DM Sans", sans-serif;
}

/* ── Search Control Bar ── */
.search-control {
  display: flex;
  align-items: center;
  height: 48px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  /*border-radius: 12px;*/
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: border-color 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.search-control:focus-within {
  border-color: #d6001c;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.search-icon-area {
  display: flex;
  align-items: center;
  padding: 0 10px 0 14px;
  flex-shrink: 0;
}

.search-icon {
  color: #94a3b8;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #1e293b;
  font-family: inherit;
  min-width: 0;
}

.search-input::placeholder {
  color: #b0bec5;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-right: 4px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  /*border-radius: 6px;*/
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: #f1f5f9;
  color: #fff;
}

.search-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  flex-shrink: 0;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  height: 100%;
  border: none;
  background: #d6001c;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  letter-spacing: 0.01em;
}

.search-btn:hover {
  background: #d6001c;
}

.search-btn-text {
  white-space: nowrap;
  color: white;
}

/* ── Dropdown ── */
.results-card {
  background: #ffffff;
  border: 1px solid #e8edf5;
  margin-top: 6px;
  overflow: hidden;
}

.results-loading,
.results-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 16px;
  color: #94a3b8;
  font-size: 14px;
  text-align: center;
}

.results-loading {
  flex-direction: row;
  padding: 18px 16px;
}

.loading-text {
  font-size: 13px;
}

.empty-icon {
  color: #cbd5e1;
}

.results-empty p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.results-list {
  padding: 0 !important;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 8px;
  border-bottom: 1px solid #f1f5f9;
}

.results-count {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.see-all-btn {
  font-size: 12px;
  font-weight: 600;
  color: #d6001c;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.see-all-btn:hover {
  text-decoration: underline;
}

.result-item {
  cursor: pointer;
  padding: 10px 16px !important;
  min-height: unset !important;
  transition: background 0.15s;
}

.result-item:hover {
  background: #f8fafc;
}

.result-image-wrap {
  width: 52px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 12px;
  background: #f1f5f9;
}

.result-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 13.5px;
  font-weight: 500;
  color: #000;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-category,
.result-date {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
}

.results-footer {
  border-top: 1px solid #f1f5f9;
  padding: 10px 16px;
  text-align: center;
}

.footer-more-btn {
  font-size: 12px;
  font-weight: 600;
  color: #d6001c;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
}

.footer-more-btn:hover {
  text-decoration: underline;
}
</style>
