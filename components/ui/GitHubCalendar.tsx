'use client';

import React, { useEffect, useState } from "react";
import { ActivityCalendar, Activity } from "react-activity-calendar";

interface Props {
  username: string;
}

const calendarTheme = {
  light: [
    "hsl(0, 0%, 92%)",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
  ],
  dark: [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ],
};

const FETCH_TIMEOUT_MS = 10_000;

export const GitHubCalendar: React.FC<Props> = ({ username }) => {
  const [data, setData] = useState<Activity[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let active = true;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/github-contributions?username=${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (!Array.isArray(result?.contributions)) {
          throw new Error("Malformed contribution data");
        }

        if (active) {
          setData(result.contributions);
        }
      } catch {
        if (active) {
          setError(new Error("Failed to load GitHub activity"));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
        clearTimeout(timeout);
      }
    };

    fetchData();

    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [username, attempt]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-neutral-500 dark:text-neutral-400">Loading GitHub activity...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-neutral-500 dark:text-neutral-400">Unable to load GitHub activity</div>
        <button
          type="button"
          onClick={() => setAttempt((value) => value + 1)}
          className="rounded-full border-2 border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white transition-colors hover:border-black dark:hover:border-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const calendarProps = {
    data: data || [],
    blockSize: 12,
    fontSize: 14,
    theme: calendarTheme,
  };

  return (
    <div className="w-full overflow-x-auto">
      {data && data.length > 0 && (
        <>
          <div className="dark:hidden">
            <ActivityCalendar {...calendarProps} colorScheme="light" />
          </div>
          <div className="hidden dark:block">
            <ActivityCalendar {...calendarProps} colorScheme="dark" />
          </div>
        </>
      )}
    </div>
  );
};
