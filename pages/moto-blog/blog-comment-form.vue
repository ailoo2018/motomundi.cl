<script setup>
// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
const props = defineProps({
  postId: {
    type: [String, Number],
    required: true,
  },
})

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────
const showMessage = ref(false)
const savingComment = ref(false)
const loadingComments = ref(false)
const comments = ref([])

const commentForm = ref({
  comment: '',
  author: '',
  email: '',
  accept: false,
})

const errors = ref({
  comment: '',
  author: '',
  email: '',
  accept: '',
})

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────
function validateEmail(email) {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)
}

function validateForm() {
  let valid = true
  errors.value = { comment: '', author: '', email: '', accept: '' }

  if (!commentForm.value.comment.trim()) {
    errors.value.comment = 'El comentario es obligatorio.'
    valid = false
  } else if (commentForm.value.comment.trim().length < 10) {
    errors.value.comment = 'El comentario debe tener al menos 10 caracteres.'
    valid = false
  }

  if (!commentForm.value.author.trim()) {
    errors.value.author = 'El nombre es obligatorio.'
    valid = false
  }

  if (!commentForm.value.email.trim()) {
    errors.value.email = 'El correo electrónico es obligatorio.'
    valid = false
  } else if (!validateEmail(commentForm.value.email)) {
    errors.value.email = 'Ingresa un correo electrónico válido.'
    valid = false
  }

  if (!commentForm.value.accept) {
    errors.value.accept = 'Debes aceptar las condiciones antes de continuar.'
    valid = false
  }

  return valid
}

// ─────────────────────────────────────────────
// API — Submit comment
// ─────────────────────────────────────────────
async function submitComment() {
  if (!validateForm()) return

  savingComment.value = true
  try {
    await $fetch('/api/blog/posts/comments', {
      method: 'POST',
      body: {
        postId: props.postId,
        comment: commentForm.value.comment,
        author: commentForm.value.author,
        email: commentForm.value.email,
      },
    })

    showMessage.value = true
    commentForm.value = { comment: '', author: '', email: '', accept: false }
    errors.value = { comment: '', author: '', email: '', accept: '' }

    // Refresh list after posting
    await fetchComments()

    setTimeout(() => {
      showMessage.value = false
    }, 6000)
  } catch (err) {
    alert("err: " + (err.message) )
    console.error('Error al enviar el comentario:', err)
  } finally {
    savingComment.value = false
  }
}

// ─────────────────────────────────────────────
// API — Fetch comments
// ─────────────────────────────────────────────
async function fetchComments() {
  loadingComments.value = true
  try {
    const data = await $fetch('/api/blog/posts/comments', {
      params: { postId: props.postId },
    })

    comments.value = data?.comments ?? []
  } catch (err) {
    console.error('Error al cargar comentarios:', err)
  } finally {
    loadingComments.value = false
  }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return ''
  
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}

// Avatar palette based on name hash
const AVATAR_COLORS = [
  '#4361ee',
  '#3a0ca3',
  '#7209b7',
  '#f72585',
  '#4cc9f0',
  '#06d6a0',
  '#f4a261',
  '#e63946',
]

function avatarColor(name) {
  let hash = 0
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash)
  
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

// ─────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────
onMounted(fetchComments)
</script>

