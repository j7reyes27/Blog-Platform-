
const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const maxVisiblePages = 5
    const getVisiblePages = () => {
        let startPage = Math.max(currentPage - maxVisiblePages / 2, 1)
        let endPage = startPage + maxVisiblePages - 1;
    }
    return (
        <div>{totalPages}</div>
    )
};

export default Pagination;
