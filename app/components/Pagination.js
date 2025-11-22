export default function Pagination({
  page,
  totalPages,
  onChange,
}) {
  // Helper: page number range
  const getPages = () => {
    const pages = [];

    if (totalPages <= 6) {
      // Show all pages if total pages are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Add ellipsis (...)
      if (page > 3) pages.push("...");

      // Add middle pages
      for (let i = page - 1; i <= page + 1; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      // Add ellipsis before last page
      if (page < totalPages - 2) pages.push("...");

      // Add last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

      {/* Previous Button */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page Buttons */}
      {getPages().map((p, i) => (
        <button
          key={i}
          disabled={p === "..."}
          onClick={() => p !== "..." && onChange(p)}
          className={`px-3 py-1 border rounded
            ${page === p ? "bg-blue-600 text-white" : ""}
            ${p === "..." ? "cursor-default opacity-60" : ""}
          `}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
