import React, { useCallback, useEffect, useState } from "react";
import { request } from "../lib/apiClient.js";
import { DEFAULT_LIMIT } from "../lib/constants.js";
import FeedPost from "../components/FeedPost.jsx";
import PostModal from "../components/PostModal.jsx";
import PostCreateModal from "../components/PostCreateModal.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import useIsDesktop from "../lib/useIsDesktop.js";
import { toggleLike } from "../lib/useLikeToggle.js";
import { defaultPosts, isDemoPost } from "../data/defaultPosts.js";

export default function Feed() {
  const isDesktop = useIsDesktop();
  const { token } = useAuth();
  const FEED_LIMIT = 6;
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeLoadingIds, setLikeLoadingIds] = useState(new Set());
  const [modalPostId, setModalPostId] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const postsToRender = !loading && items.length === 0 ? defaultPosts : items;

  function requireLogin() {
    window.alert("Please log in");
  }

  const loadFeed = useCallback(async (isActive = () => true) => {
    setLoading(true);
    setError(null);
    if (!token) {
      if (isActive()) {
        setItems([]);
        setLoading(false);
      }
      return;
    }
    try {
      const data = await request(`/posts?limit=${FEED_LIMIT}`);
      if (isActive()) setItems((data.items || []).slice(0, FEED_LIMIT));
    } catch (err) {
      if (isActive()) {
        setItems([]);
        setError(err.message || "Failed to load feed.");
      }
    } finally {
      if (isActive()) setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let active = true;
    loadFeed(() => active);
    return () => {
      active = false;
    };
  }, [loadFeed]);

  useEffect(() => {
    function handleCreated(event) {
      const created = event.detail;
      if (!created?._id) return;
      setItems((prev) => {
        if (prev.some((post) => post._id === created._id)) return prev;
        return [created, ...prev].slice(0, FEED_LIMIT);
      });
    }
    window.addEventListener("post:created", handleCreated);
    return () => window.removeEventListener("post:created", handleCreated);
  }, []);

  function setLikeLoading(postId, value) {
    setLikeLoadingIds((prev) => {
      const next = new Set(prev);
      if (value) next.add(postId);
      else next.delete(postId);
      return next;
    });
  }

  function handleOpenComments(id) {
    if (!id) return;
    if (!token) {
      requireLogin();
      return;
    }
    if (isDesktop) {
      setModalPostId(id);
      return;
    }
    window.dispatchEvent(new CustomEvent("comments:open", { detail: id }));
  }

  function handleOpenPost(id) {
    if (!id) return;
    setModalPostId(id);
  }

  async function handleToggleLike(postId) {
    if (!postId || likeLoadingIds.has(postId)) return;
    if (!token) {
      requireLogin();
      return;
    }
    setError(null);
    setLikeLoading(postId, true);
    try {
      const { liked, likesCount } = await toggleLike(postId);
      setItems((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, liked, likesCount: likesCount ?? p.likesCount }
            : p,
        ),
      );
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications:changed"));
      }
    } catch (err) {
      setError(err.message || "Failed to like the post.");
    } finally {
      setLikeLoading(postId, false);
    }
  }

  return (
    <div className="w-full px-4 py-10 pb-[140px] lg:px-6 xl:px-8 min-[1440px]:px-10">
      <div className="mx-auto w-full max-w-[840px] xl:max-w-[900px] min-[1440px]:max-w-[980px] min-[1440px]:translate-x-[-122px]">
        {loading && (
          <div className="text-[14px] text-[#737373]">Loading...</div>
        )}

        {error && (
          <div className="border border-[#DBDBDB] bg-white p-3 text-[14px]">
            <div className="text-red-500">{error}</div>
            <div className="mt-1 text-[#737373]">
              Showing demo posts while the server wakes up.
            </div>
            <button
              type="button"
              onClick={loadFeed}
              className="mt-3 text-[14px] font-semibold text-[#0095F6] hover:text-[#1877F2]"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8 min-[1440px]:gap-x-[30px] min-[1440px]:gap-y-[22px]">
          {postsToRender.map((post) => (
            <FeedPost
              key={post._id}
              post={post}
              likeLoading={likeLoadingIds.has(post._id)}
              onToggleLike={isDemoPost(post) ? undefined : handleToggleLike}
              onOpenComments={isDemoPost(post) ? undefined : handleOpenComments}
              onOpenPost={isDemoPost(post) ? undefined : handleOpenPost}
            />
          ))}
        </div>

        <div className="mt-24 flex w-full flex-col items-center gap-3 text-center">
          <img src="/images/Done.svg" alt="Done" className="h-21 w-21" />
          <div className="text-center">
            <div className="text-[14px] font-semibold text-[#262626]">
              You've seen all the updates
            </div>
            <div className="text-[14px] text-[#8E8E8E]">
              You have viewed all new publications
            </div>
          </div>
        </div>
      </div>
      {modalPostId ? (
        <PostModal
          postId={modalPostId}
          allowMobile
          onClose={() => setModalPostId(null)}
          onDeleted={(id) =>
            setItems((prev) => prev.filter((p) => p._id !== id))
          }
          onEdit={(post) => setEditPost(post)}
        />
      ) : null}

      {isDesktop && editPost ? (
        <PostCreateModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onUpdated={(updated) => {
            setItems((prev) =>
              prev.map((p) =>
                p._id === updated._id ? { ...p, ...updated } : p,
              ),
            );
            setEditPost(null);
          }}
        />
      ) : null}
    </div>
  );
}
