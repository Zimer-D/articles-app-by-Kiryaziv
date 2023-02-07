import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Button, CloseButton, FormControl, InputGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { DateRange } from "react-date-range";
import { Article } from "../../types";
import ArticleItem from "./ArticleItem";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Icon from "../../UI/icons";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../../redux/store/reducer";
import AddArticle from "../../components/addArticle";


const ArticlesList = () => {
    const [items, setItems] = useState<Article[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const documentsPerPage = 5;
    const dispatch = useDispatch();
    const storedArticles = useSelector((state: any) => state.articles.articlesToRead)
    const [dateRange, setDateRange] = useState<any[]>([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios(
                    '/api/articles',
                );
                setItems(result.data);
                setLoading(false);
            } catch (error) { alert("Something went wrong, try again later") }
        }
        fetchData();
        
    }, []);
useEffect(()=>{ dispatch(addArticle([...items]))},[items, dispatch])

    const clearInput = () => {
        setSearchTerm('')
    }
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(items.length / documentsPerPage); i++) {
        pageNumbers.push(i);
    }
    const documentsData = useMemo(() => {
        let computedDocuments = storedArticles[1];
        if (searchTerm) {
            computedDocuments = computedDocuments?.filter((q:any) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
        };
        if (!!dateRange) {
            computedDocuments = computedDocuments?.filter((q:any)=> new Date(q.date) >= dateRange[0].startDate)
        }
        return computedDocuments?.slice(
            (currentPage - 1) * documentsPerPage,
            (currentPage - 1) * documentsPerPage + documentsPerPage
        );
    }, [dateRange, currentPage, searchTerm, storedArticles])
    const paginate = (pageNumbers: number) => setCurrentPage(pageNumbers);
if(loading){return <Spinner animation="border" variant="secondary" />}

console.log(storedArticles)
    return (
        <>
            <h2>Articles</h2>
            <div onClick={()=>setShowModal(true)}>Add your story</div>
            <div>
                Search by article's title:
                <InputGroup className="mb-3">
                    <FormControl
                        id="searchInput"
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Button onClick={clearInput}>Clear</Button>
                </InputGroup>
                or by date:
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
                    <div><Icon name={"calendar"} /></div>
                </OverlayTrigger>
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
                                   <div style={{ display: "flex" }}>
                    {pageNumbers.map((number) => (
                        <div key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
<AddArticle
 show={showModal}
 setShow={setShowModal}
 setItems={setItems}
 items={items}
 />
        </>
    )
}

export default ArticlesList