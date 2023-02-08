import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import { addArticle } from "../../redux/store/reducer";
import './AddArticle.sass'
interface ModalProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddArticle: FC<ModalProps> = ({ show, setShow }) => {
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    return (
        <Modal
            bg={'dark'}
            text='white'
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >

            <Modal.Header closeButton>
                <Modal.Title>Add your story</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={{ user: '', title: '', text: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.user) {
                            //@ts-ignore
                            errors.user = 'Required';
                        }
                        if (!values.text) {
                            //@ts-ignore
                            errors.text = 'Required';
                        }
                        if (!values.title) {
                            //@ts-ignore
                            errors.title = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const article = { text: values.text, title: values.title, user: values.user }
                        try {
                            const res = await axios.post('/api/articles', article)
                            if (!!res.data) {
                                dispatch(addArticle(res.data))
                            }
                            handleClose()
                        }
                        catch (error) { alert("Something went wrong, try again later") }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, handleChange }) => (
                        <Form className="modalForm">
                            <label htmlFor="user">Your name</label>
                            <Field type="text" name="user" />
                            <ErrorMessage name="user" component="div" />
                            <label htmlFor="title">Atricle title</label>
                            <Field type="text" name="title" />
                            <ErrorMessage name="title" component="div" />
                            <label htmlFor="text">Your story</label>
                            <TextareaAutosize name="text"
                                onChange={handleChange}
                            />
                            <ErrorMessage name="text" component="div" />
                            <Button variant="secondary" type='submit' disabled={isSubmitting}>Add story</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AddArticle;