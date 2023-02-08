import { Fragment, useEffect, useMemo, useState } from "react";
import { Button, CloseButton, FormControl, InputGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { DateRange } from "react-date-range";
import { Article } from "../../types";
import ArticleItem from "./ArticleItem";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Icon from "../../UI/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/store/reducer";
import AddArticle from "../../components/addArticle";


const ArticlesList = () => {
    // const [items, setItems] = useState<Article[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const documentsPerPage = 5;
    const dispatch = useDispatch();
    const storedArticles = useSelector((state: any) => state.articlesToRead)
    const [dateRange, setDateRange] = useState<any[]>([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const result = await axios(
    //                 '/api/articles',
    //             );
    //             setItems(result.data);
    //             setLoading(false);
    //         } catch (error) { alert("Something went wrong, try again later") }
    //     }
    //     fetchData();

    // }, []);
    useEffect(() => {
        setLoading(true)
        //@ts-ignore
        dispatch(fetchArticles())
        setLoading(false)
    }, [dispatch]);


    const clearInput = () => {
        setSearchTerm('')
    }
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(storedArticles?.length / documentsPerPage); i++) {
        pageNumbers.push(i);
    }

    const documentsData = useMemo(() => {

        let computedDocuments = storedArticles;
        if (searchTerm) {
            computedDocuments = computedDocuments?.filter((q: any) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
        };
        if (!!dateRange) {
            computedDocuments = computedDocuments?.filter((q: any) => new Date(q.date) >= dateRange[0].startDate)
        }
        return computedDocuments?.slice(
            (currentPage - 1) * documentsPerPage,
            (currentPage - 1) * documentsPerPage + documentsPerPage
        );
    }, [dateRange, currentPage, searchTerm, storedArticles]);


    const paginate = (pageNumbers: number) => setCurrentPage(pageNumbers);

    if (loading) { return <Spinner animation="border" variant="secondary" /> }

    return (
        <>
            <div className="inlineDiv" style={{ justifyContent: 'space-between' }}>
                <h2>Articles</h2>
                <Button variant="secondary" onClick={() => setShowModal(true)}>Add your story</Button>
            </div>
            <div className="filterGroup">
                <div className="titleFilter">
                    Search by article's title:
                    <InputGroup>
                        <FormControl
                            id="searchInput"
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <Button variant="secondary" onClick={clearInput}>Clear</Button>
                    </InputGroup>
                </div>
                <div className="inlineDiv">
                    or by date:{'\xA0'}
                    <OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={
                        <Popover id={`popover-positioned-bottom`} style={{ maxWidth: "400px" }}>
                            <Popover.Header><CloseButton onClick={() => document.body.click()} /></Popover.Header>
                            <Popover.Body>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDateRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                />
                            </Popover.Body>
                        </Popover>
                    }>
                        <div className="icon"><Icon name={"calendar"} size={30} /></div>
                    </OverlayTrigger>
                </div>
            </div>
            <div>
                {!documentsData?.length &&
                    <div className="error">No documents matching the search criteria</div>}
                {!!documentsData ? documentsData.map((item: Article) => (
                    <Fragment key={item.id}>
                        <ArticleItem item={item} />
                    </Fragment>
                ))
                    :
                    <div>There is no articles</div>}
                <div className="pageItem">
                    {pageNumbers.map((number) => (
                        <div key={number} >
                            <Button variant="secondary" onClick={() => paginate(number)}  className='pageButtons'>
                                {number}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <AddArticle
                show={showModal}
                setShow={setShowModal}
            />
        </>
    )
}

export default ArticlesList