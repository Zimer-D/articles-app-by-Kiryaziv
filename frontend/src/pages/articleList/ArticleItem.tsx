import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../redux/store/reducer";
import { Article, ArticlesComment } from "../../types";
import Icon from "../../UI/icons";
import './articles.sass'
const ArticleItem = ({ item }: { item: Article }) => {
    const [comments, setComments] = useState<ArticlesComment[]>();
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [uploadComment, setUploadComment] = useState(false);
    const [newComment, setNewComment] = useState<any>('');
    const [newCommentator, setNewCommentator] = useState<any>('');
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
        const comment = { text: newComment, article: item.id, user: newCommentator.length !== 0 ? newCommentator : 'Anonim' }
        try {
            const res = await axios.post('/api/comments', comment)
            if (!!res.data) {
                setComments([...[comments], res.data])
                setNewComment('')
                setNewCommentator('')

            }
        }
        catch (error) { alert("Something went wrong, try again later") }
        setUploadComment(false)
    }

    const handleClick = (id: string | number) => {
        dispatch(deleteArticle(id))
    }
    return (
        <>
            <Card
                bg={'dark'}
                text='white'
                className="article"
            >
                <Card.Body className="articleCard">
                    <div className="articeTitle" onClick={() => navigate(`/articles/${item.id}`)}>{item.title}</div>
                    <div className="icon" onClick={() => handleClick(item.id)}><Icon name='trash' size={25} /></div>
                </Card.Body>
                <div
                    onClick={() => setCommentsVisible(!commentsVisible)}>
                    <Icon className="icon" name='messages' size={40} style={{ position: 'relative' }} />
                    <div className="comments__counter">
                        {!loading ? comments?.length || '0' : <Spinner animation="border" variant="secondary" />}
                    </div>
                </div>
                {
                    !!commentsVisible &&
                    <div>
                        {!!comments &&
                            comments?.map(comment => (
                                <div className="comment" key={comment.id}>
                                    <div className="comment__user">{comment.user}</div>
                                    <div className="comment__text">{comment.text}</div>
                                </div>
                            ))}


                        <form
                            className="commentForm"
                            onSubmit={(e) => sendComment(e)}>
                            <input
                                type='text'
                                name="commentator"
                                placeholder='Enter your name (not necessary)'
                                value={newCommentator}
                                onChange={(e) => setNewCommentator(e.target.value)} />
                            <input
                                type='text'
                                name="comment"
                                required
                                placeholder='Enter your comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)} />
                            <Button variant="secondary" type="submit" disabled={!!uploadComment}>
                                {!!uploadComment && <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                Add comment
                            </Button>
                        </form>
                    </div>}
            </Card>
        </>
    );
}

export default ArticleItem;