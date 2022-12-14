import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: '',
  email: '',
  channel: '',
}

const onSubmit = values => {
  console.log('Form data:', values);
}

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  channel: yup.string().required('Required'),
});




export default function SimpleForm3() {
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log('formik values:', formik.values);
  // console.log('formik errors:', formik.errors);
  // console.log('formik touched:', formik.touched);
  // console.log('formik:', formik);
  // console.log('getFieldProps:', formik.getFieldProps(formik.values.name));
  // console.log('getFieldMeta:', formik.getFieldMeta(formik.values.name));
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          {...formik.getFieldProps('name')}
        />
        {
          formik.touched.name && formik.errors.name 
          ? <div className="error">{formik.errors.name}</div> 
          : null
        }
      </div>

      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          {...formik.getFieldProps('email')}
        />
        {
          formik.touched.email && formik.errors.email 
          ? <div className="error">{formik.errors.email}</div> 
          : null
        }
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          {...formik.getFieldProps('channel')}
        />
        {
          formik.touched.channel && formik.errors.channel 
          ? <div className="error">{formik.errors.channel}</div> 
          : null
        }
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}