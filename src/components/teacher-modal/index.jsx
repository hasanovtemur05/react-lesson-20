import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const teacherValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name is too short"),
  course: Yup.string().required("Course is required"),
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

export default function TeacherModal({
  open,
  handleClose,
  setData,
  data,
  setOpen,
  editingTeacher,
}) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    course: "",
  });

 
  useEffect(() => {
    if (open && editingTeacher) {
      setInitialValues({
        name: editingTeacher?.name || "",
        course: editingTeacher?.course || "",
      });
    } else {
      setInitialValues({
        name: "",
        course: "",
      });
    }
  }, [open, editingTeacher]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingTeacher?.id) {
        const res = await axios.put(
          `http://localhost:3000/teacher/${editingTeacher.id}`,
          values
        );
        setData(
          data.map((item) => (item.id === editingTeacher.id ? res.data : item))
        );
      } else {
        const res = await axios.post("http://localhost:3000/teacher", values);
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
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          align="center"
          variant="h6"
          component="h2"
        >
          {editingTeacher?.id ? "Edit Teacher" : "Add Teacher"}
        </Typography>

        <Formik
          enableReinitialize={true} 
          initialValues={initialValues}
          validationSchema={teacherValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Teacher Name"
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
                name="course"
                as={TextField}
                fullWidth
                label="Course"
                helperText={
                  <ErrorMessage
                    name="course"
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
              >
                {editingTeacher?.id ? "Update" : "Save"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
