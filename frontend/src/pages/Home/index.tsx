import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import FeaturedPost from '../../components/FeaturedPost';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';

import BlogPost1 from '../../static/blog-post.1.md';
import BlogPost2 from '../../static/blog-post.2.md';
import BlogPost3 from '../../static/blog-post.3.md';

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
    title: 'A new way of learning',
    description:
        "An online library, informing new readers quickly and efficiently about what is most interesting in the content of this post about the authors of great works of current technology.",
    image: 'https://images.alphacoders.com/132/thumb-1920-1326370.png',
    imageText: 'main image description',
    linkText: '',
};

const featuredPosts = [
    {
        title: 'Clean Architecture',
        date: 'Agu 01 2008',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content. Every year, countless hours and significant',
        image: 'https://m.media-amazon.com/images/I/411csr6Nn0L.jpg',
        imageLabel: 'Image Text',
    },
    {
        title: 'Clean Code',
        date: 'Set 12 2001',
        description:
            'By applying universal rules of software architecture, you can dramatically improve developer productivity throughout.',
        // image: 'https://source.unsplash.com/random',
        image: 'https://m.media-amazon.com/images/I/51b7XbfMIIL._SL1057_.jpg',
        imageLabel: 'Image Text',
    },
];

const blogPosts = [BlogPost1, BlogPost2, BlogPost3];

const sidebar = {
    title: 'About',
    description:
        'Site inspired by the development of people, based on a diversity of broad technologies, opening doors to knowledge and learning, a global library.',
    archives: [
        { title: 'March 2023', url: '#' },
        { title: 'February 2023', url: '#' },
        { title: 'January 2023', url: '#' },
        { title: 'November 2023', url: '#' },
        { title: 'October 2023', url: '#' },
        { title: 'September 2023', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

const theme = createTheme();

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Main title="From the firehose" posts={blogPosts} />
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}