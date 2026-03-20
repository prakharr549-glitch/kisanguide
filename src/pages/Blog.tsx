/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Blog: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Agricultural Blog & News</h1>
        <p className="text-stone-600">Latest farming tips, crop guides, and agricultural news in Hindi and English.</p>
      </div>

      <AdPlaceholder slot="blog-top" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6 flex-grow space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1 text-emerald-600"><Tag className="w-3 h-3" /> {post.category}</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 group-hover:text-emerald-600 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link 
                to={`/blog/${post.id}`} 
                className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdPlaceholder slot="blog-bottom" />
    </div>
  );
};
