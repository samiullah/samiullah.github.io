import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Edit3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import { getPostById, savePost } from '../services/storageService';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<BlogPost>({
    id: Date.now().toString(),
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    readTime: 5,
    author: 'Samiullah',
    coverImage: 'https://picsum.photos/800/400'
  });

  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (id) {
      const existing = getPostById(id);
      if (existing) setPost(existing);
    }
  }, [id]);

  const handleSave = () => {
    if (!post.title || !post.content) return alert('Title and Content required');
    savePost(post);
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/admin')} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
           </button>
           <h1 className="text-2xl font-bold text-white">{id ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
             onClick={() => setPreviewMode(!previewMode)}
             className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium"
          >
             {previewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
             {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button 
             onClick={handleSave}
             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors text-sm font-medium shadow-lg shadow-brand-500/20"
          >
             <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
         {/* Settings Column */}
         <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="font-semibold text-white">Post Details</h3>
                
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Title</label>
                    <input 
                        type="text" 
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Excerpt</label>
                    <textarea 
                        value={post.excerpt}
                        onChange={e => setPost({...post, excerpt: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 focus:outline-none h-24 resize-none"
                    />
                </div>

                 <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Cover Image URL</label>
                    <input 
                        type="text" 
                        value={post.coverImage || ''}
                        onChange={e => setPost({...post, coverImage: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 focus:outline-none text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Tags (Comma separated)</label>
                     <input 
                        type="text" 
                        value={tagInput}
                        placeholder="Add tag..."
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                if(tagInput.trim()) {
                                    setPost(prev => ({...prev, tags: [...prev.tags, tagInput.trim()]}));
                                    setTagInput('');
                                }
                            }
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 focus:outline-none mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs flex items-center gap-1">
                                {tag}
                                <button onClick={() => setPost(prev => ({...prev, tags: prev.tags.filter(t => t !== tag)}))} className="hover:text-red-400">
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
         </div>

         {/* Editor/Preview Area */}
         <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full min-h-[500px]">
            {previewMode ? (
                <div className="flex-grow p-8 overflow-y-auto prose prose-invert prose-lg max-w-none">
                     <h1 className="mb-4">{post.title}</h1>
                     {post.coverImage && <img src={post.coverImage} alt="Cover" className="rounded-xl mb-6 w-full h-64 object-cover" />}
                     <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            ) : (
                <textarea
                    value={post.content}
                    onChange={e => setPost({...post, content: e.target.value})}
                    placeholder="# Start writing your masterpiece..."
                    className="flex-grow w-full h-full bg-slate-900 text-slate-300 p-6 focus:outline-none resize-none font-mono text-sm leading-relaxed"
                />
            )}
         </div>
      </div>
    </div>
  );
};

export default Editor;