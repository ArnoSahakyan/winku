import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreatePost.scss';
import { getPfp } from '../../store/features/userInfo/userInfoSlice';
import { createPost } from '../../store/features/post/postThunks';
import { mixed, object, string } from 'yup';

export type formType =
  {
    file: File | null,
    content: string | null
  }

const initialValues: formType = {
  file: null,
  content: ''
}

const validationSchema = object().shape({
  content: string().nullable(),
  file: mixed().nullable().test('file-or-content', 'Please enter some content or upload an image', function () {
    const { content, file } = this.parent;
    return content?.trim() !== '' || !!file;
  })
});



export default function CreatePost() {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const dispatch = useDispatch();
  const pfp = useSelector(getPfp)

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

  const handleSubmit = (values: formType, { resetForm }: { resetForm: () => void }) => {
    if (values.file === null && values.content == '') return
    dispatch(createPost(values));
    resetForm();
    setFilePreview(null);
  }

  return (
    <div className='CreatePost'>
      <div className="CreatePost__img">
        <img src={`${pfp}`} alt="Profile" />
      </div>
      <div className="CreatePost__form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="attachement">
                <Field className="text-field" as="textarea" name="content" placeholder="Write your post..." />
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
