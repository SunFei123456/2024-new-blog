import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCEArticleByIdApi } from '@/apis'
import { convertISOToLocalDateTime, formatDate } from '@/tools';

export default function CognitiveExpansionArticleDetail() {
    const { id } = useParams();

    const [article, setArticle]= useState<any>({});

    const getArticle = async () => {
        const { data } = await getCEArticleByIdApi(id);
        setArticle(data.data);
    }
    useEffect(() => {
        getArticle();
    }, [])


    if (!article) {
        return <div>文章未找到</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <p className="text-sm text-gray-500">
                 发布时间: {formatDate(article.created_at)}


            </p>
            <div className="mt-4">
                <p>{article.body}</p>
            </div>
        </div>
    );
}
