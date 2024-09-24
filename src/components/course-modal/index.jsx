import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Yup validation schema for course
const courseValidationSchema = Yup.object().shape({
  name: Yup.string().required("Course Name is required").min(2, "Course Name is too short"),
  duration: Yup.string().required("Duration is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CourseModal({ open, handleClose, setData, data, setOpen, editingCourse }) {
  // Initialize form values
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    duration: "",
    price: "",
  });

  // Update initial values when editingCourse changes
  React.useEffect(() => {
    if (open && editingCourse) {
      setInitialValues({
        name: editingCourse?.name || "",
        duration: editingCourse?.duration || "",
        price: editingCourse?.price || "",
      });
    } else {
      setInitialValues({
        name: "",
        duration: "",
        price: "",
      });
    }
  }, [open, editingCourse]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingCourse?.id) {
        const res = await axios.put(
          `http://localhost:3000/course/${editingCourse.id}`,
          values
        );
        setData(
          data.map((item) => (item.id === editingCourse.id ? res.data : item))
        );
      } else {
        const res = await axios.post("http://localhost:3000/course", values);
        setData([...data, res.data]);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="course-modal-title"
      aria-describedby="course-modal-description"
    >
      <Box sx={style}>
        <Typography id="course-modal-title" align="center" variant="h6" component="h2">
          {editingCourse?.id ? "Edit Course" : "Add Course"}
        </Typography>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={courseValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Course Name"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                }
                sx={{ marginY: "15px" }}
              />
              <Field
                name="duration"
                as={TextField}
                fullWidth
                label="Duration"
                helperText={
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                }
                sx={{ marginY: "15px" }}
              />
              <Field
                name="price"
                as={TextField}
                fullWidth
                label="Price"
                type="number"
                helperText={
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                }
                sx={{ marginY: "15px" }}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                {editingCourse?.id ? "Update" : "Save"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
