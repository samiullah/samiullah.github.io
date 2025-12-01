import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { BlogPost } from '../types';
import { getPosts, deletePost } from '../services/storageService';

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
      setPosts(getPosts());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold text-white">Dashboard</h1>
           <p className="text-slate-400 mt-1">Manage your blog content</p>
        </div>
        <Link 
          to="/editor" 
          className="inline-flex items-center px-4 py-2 bg-brand-600 border border-transparent rounded-lg font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-lg shadow-brand-500/20"
        >
          <Plus className="h-5 w-5 mr-2" /> New Post
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tags</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-slate-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{post.title}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                     <div className="flex gap-1">
                        {post.tags.slice(0, 2).map(t => (
                            <span key={t} className="px-2 py-0.5 rounded text-xs bg-slate-800 border border-slate-700">{t}</span>
                        ))}
                        {post.tags.length > 2 && <span className="text-xs text-slate-600">+{post.tags.length - 2}</span>}
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/editor/${post.id}`} className="text-brand-400 hover:text-brand-300 mr-4 inline-flex items-center">
                       <Edit className="h-4 w-4 mr-1" /> Edit
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300 inline-flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
             <div className="text-center py-12 text-slate-500">No posts yet. Start writing!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
