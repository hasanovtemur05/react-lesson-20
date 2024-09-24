import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const studentValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Name is too short"),
  age: Yup.number().required("Age is required").min(5, "Age must be at least 5"),
  phone: Yup.string().required("Phone number is required"),
  course: Yup.string().required("Course is required"),
  teacher: Yup.string().required("Teacher is required"),
  group: Yup.string().required("Group is required"),
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

export default function StudentModal({
  open,
  handleClose,
  course,
  teacher,
  group,
  setOpen,
  setData,
  data,
  editingStudent,
}) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    age: "",
    phone: "",
    course: "",
    teacher: "",
    group: "",
  });

  // useEffect to update initialValues when editingStudent changes
  useEffect(() => {
    if (open && editingStudent) {
      setInitialValues({
        name: editingStudent?.name || "",
        age: editingStudent?.age || "",
        phone: editingStudent?.phone || "",
        course: editingStudent?.course || "",
        teacher: editingStudent?.teacher || "", 
        group: editingStudent?.group || "",
      });
    } else {
      setInitialValues({
        name: "",
        age: "",
        phone: "",
        course: "",
        teacher: "",
        group: "",
      });
    }
  }, [open, editingStudent]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingStudent?.id) {
        const res = await axios.put(
          `http://localhost:3000/student/${editingStudent.id}`,
          values
        );
        setData(
          data.map((item) => (item.id === editingStudent.id ? res.data : item))
        );
      } else {
        const res = await axios.post("http://localhost:3000/student", values);
        setData([...data, res.data]);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Modal
        keepMounted
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
            {editingStudent?.id ? "Edit Student" : "Add Student"}
          </Typography>

          {/* Formik form */}
          <Formik
            enableReinitialize={true} // This will make sure the form reinitializes on state changes
            initialValues={initialValues}
            validationSchema={studentValidationSchema} 
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange, values }) => (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  fullWidth
                  label="Name"
                  helperText={
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-[15px]"
                    />
                  }
                  sx={{ marginY: "7px" }}
                />
                <Field
                  name="age"
                  as={TextField}
                  fullWidth
                  label="Age"
                  type="number"
                  helperText={
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-red-600 text-[15px]"
                    />
                  }
                  sx={{ marginY: "7px" }}
                />
                <Field
                  name="phone"
                  as={TextField}
                  fullWidth
                  label="Phone"
                  helperText={
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-600 text-[15px]"
                    />
                  }
                  sx={{ marginY: "7px" }}
                />

                {/* Course Select */}
                <FormControl fullWidth sx={{ marginY: "7px" }}>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    fullWidth
                  >
                    {course.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                </FormControl>

                {/* Teacher Select */}
                <FormControl fullWidth sx={{ marginY: "7px" }}>
                  <InputLabel id="teacher-select-label">Teacher</InputLabel>
                  <Select
                    labelId="teacher-select-label"
                    id="teacher-select"
                    name="teacher"
                    value={values.teacher} // Correct value for teacher
                    onChange={handleChange}
                    fullWidth
                  >
                    {teacher.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="teacher"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                </FormControl>

                {/* Group Select */}
                <FormControl fullWidth sx={{ marginY: "7px" }}>
                  <InputLabel id="group-select-label">Group</InputLabel>
                  <Select
                    labelId="group-select-label"
                    id="group-select"
                    name="group"
                    value={values.group}
                    onChange={handleChange}
                    fullWidth
                  >
                    {group.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="group"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {editingStudent?.id ? "Update" : "Save"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
