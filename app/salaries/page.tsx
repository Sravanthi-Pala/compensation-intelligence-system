'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Salary {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  confidenceScore: number;
}

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  
  // Sorting states
  const [sortBy, setSortBy] = useState('totalCompensation');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSalaries();
  }, [company, role, level, location, sortBy, sortOrder, page]);

  const fetchSalaries = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (company) params.append('company', company);
    if (role) params.append('role', role);
    if (level) params.append('level', level);
    if (location) params.append('location', location);
    params.append('sortBy', sortBy);
    params.append('sortOrder', sortOrder);
    params.append('page', page.toString());
    params.append('limit', itemsPerPage.toString());

    try {
      const res = await fetch(`/api/salaries?${params.toString()}`);
      const data = await res.json();
      setSalaries(data.data);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
    } catch (error) {
      console.error('Error fetching salaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const clearFilters = () => {
    setCompany('');
    setRole('');
    setLevel('');
    setLocation('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">Salary Database</h1>
          <p className="text-gray-600 mt-2">Compare compensation across companies and levels</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => { setCompany(e.target.value); setPage(1); }}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => { setRole(e.target.value); setPage(1); }}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={level}
              onChange={(e) => { setLevel(e.target.value); setPage(1); }}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="L3">L3</option>
              <option value="L4">L4</option>
              <option value="L5">L5</option>
              <option value="L6">L6</option>
              <option value="L7">L7</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => { setLocation(e.target.value); setPage(1); }}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 underline"
          >
            Clear Filters
          </button>
        </div>

        <div className="mb-4 text-gray-600">
          Found {totalItems} salaries
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading salaries...</p>
          </div>
        ) : salaries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No salaries found matching your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                    <th 
                      onClick={() => handleSort('experienceYears')}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Experience {getSortIcon('experienceYears')}
                    </th>
                    <th 
                      onClick={() => handleSort('totalCompensation')}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      Total Compensation {getSortIcon('totalCompensation')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Confidence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {salaries.map((salary) => (
                    <tr key={salary.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{salary.company}</td>
                      <td className="px-6 py-4 text-gray-600">{salary.role}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold">
                          {salary.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{salary.location}</td>
                      <td className="px-6 py-4 text-gray-600">{salary.experienceYears} years</td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatMoney(salary.totalCompensation)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            salary.confidenceScore > 0.8 ? 'bg-green-500' :
                            salary.confidenceScore > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-sm text-gray-600">{Math.round(salary.confidenceScore * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/compare?id1=${salary.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Compare →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}