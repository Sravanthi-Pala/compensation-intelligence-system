'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/company/${searchTerm.toLowerCase().trim()}`);
    }
  };

  const companies = ['Google', 'Microsoft', 'Amazon', 'Flipkart'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Compensation Intelligence System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Levels-based compensation insights for Indian tech industry
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by company name..."
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Search →
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {companies.map((company) => (
              <Link
                key={company}
                href={`/company/${company.toLowerCase()}`}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {company}
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          <Link href="/salaries" className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
              📊
            </div>
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
              Salary Table
            </h2>
            <p className="mt-3 text-gray-600">
              Browse and filter compensation data with sorting and pagination
            </p>
          </Link>

          <Link href="/company/google" className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5">
              📈
            </div>
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              Company Analytics
            </h2>
            <p className="mt-3 text-gray-600">
              View compensation distributions, median salary, and level-based insights
            </p>
          </Link>

          <Link href="/compare" className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-5">
              ⚖️
            </div>
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              Compare
            </h2>
            <p className="mt-3 text-gray-600">
              Side-by-side comparison of salaries, stock, and level differences
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}