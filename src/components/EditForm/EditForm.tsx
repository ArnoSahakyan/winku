import { ErrorMessage, Field, Form, Formik } from 'formik'
import './EditForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getJob, getName } from '../../store/features/userInfo/userInfoSlice'
import { changeUserData } from '../../store/features/userInfo/userThunks'
import { object, string } from 'yup'

const validationSchema = object({
  fname: string().min(4).max(30).required("full name is a required field"),
  job: string().min(3).required()
})

export default function EditForm({ toggleModal }) {
  const fname = useSelector(getName)
  const job = useSelector(getJob)
  const dispatch = useDispatch()

  const initialValues = {
    fname: fname || '',
    job: job || '',
  }

  const handleSubmit = (values) => {
    dispatch(changeUserData(values))
    toggleModal()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="input-wrapper">
          <Field type="text" name="fname" id="fname" placeholder='Your Full Name' />
          <ErrorMessage name="fname" component="div" className="error" />
        </div>

        <div className="input-wrapper">
          <Field type="text" name="job" id="job" placeholder='Your Job' />
          <ErrorMessage name="job" component="div" className="error" />
        </div>

        <button type="submit">Save</button>

      </Form>
    </Formik>
  )
}
