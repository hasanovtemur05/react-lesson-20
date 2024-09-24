import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./../../utils/notification";
import { ToastContainer } from "react-toastify";
import { signUpvAalidationSchema } from "./../../utils/validation";
import axios from "axios";

const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("https://texnoark.ilyosbekdev.uz/auth/admin/sign-up", values)
      if (response.status === 201) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row mt-5">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Sign-Up</h1>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signUpvAalidationSchema}
              >
                <Form id="form">
                  <Field
                    name="first_name"
                    as={TextField}
                    fullWidth
                    label="first name"
                    type="text"
                    helperText={
                      <ErrorMessage
                        name="first_name"
                        component="p"
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="last_name"
                    as={TextField}
                    fullWidth
                    label="last name"
                    type="text"
                    helperText={
                      <ErrorMessage
                        name="last_name"
                        component="p"
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="phone_number"
                    as={TextField}
                    fullWidth
                    label="phone number"
                    type="text"
                    helperText={
                      <ErrorMessage
                        name="phone_number"
                        component="p"
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    label="email"
                    type="email"
                    helperText={
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="password"
                    as={TextField}
                    fullWidth
                    label="password"
                    type="password"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />
                </Form>
              </Formik>
            </div>
            <div className="card-footer">
              <Button form="form" type="submit" variant="contained">
                save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
