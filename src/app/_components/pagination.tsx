export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 7  || (i >= currentPage - 3 && i <= currentPage + 3)) {
        pageNumbers.push(i);
      }
    }
    
  
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1"
        >
          {"<<"}
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1"
        >
          {"<"}
        </button>
  
        {pageNumbers.map((page, index) =>
          page === currentPage ? (
            <span key={index} className="px-2 py-1 font-bold">
              {page}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className="px-2 py-1"
            >
              {page}
            </button>
          )
        )}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1"
        >
          {">"}
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1"
        >
          {">>"}
        </button>
      </div>
    );
  };
  