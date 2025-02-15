import { Link } from 'react-router-dom';
import ROUTES from '../../../routes/routes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { ToastContainer } from 'react-toastify';
import './SignUp.scss';
import useAuth from '../../../hooks/useAuth';

export type TsignUpFormState = {
  fname: string,
  username: string,
  email: string;
  password: string;
}

const initialValues: TsignUpFormState = {
  fname: '',
  username: '',
  email: '',
  password: ''
};

const validationSchema = object({
  fname: string().min(4).max(30).required("full name is a required field"),
  username: string().min(3).max(20).required(),
  email: string().email().required(),
  password: string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required(),
})

export default function SignUp() {
  const { signup } = useAuth();

  const handleSubmit = (values: TsignUpFormState, { resetForm, setSubmitting }: { resetForm: () => void, setSubmitting: (isSubmitting: boolean) => void }) => {
    signup(values, { resetForm, setSubmitting });
  };

  return (
    <div className='SignUp'>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="SignUp__info">
        <h2>Winku</h2>
        <p>Winku is free to use for as long as you want with two active projects.</p>
        <img src="/wink.png" alt='winku' />
      </div>
      <div className="SignUp__content">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnMount={true}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting
          }) => (
            <Form>
              <div className="input-wrapper">
                <Field type="text" name="fname" id="fname" placeholder='Your Full Name' />
                <ErrorMessage name="fname" component="div" className="error" />
              </div>

              <div className="input-wrapper">
                <Field type="text" name="username" id="username" placeholder='Your Username' />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="input-wrapper">
                <Field type="email" name="email" id="email" placeholder='Your Email' />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-wrapper">
                <Field type="password" name="password" id="password" placeholder='Your Password' />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button disabled={isSubmitting} type="submit">{isSubmitting ? "Signing Up..." : "Sign Up"}</button>
            </Form>
          )}
        </Formik>
        <p>Already have an account? <Link className='signup' to={ROUTES.LOGIN}>Log In</Link></p>
      </div>
    </div>
  );
}
