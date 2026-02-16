'use client';

import React, { useState, useEffect } from "react";
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

export const GitHubCalendar: React.FC<Props> = ({ username }) => {
  const [data, setData] = useState<Activity[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const result = await response.json();
        if (result) {
          setData(result.contributions);
        }
      } catch (error: unknown) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-neutral-500 dark:text-neutral-400">Loading GitHub activity...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-neutral-500 dark:text-neutral-400">Unable to load GitHub activity</div>
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
