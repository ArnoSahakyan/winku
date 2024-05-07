import { Field, Formik, Form } from 'formik'
import './CommentInput.scss'
import { useDispatch } from 'react-redux';
import { postComment } from '../../../store/features/postSlice';

const initialValues = {
  comment: ''
}

export default function CommentInput({ post }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const updatedValues = {
      ...values,
      postID: post.id
    }
    dispatch(postComment(updatedValues))
    resetForm();

  };


  return (
    <div className="CommentInput">
      <img src="/pfp.jpg" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="CommentInput__input">
          <Field type="text" placeholder='Post Your Comment' name="comment" />
          <img src="https://images.vexels.com/media/users/3/134594/isolated/lists/cb4dd9ad3fa5ad833e9b38cb75baa18a-happy-emoji-emoticon.png" />
        </Form>
      </Formik>

    </div>
  )
}


