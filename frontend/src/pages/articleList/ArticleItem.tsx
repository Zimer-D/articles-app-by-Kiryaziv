import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../redux/store/reducer";
import { Article, ArticlesComment } from "../../types";
import Icon from "../../UI/icons";

const ArticleItem = ({ item }: { item: Article }) => {
    const [comments, setComments] = useState<ArticlesComment[]>();
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [uploadComment, setUploadComment] = useState(false);
    const [newComment, setNewComment] = useState<any>('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios(
                    `/api/comments?article=${item.id}`,
                );
                setComments(result.data);
                setLoading(false);
            } catch (error) { alert("Something went wrong, try again later") }
        }
        fetchData();

    }, [item.id, uploadComment]);
    async function sendComment(e: any) {
        e.preventDefault()
        setUploadComment(true)
        const comment = { text: newComment, article: item.id, user: 'Anonim' }
        try {
            const res = await axios.post('/api/comments', comment)
            if (!!res.data) {
                setComments([...[comments], res.data])
                setNewComment('')

            }
        }
        catch (error) { alert("Something went wrong, try again later") }
        setUploadComment(false)
    }
 
    const handleClick = (id: string|number) => {
        console.log(111)
            dispatch(deleteArticle(id))
    }
    return (
        <>
            <Card>
                <Card.Body>
                <div onClick={()=>navigate(`/articles/${item.id}`)}>{item.title}</div>
                <div onClick={()=>handleClick(item.id)}><Icon name='trash'/></div>
                </Card.Body>
                <div onClick={() => setCommentsVisible(!commentsVisible)}>Comments({!loading?comments?.length || '0':<Spinner animation="border" variant="secondary" />})</div>
                {
                    !!commentsVisible &&
                    <div>
                        {!!comments &&
                            comments?.map(comment => (
                                <div key={comment.id}>
                                    <div>{comment.user}</div>
                                    <div>{comment.text}</div>
                                </div>
                            ))}


                        <form onSubmit={(e) => sendComment(e)}>
                            <input
                                type='text'
                                name="query"
                                placeholder='Enter your comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)} />
                            <Button variant="primary" type="submit" disabled={!!uploadComment}>
                                {!!uploadComment && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                <Icon name={"add"} />
                            </Button>
                        </form>
                    </div>}
            </Card>
        </>
    );
}

export default ArticleItem;