<template>
  <div
    id="comments"
    class="comments-area"
  >
    <!-- ── Success toast ──────────────────────────── -->
    <Transition name="toast">
      <div
        v-if="showMessage"
        class="success-toast"
      >
        <i class="tabler-circle-check-filled toast-icon" />
        <span>¡Gracias por su comentario! Será publicado en breve.</span>
        <button
          class="toast-close"
          @click="showMessage = false"
        >
          <i class="tabler-x" />
        </button>
      </div>
    </Transition>

    <!-- ── Section header ────────────────────────── -->
    <div class="comments-header">
      <span class="header-icon-wrap">
        <i class="tabler-message-circle header-icon" />
      </span>
      <div>
        <h2 class="comments-title">
          Comentarios
        </h2>
        <p
          v-if="!loadingComments"
          class="comments-count"
        >
          {{ comments.length }}
          {{ comments.length === 1 ? 'comentario' : 'comentarios' }}
        </p>
      </div>
    </div>

    <!-- ── Comment list ───────────────────────────── -->
    <section
      class="comment-list"
      aria-label="Comentarios de usuarios"
    >
      <!-- Loading skeleton -->
      <div
        v-if="loadingComments"
        class="skeleton-list"
      >
        <div
          v-for="n in 3"
          :key="n"
          class="skeleton-item"
        >
          <div class="skeleton-avatar" />
          <div class="skeleton-body">
            <div class="skeleton-line short" />
            <div class="skeleton-line" />
            <div class="skeleton-line medium" />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="comments.length === 0"
        class="empty-state"
      >
        <i class="tabler-messages empty-icon" />
        <p>Sé el primero en comentar.</p>
      </div>

      <!-- Comments -->
      <TransitionGroup
        v-else
        name="comment"
        tag="ul"
        class="comment-ul"
      >
        <li
          v-for="(c, i) in comments"
          :key="c.id ?? i"
          class="comment-item"
        >
          <div
            class="comment-avatar"
            :style="{ background: avatarColor(c.author ?? 'U') }"
            aria-hidden="true"
          >
            {{ getInitials(c.author ?? 'U') }}
          </div>
          <div class="comment-body">
            <div class="comment-meta">
              <span class="comment-author">
                <i class="tabler-user meta-icon" />{{ c.author }}
              </span>
              <span class="comment-date">
                <i class="tabler-clock meta-icon" />{{ formatDate(c.createdAt) }}
              </span>
            </div>
            <p class="comment-text">
              {{ c.comment }}
            </p>
          </div>
        </li>
      </TransitionGroup>
    </section>

    <!-- ── Divider ────────────────────────────────── -->
    <div class="section-divider" />

    <!-- ── Comment form ───────────────────────────── -->
    <section
      id="respond"
      class="comment-respond"
      aria-label="Formulario de comentario"
    >
      <p
        id="reply-title"
        class="comment-reply-title"
      >
        <i class="tabler-pencil reply-icon" />
        Deja un comentario
      </p>

      <form
        name="commentForm"
        class="comment-form"
        novalidate
        @submit.prevent="submitComment"
      >
        <!-- Textarea -->
        <div class="field-group">
          <VTextarea
            id="comment"
            v-model="commentForm.comment"
            name="comment"
            label="Tu comentario*"
            placeholder="Escribe tu comentario aquí..."
            :error-messages="errors.comment"
            rows="4"
            auto-grow
            counter="1000"
            maxlength="1000"
            variant="outlined"
            color="primary"
            prepend-inner-icon="tabler-message"
            @input="errors.comment = ''"
          />
        </div>

        <!-- Name + Email (2 cols on md+) -->
        <div class="fields-row">
          <div class="field-group">
            <VTextField
              id="author"
              v-model="commentForm.author"
              name="author"
              label="Nombre*"
              placeholder="Tu nombre"
              :error-messages="errors.author"
              maxlength="245"
              variant="outlined"
              color="primary"
              prepend-inner-icon="tabler-user"
              @input="errors.author = ''"
            />
          </div>

          <div class="field-group">
            <VTextField
              id="email"
              v-model="commentForm.email"
              name="email"
              type="email"
              label="Correo electrónico*"
              placeholder="tu@correo.com"
              :error-messages="errors.email"
              maxlength="100"
              variant="outlined"
              color="primary"
              prepend-inner-icon="tabler-mail"
              @input="errors.email = ''"
            />
          </div>
        </div>

        <!-- Privacy note -->
        <p class="comment-notes">
          <i class="tabler-lock-square note-icon" />
          <span>
            <span id="email-notes">Tu dirección de correo no será publicada.</span>
            Los campos marcados con <span class="required">*</span> son obligatorios.
          </span>
        </p>

        <!-- GDPR checkbox -->
        <div
          class="gdpr-wrapper"
          :class="{ 'gdpr-error': errors.accept }"
        >
          <VCheckbox
            id="gdpr-legal-accept-blog-comment"
            v-model="commentForm.accept"
            name="gdpr-legal-accept"
            color="primary"
            hide-details
            @change="errors.accept = ''"
          >
            <template #label>
              <span class="gdpr-label">
                Autorizo a <strong>MOTOMUNDI SPA</strong> a publicar mis opiniones
                en su página web para ayudar a otros usuarios en su proceso de compra.
                <a
                  href="#"
                  class="gdpr-link"
                >Más información</a>
              </span>
            </template>
          </VCheckbox>
          <Transition name="fade">
            <p
              v-if="errors.accept"
              class="gdpr-error-msg"
            >
              <i class="tabler-alert-triangle" /> {{ errors.accept }}
            </p>
          </Transition>
        </div>

        <!-- Submit -->
        <div class="form-submit">
          <VBtn
            type="submit"
            :loading="savingComment"
            :disabled="savingComment"
            color="primary"
            size="large"
            class="submit-btn"
            elevation="0"
            prepend-icon="tabler-send"
          >
            Enviar comentario
          </VBtn>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
