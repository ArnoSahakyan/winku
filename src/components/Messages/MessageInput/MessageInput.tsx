import { Field, Formik, Form, FormikValues } from 'formik';
import './MessageInput.scss';
import { useDispatch } from 'react-redux';
import { TFriend, sendMessage } from '../../../store/features/friendsSlice';

const initialValues = {
  message: ''
};

export default function MessageInput({ friend }: { friend: TFriend }) {

  const dispatch = useDispatch();

  const handleSubmit = (values: FormikValues, { resetForm }: { resetForm: () => void }) => {
    const updatedValues = {
      ...values,
      friendId: friend.id
    }

    dispatch(sendMessage(updatedValues));
    resetForm();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, submitForm: () => void) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitForm();
    }
  };

  return (
    <div className='MessageInput'>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              className="text-field"
              as="textarea"
              name="message"
              placeholder="Write your message..."
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(event, submitForm)}
            />
            <button type="submit">&#xF6B9;</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
