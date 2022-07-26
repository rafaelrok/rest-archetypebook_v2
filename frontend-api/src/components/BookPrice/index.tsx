
import { formatPrice } from '../../util/formatters';
import './styles.css';

type Props = {
    price: number;
}

const BookPrice = ({ price }: Props) => {

    return (
        <div className="book-price-container">
            <span>R$</span>
            <h3>{formatPrice(price)}</h3>
        </div>
    );
}

export default BookPrice;