/* ──────────────────────────────────────────────
   Design tokens
────────────────────────────────────────────── */
.comments-area {
  --c-primary:     #c74044;
  --c-primary-lt:  #f2e0e1;
  --c-accent:      #c74044;
  --c-surface:     #ffffff;
  --c-border:      #e2e8f0;
  --c-text:        #1e293b;
  --c-text-muted:  #e9afb1;
  --c-error:       #dc2626;
  --radius-card:   12px;
  --radius-sm:     0px;
  --shadow-card:   0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);

  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  color: var(--c-text);
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

/* ──────────────────────────────────────────────
   Toast
────────────────────────────────────────────── */
.success-toast {
  display: flex;
  align-items: center;
  gap: .75rem;
  background: #ecfdf5;
  border: 1px solid #6ee7b7;
  border-left: 4px solid #10b981;
  border-radius: var(--radius-card);
  padding: .875rem 1.25rem;
  margin-bottom: 1.75rem;
  font-size: .9rem;
  color: #065f46;
}
.toast-icon { font-size: 1.25rem; color: #10b981; flex-shrink: 0; }
.toast-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #047857;
  display: flex;
  align-items: center;
  padding: 0;
  opacity: .7;
  transition: opacity .15s;
}
.toast-close:hover { opacity: 1; }

.toast-enter-active, .toast-leave-active { transition: all .35s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }

/* ──────────────────────────────────────────────
   Header
────────────────────────────────────────────── */
.comments-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.header-icon-wrap {
  width: 48px;
  height: 48px;
  background: var(--c-primary-lt);
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.header-icon {
  font-size: 1.5rem;
  color: var(--c-accent);
}
.comments-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 .1rem;
  line-height: 1.2;
  color: var(--c-text);
}
.comments-count {
  margin: 0;
  font-size: .85rem;
  color: var(--c-text-muted);
}

/* ──────────────────────────────────────────────
   Comment list
────────────────────────────────────────────── */
.comment-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.comment-item {
  display: flex;
  gap: 1rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-card);
  padding: 1.125rem 1.25rem;
  box-shadow: var(--shadow-card);
  transition: box-shadow .2s;
}
.comment-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,.09); }

.comment-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: .85rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: .03em;
}
.comment-body { flex: 1; min-width: 0; }
.comment-meta {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem 1.25rem;
  margin-bottom: .5rem;
}
.comment-author {
  font-weight: 600;
  font-size: .88rem;
  color: var(--c-primary);
  display: flex;
  align-items: center;
  gap: .3rem;
}
.comment-date {
  font-size: .8rem;
  color: var(--c-text-muted);
  display: flex;
  align-items: center;
  gap: .3rem;
}
.meta-icon { font-size: .9rem; opacity: .7; }
.comment-text {
  margin: 0;
  font-size: .92rem;
  line-height: 1.65;
  color: var(--c-text);
  white-space: pre-line;
}

