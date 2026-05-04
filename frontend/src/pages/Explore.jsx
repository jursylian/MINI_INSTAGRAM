import React, { useCallback, useEffect, useState } from "react";

import { request } from "../lib/apiClient.js";
import { EXPLORE_LIMIT } from "../lib/constants.js";
import PostModal from "../components/PostModal.jsx";
import PostCreateModal from "../components/PostCreateModal.jsx";
import useIsDesktop from "../lib/useIsDesktop.js";
import { defaultPosts, isDemoPost } from "../data/defaultPosts.js";

const TILE_AREAS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

export default function Explore() {
  const isDesktop = useIsDesktop();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalPostId, setModalPostId] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const postsToRender = !loading && items.length === 0 ? defaultPosts : items;

  const loadExplore = useCallback(async (isActive = () => true) => {
    setLoading(true);
    setError(null);
    try {
      const data = await request(`/explore/posts?limit=${EXPLORE_LIMIT}`);
      if (isActive()) {
        setItems(data.items || []);
      }
    } catch (err) {
      if (isActive()) {
        setItems([]);
        setError(err.message || "Failed to load Explore.");
      }
    } finally {
      if (isActive()) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    loadExplore(() => mounted);
    return () => {
      mounted = false;
    };
  }, [loadExplore]);

  return (
    <div className="px-2 md:px-10 py-10 pb-20 md:pb-10">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="mt-6">
          {loading ? <div className="text-[14px] text-[#737373]">Loading...</div> : null}
          {error ? (
            <div className="p-4 text-[14px]">
              <div className="text-red-500">{error}</div>
              <div className="mt-1 text-[#737373]">
                Showing demo posts while the server wakes up.
              </div>
              <button
                type="button"
                onClick={() => loadExplore()}
                className="mt-3 font-semibold text-[#0095F6] hover:text-[#1877F2]"
              >
                Retry
              </button>
            </div>
          ) : null}

          <div
            className="mt-6 grid grid-cols-3 gap-1 md:gap-[4px]"
            style={
              isDesktop
                ? {
                    gridAutoRows: "317px",
                    gridTemplateAreas: '"a b c" "d e c" "f g h" "f i j"',
                  }
                : undefined
            }
          >
            {postsToRender.map((post, index) => (
              isDemoPost(post) ? (
                <div
                  key={post._id}
                  className="overflow-hidden bg-[#F2F2F2] aspect-square md:aspect-auto"
                  style={
                    isDesktop && TILE_AREAS[index]
                      ? { gridArea: TILE_AREAS[index] }
                      : undefined
                  }
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.caption || "post"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
              ) : (
                <button
                  key={post._id}
                  type="button"
                  onClick={() => setModalPostId(post._id)}
                  className="overflow-hidden bg-[#F2F2F2] aspect-square md:aspect-auto"
                  style={
                    isDesktop && TILE_AREAS[index]
                      ? { gridArea: TILE_AREAS[index] }
                      : undefined
                  }
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.caption || "post"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {modalPostId ? (
        <PostModal
          postId={modalPostId}
          allowMobile
          onClose={() => setModalPostId(null)}
          onDeleted={(id) => setItems((prev) => prev.filter((p) => p._id !== id))}
          onEdit={(post) => setEditPost(post)}
        />
      ) : null}

      {isDesktop && editPost ? (
        <PostCreateModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onUpdated={(updated) => {
            setItems((prev) =>
              prev.map((p) => (p._id === updated._id ? { ...p, ...updated } : p))
            );
            setEditPost(null);
          }}
        />
      ) : null}
    </div>
  );
}
