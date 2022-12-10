import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const FieldItem = ({ name, label, touched, errors }) => (
  <div>
    <div className="mb-2">{label}</div>
    <div className="mb-5">
      <Field
        name={name}
        className="bg-f2f2f2 border-2 border-white rounded-full p-2 text-sm outline-0 w-full"
      />
      {errors && touched ? (
        <div className="text-red-500 text-xs mt-3">{errors}</div>
      ) : null}
    </div>
  </div>
);

export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/subscribe", { email });
    } catch (e) {
      setErrorMessage(e.response.data.error);
      console.log(errorMessage);
    }
  };

  return (
    <div className="w-full h-full bg-[#ada8fc]">
      <img
        src="CE_logo_Almarai_Color_alpha.png"
        className="max-w-[200px] max-h-[60px] pt-5 pl-10"
      />
      <div className="flex flex-col items-center">
        <div className="w-1/3 mt-10">
          <div className="text-8xl title mb-4">rsvp</div>
          <Formik
            initialValues={("", "", "", true)}
            validationSchema={SignupSchema}
            onSubmit={subscribe}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col">
                <FieldItem
                  name="firstName"
                  label="First Name"
                  errors={errors.firstName}
                  touched={touched.firstName}
                />
                <FieldItem
                  name="lastName"
                  label="Last Name"
                  errors={errors.lastName}
                  touched={touched.lastName}
                />
                <FieldItem
                  name="email"
                  label="Email"
                  errors={errors.email}
                  touched={touched.email}
                />
                {/* <label className="text-[7px]">
                  <Field type="checkbox" name="toggle" className="mr-2" />
                  Subscribe to our mailing list
                </label> */}
                <div className="flex justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn w-min mt-4 bg-white"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
