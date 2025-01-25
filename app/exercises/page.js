"use client";

import { useState, useEffect } from "react";
import ExercisesList from "@/components/exercises/exercises-list";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  });

  const fetchExercises = async (page = 1) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/exercises?page=${page}&limit=${pagination.itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch exercises");
      const data = await res.json();
      setExercises(data.exercises);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchExercises(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - 2);
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          className={
            pagination.currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // First page
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={pagination.currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={pagination.totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(pagination.totalPages)}
          >
            {pagination.totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className={
            pagination.currentPage === pagination.totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            Exercise Library
          </h1>
          <p
            className="relative w-[max-content] mx-auto font-mono text-xl text-neutral-600 dark:text-neutral-300 mb-12
            before:absolute before:inset-0 before:animate-typewriter before:bg-background"
          >
            Browse through our collection of exercises and find the perfect ones
            for your workout routine
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
          </div>
        ) : (
          <>
            <ExercisesList initialExercises={exercises} />
            <div className="mt-12 mb-8">
              <Pagination>
                <PaginationContent>{renderPaginationItems()}</PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
