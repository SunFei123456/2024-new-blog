import React from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather'
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* 上一页按钮 */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 flex space-x-2"
            >
                <ArrowLeft></ArrowLeft> 
            </button>

            {/* 页码按钮 */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {page}
                </button>
            ))}

            {/* 下一页按钮 */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 "
            >
                 <ArrowRight></ArrowRight>
            </button>
        </div>
    );
};

export default Pagination;