/* ──────────────────────────────────────────────
   Skeleton
────────────────────────────────────────────── */
.skeleton-list { display: flex; flex-direction: column; gap: 1rem; }
.skeleton-item {
  display: flex;
  gap: 1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-card);
  padding: 1.125rem 1.25rem;
}
.skeleton-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e2e8f0;
  flex-shrink: 0;
  animation: shimmer 1.4s infinite;
}
.skeleton-body { flex: 1; display: flex; flex-direction: column; gap: .5rem; }
.skeleton-line {
  height: 12px;
  background: #e2e8f0;
  border-radius: 4px;
  animation: shimmer 1.4s infinite;
}
.skeleton-line.short  { width: 35%; }
.skeleton-line.medium { width: 65%; }

@keyframes shimmer {
  0%   { opacity: 1;   }
  50%  { opacity: .45; }
  100% { opacity: 1;   }
}

/* ──────────────────────────────────────────────
   Empty state
────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--c-text-muted);
}
.empty-icon {
  font-size: 2.75rem;
  display: block;
  margin-bottom: .75rem;
  opacity: .4;
}

/* ──────────────────────────────────────────────
   Transitions — comment list
────────────────────────────────────────────── */
.comment-enter-active { transition: all .4s ease; }
.comment-enter-from   { opacity: 0; transform: translateY(12px); }

/* ──────────────────────────────────────────────
   Divider
────────────────────────────────────────────── */
.section-divider {
  border: none;
  border-top: 2px dashed var(--c-border);
  margin: 2.25rem 0;
}

/* ──────────────────────────────────────────────
   Form
────────────────────────────────────────────── */
.comment-respond {
  background: var(--c-surface);
  /*
  border: 1px solid var(--c-border);
  border-radius: var(--radius-card);
  */
  padding: 1.75rem 1.5rem;
/*  box-shadow: var(--shadow-card);*/
}
.comment-reply-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-text);
  display: flex;
  align-items: center;
  gap: .5rem;
  margin: 0 0 1.5rem;
}
.reply-icon { font-size: 1.2rem; color: var(--c-accent); }

.comment-form { display: flex; flex-direction: column; gap: 0; }

.field-group { margin-bottom: 1rem; }

.fields-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
}
@media (max-width: 560px) {
  .fields-row { grid-template-columns: 1fr; }
}

/* Privacy note */
.comment-notes {
  display: flex;
  align-items: flex-start;
  gap: .45rem;
  font-size: .82rem;
  color: var(--c-text-muted);
  margin: 0 0 1rem;
  line-height: 1.5;
}
.note-icon { font-size: 1rem; margin-top: .05rem; flex-shrink: 0; }
.required { color: var(--c-error); font-weight: 700; }

/* GDPR */
.gdpr-wrapper {
  margin-bottom: 1.25rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: .25rem .5rem;
  transition: border-color .2s, background .2s;
}
.gdpr-wrapper.gdpr-error {
  border-color: #fca5a5;
  background: #fff5f5;
}
.gdpr-label { font-size: .85rem; color: var(--c-text); line-height: 1.55; }
.gdpr-link  { color: var(--c-accent); text-decoration: none; margin-left: .25rem; }
.gdpr-link:hover { text-decoration: underline; }
.gdpr-error-msg {
  color: var(--c-error);
  font-size: .8rem;
  margin: .25rem 0 0 2.5rem;
  display: flex;
  align-items: center;
  gap: .3rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Submit */
.form-submit { display: flex; justify-content: flex-end; }
.submit-btn  { min-width: 180px; font-weight: 600; letter-spacing: .02em; }
</style>
