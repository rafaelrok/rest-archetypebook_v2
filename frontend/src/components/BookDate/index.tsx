
import { formatDate } from '../../util/formatters';
import './styles.css';

type Props = {
    date: string;
}

const BookDate = ({ date }: Props) => {

    return (
        <div className="book-date-container">
            <span>Data</span>
            <h3>{formatDate(date)}</h3>
        </div>
    );
}

export default BookDate;