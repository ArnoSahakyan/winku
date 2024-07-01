import { Field, Formik, Form, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TFriendBack, sendMessage } from '../../../store/features/friends/friendsSlice';
import { object, string } from 'yup';
import './MessageInput.scss';
import { getUserID } from '../../../store/features/userInfo/userInfoSlice';
import { AppDispatch } from '../../../store/setup';
import { Socket } from 'socket.io-client';

const initialValues = {
  message: ''
};

const validationSchema = object({
  message: string().required()
})

export default function MessageInput({ friend, socket }: { friend: TFriendBack, socket: Socket }) {
  const userId = useSelector(getUserID)
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: FormikValues, { resetForm }: { resetForm: () => void }) => {
    const newValues = {
      message: values.message.trim(),
      receiverId: friend.id,
      senderId: userId
    }
    const updatedValues = {
      ...newValues,
      room: friend.friendshipId,
    }
    socket.emit('send_message', updatedValues);
    dispatch(sendMessage(newValues));
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              className="text-field"
              as="textarea"
              name="message"
              placeholder="Write your message..."
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(event, submitForm)}
            />
            <button disabled={isSubmitting} type="submit">&#xF6B9;</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
