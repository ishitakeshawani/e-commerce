"use client";

import { useState } from "react";
import withAuth from "../_components/withauth";
import { Pagination } from "../_components/pagination";
import { useCategories } from "../hooks/useCategories";
import CategoryList from "../_components/categorylist";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, selectedCategories, handleCategorySelect } = useCategories(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="m-7 flex min-h-4/5 min-w-[600px]  flex-col items-center justify-center rounded-2xl border-2 border-borderColor bg-white p-9">
        <h3 className="mb-4 text-2xl font-semibold">Please mark your interests!</h3>
        <p className="text-center text-xs font-normal">We will keep you notified.</p>

        <div className="flex w-full flex-col items-start justify-start p-8 min-h-[300px]">
          <h4 className="text-left">My saved interests!</h4>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error loading categories</div>}
          {!isLoading && !isError && (
            <CategoryList
              categories={data?.categories ?? []}
              selectedCategories={selectedCategories}
              onSelect={handleCategorySelect}
            />
          )}
        </div>
        {!isLoading && !isError && (
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(CategoriesPage);
