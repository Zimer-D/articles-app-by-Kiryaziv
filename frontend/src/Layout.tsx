import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ArticlesList from "./pages/articleList/ArticlesList";
import ArticlePage from "./pages/articlePage/ArticlePage";
import Error404 from "./pages/errorPage";

const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Routes>
                    <Route path='/' element={<ArticlesList />} />
                    <Route path='/articles/:id' element={<ArticlePage />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
}

export default Layout;