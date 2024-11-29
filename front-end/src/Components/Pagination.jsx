function Pagination({ totalPages, paginate, currentPage }) {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="text-center p-2">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`p-2 px-6 mx-4 text-white rounded-xl ${
                        currentPage === number
                            ? "bg-blue-600" // Highlight current page
                            : "bg-blue-800"
                    }`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
