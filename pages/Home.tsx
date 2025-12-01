import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { getPosts } from '../services/storageService';
import PostCard from '../components/PostCard';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Home" 
        description="Samiullah's professional blog about Playwright automation, SDET practices, and JavaScript testing." 
      />
      
      {/* Hero Section */}
      <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6 tracking-tight">
          Engineering Quality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Playwright</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
          Hi, I'm Samiullah. I write about modern e2e testing, JavaScript design patterns, and building resilient automation infrastructure.
        </p>
        
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all shadow-lg"
            placeholder="Search articles, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <PostCard key={post.id} post={post} featured={idx === 0 && !search} />
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto mt-12">
        <AdSense />
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p>No posts found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Home;