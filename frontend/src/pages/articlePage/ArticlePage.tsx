import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ArticleItem } from "../../types";

const ArticlePage = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ArticleItem>();
    const [loading, setLoading] = useState(true);
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
    if(loading){return <Spinner animation="border" variant="secondary" />}
    return (
        <>
            <Card style={{ width: '90%' }}>
                <Card.Body>
                    <Card.Title>{item?.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{moment(item?.date).format('LLLL')}</Card.Subtitle>
                    <Card.Text>
                        {item?.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ArticlePage;