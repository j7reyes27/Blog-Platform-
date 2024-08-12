
const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const maxVisiblePages = 5
    const getVisiblePages = () => {
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
        let endPage = startPage + maxVisiblePages - 1;

        if(endPage > totalPages){
            endPage = totalPages;
            startPage = Math.max(endPage - maxVisiblePages + 1, 1)
        }


        const numberOfPages = endPage - startPage;
        const visiblePages = [];
    
        for(let i = 0; i < numberOfPages; i++){
          visiblePages.push(startPage + i)
        }
    
        return visiblePages;
    }

    const visiblePages = getVisiblePages();


    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage -1)} disabled={currentPage === 1}>&lt;</button>
        {visiblePages.map((page) => (
            <button>this is  abutton</button>
        ))}
        </div>
    )
};

export default Pagination;
