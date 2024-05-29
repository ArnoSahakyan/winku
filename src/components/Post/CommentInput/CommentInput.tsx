import { Field, Formik, Form, FormikValues } from 'formik'
import './CommentInput.scss'
import { useDispatch, useSelector } from 'react-redux';
import { PostState, postComment } from '../../../store/features/postSlice';
import { getPfp } from '../../../store/features/userInfo/userInfoSlice';

const initialValues = {
  comment: ''
}

export default function CommentInput({ post }: { post: PostState }) {
  const dispatch = useDispatch();
  const pfp = useSelector(getPfp)

  const handleSubmit = (values: FormikValues, { resetForm }: { resetForm: () => void }) => {
    const updatedValues = {
      ...values,
      postID: post.id,
      pfp: pfp
    }
    dispatch(postComment(updatedValues))
    resetForm();

  };


  return (
    <div className="CommentInput">
      <img src={pfp} alt='profile picture' />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="CommentInput__input">
          <Field type="text" placeholder='Post Your Comment' name="comment" />
          <img alt='emoji' src="https://images.vexels.com/media/users/3/134594/isolated/lists/cb4dd9ad3fa5ad833e9b38cb75baa18a-happy-emoji-emoticon.png" />
        </Form>
      </Formik>

    </div>
  )
}


