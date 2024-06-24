import './CommentInput.scss'
import { Field, Formik, Form, FormikValues } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { PostState, TComments, TReplies } from '../../../store/features/post/postSlice';
import { getPfp } from '../../../store/features/userInfo/userInfoSlice';
import { object, string } from 'yup';
import { createComment } from '../../../store/features/post/postThunks';
import { AppDispatch } from '../../../store/setup';

type TcommentInput = {
  post: PostState,
  replyData: TComments | null,
  setReplyData: React.Dispatch<React.SetStateAction<TReplies | null>>
}

const validationSchema = object({
  content: string().required()
})

const initialValues = {
  content: ''
}

export default function CommentInput({ post, replyData, setReplyData }: TcommentInput) {
  const dispatch = useDispatch<AppDispatch>();
  const pfp = useSelector(getPfp)

  const handleSubmit = (values: FormikValues, { resetForm }: { resetForm: () => void }) => {
    const newParentId = replyData?.parentId ? replyData.parentId : replyData?.commentId
    const updatedValues = {
      content: values.content,
      uploaderId: post.userId,
      postId: post.postId,
      parentId: newParentId
    }
    dispatch(createComment(updatedValues))
    resetForm();
    setReplyData(null)
  };


  return (
    <div className="CommentInput">
      <img src={pfp} alt='profile picture' />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="CommentInput__input">
          <Field type="text" placeholder={`${replyData ? `Reply to ${replyData.fname}` : 'Post Your Comment'}`} name="content" />
          <img alt='emoji' src="/emoji.webp" />
        </Form>
      </Formik>

    </div>
  )
}


