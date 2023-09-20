import { useState, useEffect, useCallback } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Book } from '../../types/book';
import { SpringPage } from '../../types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import BookCard from '../../components/BookCard';
import { requestBackend } from '../../util/request';
import CardLoader from './CardLoader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paginate from '../../components/Paginate';

type ControlComponentsData = {
    activePage: number;
};

const theme = createTheme();

const Books = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<SpringPage<Book>>();
    const [controlComponentsData, setControlComponentsData] =
        useState<ControlComponentsData>({
            activePage: 0,
        });
    const handlePageChange = (pageNumber: number) => {
        setControlComponentsData({ activePage: pageNumber });
    };

    const getBooks = useCallback(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: '/api/book/v1',
            params: {
                page: controlComponentsData.activePage,
                size: 9,
                limit: 4,
                direction: 'ASC'
            },
        };

        setIsLoading(true);
        requestBackend(params)
            .then((response) => {
                console.log(response.data);
                setPage(response.data);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [controlComponentsData]);

    useEffect(() => {
        getBooks();
    }, [getBooks]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 5,
                            pb: 1,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Collection Books
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                A collection of books selected for your reading and studies on technology
                                some famous actors with extensive experience in the area, take advantage 
                                of the discounts and rent your book here to learn from the best.
                            </Typography>
                        </Container>
                    </Box>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={12}>
                            {isLoading ? (
                                <CardLoader />
                            ) : (
                                page?._embedded?.bookVOList?.map((book) => (
                                    <Grid item key={book.id} xs={12} sm={6} md={4}>
                                        <BookCard book={book} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Container>
                </main>
                <Paginate
                    forcePage={page?.number}
                    pageCount={page ? page.totalPages : 0}
                    range={3}
                    onChange={handlePageChange}
                />
            </ThemeProvider>
        </>
    );
}

export default Books;