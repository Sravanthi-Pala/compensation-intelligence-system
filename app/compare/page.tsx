"use client";

import { useEffect, useState } from "react";

export default function ComparePage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/salaries")
      .then((res) => res.json())
      .then((data) => setSalaries(data.data));
  }, []);

  const compare = async () => {
    if (id1 === id2) {
      alert("Cannot compare same salary");
      return;
    }

    const res = await fetch(
      `/api/compare?id1=${id1}&id2=${id2}`
    );

    const data = await res.json();

    setResult(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-5xl font-bold mb-8">
          Compare Salaries
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <select
            className="p-4 rounded-2xl border"
            onChange={(e) => setId1(e.target.value)}
          >
            <option>Select Salary 1</option>

            {salaries.map((salary) => (
              <option
                key={salary.id}
                value={salary.id}
              >
                {salary.company} - {salary.role} -{" "}
                {salary.level}
              </option>
            ))}
          </select>

          <select
            className="p-4 rounded-2xl border"
            onChange={(e) => setId2(e.target.value)}
          >
            <option>Select Salary 2</option>

            {salaries.map((salary) => (
              <option
                key={salary.id}
                value={salary.id}
              >
                {salary.company} - {salary.role} -{" "}
                {salary.level}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={compare}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Compare
        </button>

        {result && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-2xl font-bold">
                Salary 1
              </h2>

              <div className="mt-4 space-y-2">
                <p>
                  Base: ₹
                  {result.salary1.base.toLocaleString()}
                </p>

                <p>
                  Bonus: ₹
                  {result.salary1.bonus.toLocaleString()}
                </p>

                <p>
                  Stock: ₹
                  {result.salary1.stock.toLocaleString()}
                </p>

                <p className="font-bold text-green-600">
                  Total: ₹
                  {result.salary1.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6">
              <h2 className="text-2xl font-bold">
                Salary 2
              </h2>

              <div className="mt-4 space-y-2">
                <p>
                  Base: ₹
                  {result.salary2.base.toLocaleString()}
                </p>

                <p>
                  Bonus: ₹
                  {result.salary2.bonus.toLocaleString()}
                </p>

                <p>
                  Stock: ₹
                  {result.salary2.stock.toLocaleString()}
                </p>

                <p className="font-bold text-green-600">
                  Total: ₹
                  {result.salary2.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}