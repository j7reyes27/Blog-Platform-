
const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const maxVisiblePages = 5
    const getVisiblePages = () => {
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
        let endPage = startPage + maxVisiblePages - 1;

        if(endPage > totalPages){
            endPage = totalPages;
            startPage = Math.max(endPage - maxVisiblePages + 1, 1)
        }
    }


    return (
        <div>{totalPages}</div>
    )
};

export default Pagination;
