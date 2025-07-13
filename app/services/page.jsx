"use client"

import { useEffect, useState } from 'react';
import Header from './../components/Header';
import Banner from './../components/Banner';
import IdeaCard from './../components/IdeaCard';
import Pagination from './../components/Pagination';

export default function Home() {
    const [ideas, setIdeas] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('-published_at');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchIdeas = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/ideas?page=${page}&size=${size}&sort=${sort}`);
                const json = await res.json();
                // console.log('API RESPONSE:', json);
                setIdeas(json.data || []);
                setTotal(json.meta?.total || 0);
            } catch (error) {
                console.error('Error fetching ideas:', error);
                setIdeas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchIdeas();
    }, [page, size, sort]);

    const totalPages = Math.ceil(total / size);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header active="Ideas" />
            <Banner imageUrl="https://cms-api.example.com/banner.jpg" /> {/* Sesuaikan saja url API nya */}
            {/* Main Content */}
            <div className="bg-white pt-5 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Controls Section */}
                    <div className="flex flex-row justify-between  sm:items-center mb-8 gap-4">
                        {/* Showing Results */}
                        <div className="text-sm text-gray-600 order-1 sm:order-2">
                            Showing {((page - 1) * size) + 1} - {Math.min(page * size, total)} of {total}
                        </div>

                        {/* Sort & Size Controls */}
                        <div className="flex items-end sm:items-center gap-4 order-1 sm:order-2 sm:flex-row flex-col">
                            {/* Per Page Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap">Show per page:</label>
                                <div className="relative">
                                    <select
                                        value={size}
                                        onChange={(e) => {
                                            setSize(Number(e.target.value));
                                            setPage(1);
                                        }}
                                        className="appearance-none border w-25 border-gray-300 rounded-full px-4 py-2 pr-8 text-sm bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) => {
                                            setSort(e.target.value);
                                            setPage(1);
                                        }}
                                        className="appearance-none sm:w-35 border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm bg-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    >
                                        <option value="-published_at">Newest</option>
                                        <option value="published_at">Oldest</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ideas Grid */}
                    <div className="mb-12">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                            </div>
                        ) : ideas.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-gray-400 text-6xl mb-4">📝</div>
                                <p className="text-gray-500 text-lg">No ideas available at the moment.</p>
                                <p className="text-gray-400 text-sm mt-2">Please check back later or try different filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {ideas.map((idea) => (
                                    <IdeaCard key={idea.id} idea={idea} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}