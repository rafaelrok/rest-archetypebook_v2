import { Book } from "../../types/book";
import BookPrice from "../BookPrice";
import BookDate from "../BookDate";

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";


type Props = {
    book: Book;
}


const BookCard = ({ book }: Props) => {

    return (
        <Paper elevation={24} sx={{ maxWidth: 380, width: 300, height: 420, mt: 1, borderRadius: 3, bgcolor: '#dbdbdb' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://source.unsplash.com/random"
                sx={{ borderRadius: 1 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontStyle={'initial'} fontFamily={"sans-serif"}>
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={12}>
                    {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <BookDate date={book.launchDate} />
                </Typography>
                <Typography>
                    <BookPrice price={book.price} />
                </Typography>
            </CardContent>
            <Divider variant="middle" component="div" color="#000" />
            <CardActions>
                <Button size="small" color="primary">View</Button>
                <Button size="small" color="primary">Edit</Button>
            </CardActions>
        </Paper>
    );
}

export default BookCard;