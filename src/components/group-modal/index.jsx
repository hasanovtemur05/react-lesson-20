import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Yup validation schema for group
const groupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Group Name is required").min(2, "Group Name is too short"),
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

export default function GroupModal({
  open, // Ensure this is properly received
  handleClose,
  setData,
  data,
  setOpen,
  course,
  editingGroup,
}) {
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    course: "",
  });

  React.useEffect(() => {
    if (open && editingGroup) {
      setInitialValues({
        name: editingGroup?.name || "",
        course: editingGroup?.course || "",
      });
    } else {
      setInitialValues({
        name: "",
        course: "",
      });
    }
  }, [open, editingGroup]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingGroup?.id) {
        const res = await axios.put(
          `http://localhost:3000/group/${editingGroup.id}`,
          values
        );
        setData(
          data.map((item) => (item.id === editingGroup.id ? res.data : item))
        );
      } else {
        const res = await axios.post("http://localhost:3000/group", values);
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
      open={open} // Ensure this is properly used
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
          {editingGroup?.id ? "Edit Group" : "Add Group"}
        </Typography>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={groupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Group Name"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-[15px]"
                  />
                }
                sx={{ marginY: "15px" }}
              />
              <FormControl fullWidth sx={{ marginY: "15px" }}>
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

              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                {editingGroup?.id ? "Update" : "Save"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
