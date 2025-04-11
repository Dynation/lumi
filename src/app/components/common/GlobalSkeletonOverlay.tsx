"use client";

import React from "react";

import { Skeleton } from "@heroui/skeleton";
import { useLoading } from "@/context/LoadingContext";
import { Spinner } from "@heroui/spinner" ;   
const GlobalSkeletonOverlay = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
      {/* Рендеримо Skeleton тільки коли isLoading === true */}
      {isLoading && (
        <Skeleton
          isLoaded={false}
          classNames={{
            base: "fixed inset-0 z-50 flex items-center justify-center bg-[var(--background-color)]",
          }}
        >
          <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
          <Spinner classNames={{ label: "text-foreground mt-4 z-100" }} label="gradient" />     
            <div className="w-2/3 z-100 h-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" >erijgn</div>
            <div className="w-1/2 z-100 h-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="w-1/4 z-100 h-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>
        </Skeleton>
      )}

      {/* Тестова кнопка, щоб бачити як це працює 
      <button onClick={() => setLoading(!isLoading)}>
  Toggle loading
</button>*/}
    </>
  );
};

export default GlobalSkeletonOverlay;
