'use client';

import { useState } from 'react';

export default function WeeklyHighlight() {
  const [leetcodeProblems] = useState(0);
  const [dsaHours] = useState(0);
  const [workoutDays] = useState(0);
  const [projectHours] = useState(0);

  const metrics = [
    {
      label: 'LeetCode Problems',
      current: leetcodeProblems,
      target: 10,
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-500',
      icon: (
        <svg
          className="size-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      label: 'DSA Hours',
      current: dsaHours,
      target: 15,
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-500',
      icon: (
        <svg
          className="size-5 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      label: 'Workout Days',
      current: workoutDays,
      target: 5,
      bgColor: 'bg-green-50',
      barColor: 'bg-green-500',
      icon: (
        <svg
          className="size-5 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      label: 'Project Hours',
      current: projectHours,
      target: 20,
      bgColor: 'bg-orange-50',
      barColor: 'bg-orange-500',
      icon: (
        <svg
          className="size-5 text-orange-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="size-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <h2 className="text-base font-normal text-slate-900">This Week</h2>
        </div>
        <span className="text-base text-slate-500">Dec 8 - Present</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const progress =
            metric.target > 0 ? (metric.current / metric.target) * 100 : 0;

          return (
            <div
              key={metric.label}
              className={`rounded-lg border border-slate-200 p-4 ${metric.bgColor}`}
            >
              <div className="mb-3 flex items-center gap-2">
                {metric.icon}
                <span className="text-base text-slate-700">{metric.label}</span>
              </div>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-base text-slate-900">
                  {metric.current}
                </span>
                <span className="text-base text-slate-500">
                  / {metric.target}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                <div
                  className={`h-full rounded-full ${metric.barColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
