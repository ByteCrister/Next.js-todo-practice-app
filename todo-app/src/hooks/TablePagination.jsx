"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = ({ handlePagination, MainTodos }) => {
  const todosPerPage = 3;
  const totalPages = Math.ceil(MainTodos.length / todosPerPage);

  const handlePageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * todosPerPage;
    const endIndex = pageNumber * todosPerPage;
    const paginatedData = MainTodos.slice(startIndex, endIndex);
    handlePagination(paginatedData);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem className='text-slate-500 font-semibold hover:cursor-pointer'>
          <PaginationPrevious
            onClick={() => handlePageChange(1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => handlePageChange(page + 1)} className='text-slate-500 font-semibold hover:cursor-pointer'>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis */}
        {totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem className='text-slate-500 font-semibold hover:cursor-pointer'>
          <PaginationNext
            onClick={() => handlePageChange(totalPages)} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;