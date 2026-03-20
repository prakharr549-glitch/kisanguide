/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <Link to="/blog" className="text-emerald-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="aspect-video w-full">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="p-8 md:p-12 space-y-6">
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-2 text-emerald-600"><Tag className="w-4 h-4" /> {post.category}</span>
            <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors ml-auto">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-emerald max-w-none text-stone-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
            <Link key={p.id} to={`/blog/${p.id}`} className="flex gap-4 bg-white p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 transition-all group">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-snug group-hover:text-emerald-600 transition-colors">{p.title}</h3>
                <p className="text-xs text-stone-500 mt-1">{p.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
