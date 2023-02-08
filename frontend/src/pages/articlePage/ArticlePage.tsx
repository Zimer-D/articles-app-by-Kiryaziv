import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleItem } from "../../types";

const ArticlePage = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ArticleItem>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await axios(
                    `/api/articles/${id}`,
                );
                setItem(result.data);
                setLoading(false);
            } catch (error) { alert("Something went wrong, try again later") }
        }
        fetchData();
    }, [id]);
    if (loading) { return <Spinner animation="border" variant="secondary" /> }
    return (
        <>
            <Card
                bg={'dark'}
                text='white'
                style={{marginTop:'20px'}}
            >
                <Card.Body>
                    <Card.Title>{item?.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{moment(item?.date).format('LLLL')}</Card.Subtitle>
                    <Card.Text>
                        {item?.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => navigate(-1)}>
                        Back to articles
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}

export default ArticlePage;