import { useEffect, useState } from "react";
import { Link } from "wouter";
import type { BlogPost } from "@/data/blog/types";

interface NewsCarouselProps {
  posts: BlogPost[];
}

const AUTO_ADVANCE_MS = 6000;

export default function NewsCarousel({ posts }: NewsCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || posts.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % posts.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, posts.length]);

  if (posts.length === 0) return null;

  return (
    <div
      className="relative w-full h-[440px] md:h-[560px] rounded-3xl overflow-hidden glass-card animate-on-scroll"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {posts.map((post, i) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className={`absolute inset-0 ${i === active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"} transition-opacity duration-700`}
        >
          <img
            src={post.cover}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

          <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-[#2A2A2A]">
            <img src="/esfera-southmedia.png" alt="" className="w-5 h-5 rounded-full" />
            <span className="text-white text-xs font-bold font-['Inter'] uppercase tracking-wide">South Media</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="pill-label mb-4 inline-block !py-1.5 !px-4 !text-[0.7rem]">{post.category}</span>
            <h2 className="font-['Inter'] font-bold text-white text-2xl md:text-4xl lg:text-5xl mb-3 max-w-3xl text-balance leading-tight">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span>{post.date}</span>
              <span>&bull;</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </div>
        </Link>
      ))}

      {posts.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Notícia anterior"
            onClick={() => setActive((i) => (i - 1 + posts.length) % posts.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-[#2A2A2A] flex items-center justify-center text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próxima notícia"
            onClick={() => setActive((i) => (i + 1) % posts.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-[#2A2A2A] flex items-center justify-center text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para notícia ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-[#F45504]" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
