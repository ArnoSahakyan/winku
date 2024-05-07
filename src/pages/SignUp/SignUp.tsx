import { Link } from 'react-router-dom';
import './SignUp.scss';
import ROUTES from '../../routes/routes';

import { Formik, Form, Field, ErrorMessage } from 'formik';

interface LogInFormState {
  username: string,
  email: string;
  password: string;
}

export default function SignUp() {
  const initialValues: LogInFormState = { username: '', email: '', password: '' };

  const validate = (values: LogInFormState) => {
    const errors: Partial<LogInFormState> = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(values.password)) {
      errors.password = 'Minimum eight characters, at least one letter, one number and one special character:';
    }
    return errors;
  };

  return (
    <div className='LogIn'>
      <div className="LogIn__info">
        <h2>Winku</h2>
        <p>Winku is free to use for as long as you want with two active projects.</p>
        <img src="/wink.png" />
      </div>
      <div className="LogIn__content">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          validateOnChange={true}
          validateOnMount={true}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {({ isValid }) => (
            <Form>
              <div className="input-wrapper">
                <Field type="text" name="username" id="username" placeholder='Your Username' required />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="input-wrapper">
                <Field type="email" name="email" id="email" placeholder='Your Email' required />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-wrapper">
                <Field type="password" name="password" id="password" placeholder='Your Password' required />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              {isValid ? (
                <Link className='login-button' to={ROUTES.HOME} type="submit">Log In</Link>
              ) : (
                <button type="submit" disabled>Sign Up</button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
