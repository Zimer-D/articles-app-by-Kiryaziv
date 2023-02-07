import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import TextareaAutosize from 'react-textarea-autosize';
import { Article } from "../../types";
interface ModalProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setItems:React.Dispatch<React.SetStateAction<Article[]>>;
    items: Article[]
}

const AddArticle: FC<ModalProps> = ({ show, setShow, setItems, items}) => {
    const handleClose = () => setShow(false);
    return ( 
        <Modal
        className='productModal'
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
                setItems([...items, res.data])
            }
            handleClose()
        }
        catch (error) { alert("Something went wrong, try again later") }
            console.log(values)
           setSubmitting(false);
       }}
     >
       {({ isSubmitting, handleChange }) => (
         <Form>
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
           {/* <Field type="text" name="text" /> */}
           <ErrorMessage name="text" component="div" />
           <Button variant="primary" type='submit' disabled={isSubmitting}>Add story</Button>
         </Form>
       )}
     </Formik>
          </Modal.Body>
        </Modal>
     );
}
 
export default AddArticle;