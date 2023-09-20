// import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg';
// import ReactPaginate from 'react-paginate';

import './styles.css';
import Pagination from '@mui/material/Pagination';

type Props = {
    forcePage?: number;
    pageCount: number;
    range: number;
    onChange?: (pageNumber: number) => void;
}

const Paginate = ({ forcePage, pageCount, range, onChange }: Props) => {
    return (
        <div className='pagination-container'>
            <Pagination 
            count={pageCount}
            page={forcePage}
            defaultPage={range}
            onChange={(event, page) => (onChange) ? onChange(page) : {}}
            shape="rounded"
            color="primary"
            size="large"
            variant='outlined'
            showFirstButton
            showLastButton
            
            // forcePage={forcePage}
            // pageCount={pageCount}
            // pageRangeDisplayed={range}
            // marginPagesDisplayed={1}
            // containerClassName="pagination-container"
            // pageLinkClassName="pagination-item"
            // breakClassName="pagination-item"
            // previousClassName="arrow-previous"
            // nextClassName="arrow-next"
            // activeLinkClassName="pagination-link-active"
            // disabledClassName="arrow-inactive"

            // onPageChange={(items) => (onChange) ? onChange(items.selected) : {}}

            // previousLabel={<div className="pagination-arrow-container"><ArrowIcon /></div>}
            // nextLabel={<div className="pagination-arrow-container"><ArrowIcon /></div>}
        />
        </div>
        
    );
};

export default Paginate;
