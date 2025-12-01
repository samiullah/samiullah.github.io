import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../services/storageService';
import { BlogPost } from '../types';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    if (id) {
      setPost(getPostById(id));
    }
  }, [id]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-200">Post not found</h2>
        <Link to="/" className="text-brand-400 mt-4 inline-block hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        type="article"
      />

      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-400 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
      </Link>

      <header className="mb-10">
        <div className="flex gap-2 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-brand-400 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">
              {post.author[0]}
            </div>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
           <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </header>
      
      {post.coverImage && (
        <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover rounded-2xl mb-12 shadow-2xl shadow-black/50"
        />
      )}

      {/* Top Ad Unit */}
      <AdSense />

      <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-code:text-brand-200 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {/* Bottom Ad Unit */}
      <AdSense />
    </div>
  );
};

export default PostDetails;