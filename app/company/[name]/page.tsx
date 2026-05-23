"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

interface CompanyData {
  salaries: Salary[];
  medianCompensation: number;
  levelDistribution: Record<string, number>;
}

export default function CompanyPage() {
  const params = useParams();
  const companyName = params.name as string;
  
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyName) {
      fetchCompanyData();
    }
  }, [companyName]);

  const fetchCompanyData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/company/${companyName}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      const result = await res.json();
      console.log("API Response:", result);
      
      // Handle different response structures
      if (result.salaries && Array.isArray(result.salaries)) {
        setData(result);
      } else if (result.data && result.data.salaries) {
        setData(result.data);
      } else {
        setData({
          salaries: result.salaries || result.data || [],
          medianCompensation: result.medianCompensation || 0,
          levelDistribution: result.levelDistribution || {}
        });
      }
    } catch (err) {
      console.error("Error fetching company data:", err);
      setError(err instanceof Error ? err.message : "Failed to load company data");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateAverageByLevel = () => {
    if (!data?.salaries || data.salaries.length === 0) return {};
    
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    
    data.salaries.forEach((salary) => {
      if (!sums[salary.level]) {
        sums[salary.level] = 0;
        counts[salary.level] = 0;
      }
      sums[salary.level] += salary.totalCompensation;
      counts[salary.level]++;
    });
    
    const averageByLevel: Record<string, number> = {};
    Object.keys(sums).forEach((level) => {
      averageByLevel[level] = sums[level] / counts[level];
    });
    
    return averageByLevel;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchCompanyData}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.salaries || data.salaries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No salary data found for {companyName}</p>
            <Link
              href="/salaries"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse All Companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageByLevel = calculateAverageByLevel();
  const levels = Object.keys(data.levelDistribution).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mt-4 capitalize">
            {companyName}
          </h1>
          <p className="text-gray-600 mt-2">
            {data.salaries.length} salary entries • Median: {formatMoney(data.medianCompensation)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-blue-100 text-sm mb-2">Median Total Compensation</p>
            <p className="text-4xl font-bold">{formatMoney(data.medianCompensation)}</p>
            <p className="text-blue-100 text-sm mt-2">Across all levels</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <p className="text-gray-600 text-sm mb-2">Total Salary Entries</p>
            <p className="text-4xl font-bold text-gray-800">{data.salaries.length}</p>
            <p className="text-gray-500 text-sm mt-2">Unique compensation data points</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Level Distribution</h2>
          <div className="space-y-4">
            {levels.map((level) => (
              <div key={level}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-700">{level}</span>
                  <span className="text-gray-600">
                    {data.levelDistribution[level]} entries
                    {averageByLevel[level] && ` • Avg: ${formatMoney(averageByLevel[level])}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 rounded-full h-3 transition-all duration-500"
                    style={{
                      width: `${(data.levelDistribution[level] / data.salaries.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Salary Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Experience</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Base Salary</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Bonus</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.salaries.map((salary) => (
                  <tr key={salary.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{salary.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold">
                        {salary.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{salary.location}</td>
                    <td className="px-6 py-4 text-gray-600">{salary.experienceYears} years</td>
                    <td className="px-6 py-4 text-gray-600">{formatMoney(salary.baseSalary)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatMoney(salary.bonus)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatMoney(salary.stock)}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      {formatMoney(salary.totalCompensation)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}