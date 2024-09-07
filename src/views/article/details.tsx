import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag } from 'react-feather';
import { useParams } from 'react-router-dom';
import { getArticleByIdApi } from '@/apis';
import { ArticleType } from '@/type';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default function ArticleDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState<ArticleType | null>(null);
    const md = new MarkdownIt({
        linkify: true,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    const highlightedCode = hljs.highlight(str, { language: lang });
                    const lines = highlightedCode.value.split("\n");
                    const lineNumbers = lines
                        .map((line, index) => `<span class="hljs">${ index + 1}</span> ${line}`)
                        .join("\n") ;
                    return `<pre><code class="hljs ${lang}">\n${lineNumbers}\n</code></pre>`;
                } catch (error) {
                    console.error("Error highlighting code:", error);
                    return "";
                }
            } else {
                return "";
            }
        },
    });

    // Fetch article by ID
    const getArticleById = async (id: string) => {
        try {
            const res = await getArticleByIdApi(id);
            const data: ArticleType = res.data;
            setArticle(data);
        } catch (error) {
            console.error("Error fetching article:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getArticleById(id);
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>No article found.</div>;
    }

    return (
        <div className="w-full space-y-12 p-24 pt-12 relative">
            <div className="w-full h-[600px]">
                <img src={article.coverImage} alt="Cover" className="w-full h-full object-cover rounded-lg shadow-md" />
            </div>
            <div className="w-full flex gap-16 justify-between ">
                {/* 左边文章 */}
                <div className="w-3/4 space-y-6">
                    <h1 className="text-4xl font-bold">{article.title}</h1>
                    <div className="flex items-center text-gray-600 space-x-4">
                        <div className="flex items-center gap-2">
                            <User size={20} />
                            <span>{article.user.nickname}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={20} />
                            <span>{article.created_at}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={20} />
                            <span>Entertainment</span>
                        </div>
                        <span>• 10 min read</span>
                    </div>

                    {/* Render article content with MarkdownIt */}
                    <div
                        className="prose max-w-none break-words w-full"
                        style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                        dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
                    />
                </div>

                {/* 右边推荐 */}
                <div className="w-1/4 space-y-6 sticky top-24 right-0">
                    <h2 className="text-xl font-semibold">Trending Post</h2>
                    <div className="flex flex-col gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="w-full h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Recommended Post"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
