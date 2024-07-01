import { ErrorMessage, Field, Form, Formik } from 'formik'
import './EditForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getJob, getName } from '../../store/features/userInfo/userInfoSlice'
import { changeUserData } from '../../store/features/userInfo/userThunks'
import { object, string } from 'yup'
import { AppDispatch } from '../../store/setup'

const validationSchema = object({
  fname: string().min(4).max(30).required("full name is a required field"),
  job: string().min(3).required()
})

interface EditFormProps {
  toggleModal: () => void;
}

export default function EditForm({ toggleModal }: EditFormProps) {
  const fname = useSelector(getName)
  const job = useSelector(getJob)
  const dispatch = useDispatch<AppDispatch>()

  const initialValues = {
    fname: fname || '',
    job: job || '',
  }

  const handleSubmit = (values: { fname: string, job: string }) => {
    dispatch(changeUserData(values))
      .then(() => toggleModal())
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {
        ({
          isSubmitting
        }) =>
        (
          <Form>
            <div className="input-wrapper">
              <Field type="text" name="fname" id="fname" placeholder='Your Full Name' />
              <ErrorMessage name="fname" component="div" className="error" />
            </div>

            <div className="input-wrapper">
              <Field type="text" name="job" id="job" placeholder='Your Job' />
              <ErrorMessage name="job" component="div" className="error" />
            </div>

            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Saving..." : "Save"}</button>
          </Form>
        )}
    </Formik>
  )
}
