import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostState, setPost } from '../../store/features/postSlice';
import './CreatePost.scss';
import { nanoid } from 'nanoid';
import { getName, getPfp } from '../../store/features/userInfo/userInfoSlice';


export default function CreatePost() {

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  const userName = useSelector(getName)
  const pfp = useSelector(getPfp)

  const initialValues: PostState = {
    id: nanoid(5),
    name: userName,
    pfp: pfp,
    date: new Date(),
    text: '',
    file: null,
    img: '',
    insights: {
      id: nanoid(5),
      views: 0,
      comments: 0,
      likes: 0,
      dislikes: 0
    },
    comments: []
  };

  const handleSubmit = (values: PostState, { resetForm }: { resetForm: () => void }) => {
    const currentDate = new Date(); // Current date
    const updatedValues = {
      ...values,
      date: currentDate
    };
    if (values.file) {
      updatedValues.img = URL.createObjectURL(values.file);
    }
    if (values.file || values.text) {
      dispatch(setPost({ ...initialValues, ...updatedValues }));
    }
    resetForm();
    setFilePreview(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <div className='CreatePost'>
      <div className="CreatePost__img">
        <img src={`${pfp}`} alt="Profile" />
      </div>
      <div className="CreatePost__form">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <div className="attachement">
                <Field className="text-field" as="textarea" name="text" placeholder="Write your post..." />
                <div className="file-input">
                  <label htmlFor="file">
                    <span>&#xF49E;</span>
                  </label>
                  <label htmlFor="file">
                    <span>&#xF42A;</span>
                  </label>
                  <label htmlFor="file">
                    <span>&#xF21C;</span>
                  </label>
                  <label htmlFor="file">
                    <span> &#xF219;</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    id='file'
                    accept="image/*"
                    onChange={(event) => {
                      handleFileChange(event);
                      setFieldValue('file', event.currentTarget.files?.[0]);
                    }}
                  />
                </div>
                <button type="submit">Post</button>
              </div>
              <div className="preview">
                {filePreview && (
                  <img src={filePreview} alt="File Preview" className="file-preview" />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
