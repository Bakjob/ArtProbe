<script>
  import LikeButton from '$lib/components/LikeButton.svelte'
  import { language, t } from '$lib/i18n'
  export let post
  export let user
</script>

<div class="image-card-main">
  <a href="/posts/{post.post_id}" class="post-link">
    <div class="image-container">
      <img src={post.file_url} alt={post.title || t($language, 'untitled')} />

      <!-- Info overlay -->
      <div class="image-card-info">
        <h2>{post.title || t($language, 'untitled')}</h2>
        <span class="author">{t($language, 'by')} {post.username}</span>
      </div>
    </div>
  </a>

  <LikeButton {post} {user} class="like-btn"/>
</div>

<style scoped>
/* Square card */
.image-card-main {
  position: relative;
  width: 28rem;
  aspect-ratio: 1 / 1; /* Makes height equal width */
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.image-card-main:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.post-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-card-main:hover img {
  transform: scale(1.4);
}

/* Info overlay */
.image-card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  /* Remove background if you want fully transparent until hover */
  background: transparent;
  /* Remove local color so it uses global CSS */
  color: inherit;
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.image-card-main:hover .image-card-info {
  opacity: 1;
  transform: translateY(0);
}

.image-card-info .author {
  font-size: 1.4rem;
  opacity: 0.8;
}

/* Like button */
:global(.like-btn) {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10; /* Make sure it's above overlay */
  opacity: 0;
  transition: opacity 0.4s;
}

.image-card-main:hover :global(.like-btn) {
  opacity: 1;
}
</style>
