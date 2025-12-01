import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <article className={`group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      {post.coverImage && (
        <div className={`overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`font-bold text-slate-100 mb-2 group-hover:text-brand-400 transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
          <Link to={`/post/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="text-slate-400 mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-800">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
           </div>
           <ArrowRight className="h-4 w-4 text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </article>
  );
};

export default PostCard;
