import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import TextError from "../TextError/TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phones: ['', ''],
  phNumbers: ['']
};

const onSubmit = (values) => {
  console.log("Form data:", values);
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email format").required("Required"),
  channel: yup.string().required("Required"),
  address: yup.string().required('Required'),
  social: yup.object ({
    facebook: yup.string().required('Required'),
    twitter: yup.string().required('Required'),
  }),
});

const validateComments = value => {
  let error;
  if(!value) error = 'Required';
  return error;
}

export default function SimpleForm4() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
          />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field
            type="email"
            id="email"
            name="email"
          />
          <ErrorMessage name="email">
            {
              msg => <div className="error">{msg}</div>
            }
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
          />
          <ErrorMessage name="channel" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field 
            as="textarea"
            id="comments"
            name="comments" 
            validate={validateComments}
          />
          <ErrorMessage name="comments" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field
            type="text"
            name="address"
          >
            {
              (props) => {
                const {field, meta} = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    { 
                      meta.touched && meta.error 
                      ? <div className="error" >{meta.error}</div>
                      : null 
                    }
                  </div>
                );
              }
            }
          </Field>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <Field 
            as="input"
            type="text"
            id="facebook"
            name="social.facebook" 
          />
          <ErrorMessage name="social.facebook" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <Field 
            as="input"
            type="text"
            id="twitter"
            name="social.twitter" 
          />
          <ErrorMessage name="social.twitter" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="phone1">Primary phone</label>
          <Field 
            as="input"
            type="phone"
            id="phone1"
            name="phones[0]" 
          />
        </div>

        <div className="form-control">
          <label htmlFor="phone2">Secondary phone</label>
          <Field 
            as="input"
            type="phone"
            id="phone2"
            name="phones[1]" 
          />
        </div>

        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers" >
            {
              props => {
                const {form: {values: {phNumbers}}, push, remove} = props;
                return (
                  <div>
                    {
                      phNumbers.map((item, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && <button type="button" onClick={() => remove(index)}>-</button>}
                          <button type="button" onClick={() => push('')}>+</button>
                        </div>
                      ))
                    }
                  </div>
                );
              }
            }
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
