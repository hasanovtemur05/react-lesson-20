import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const brandValidationSchema = Yup.object().shape({
  name: Yup.string().required("Brand Name is required"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.number().required("Category ID is required").typeError("Category ID must be a number"),
  file: Yup.mixed().required("File is required"),
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

export default function BrandModal({ open, handleClose, handleSubmit, editingBrand }) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category_id: "",
    file: null,
  });

  useEffect(() => {
    if (open && editingBrand) {
      setInitialValues({
        name: editingBrand.name || "",
        description: editingBrand.description || "",
        category_id: editingBrand.category_id || "",
        file: null,
      });
    } else {
      setInitialValues({ name: "", description: "", category_id: "", file: null });
    }
  }, [open, editingBrand]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await handleSubmit(values);
      handleClose();
    } catch (error) {
      console.log("Error in submission:", error);
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography align="center" variant="h6">
          {editingBrand?.id ? "Edit Brand" : "Add Brand"}
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={brandValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                fullWidth
                label="Brand Name"
                helperText={<ErrorMessage name="name" component="div" className="text-red-600 text-[15px]" />}
                sx={{ marginY: "15px" }}
              />
              <Field
                name="description"
                as={TextField}
                fullWidth
                label="Description"
                helperText={<ErrorMessage name="description" component="div" className="text-red-600 text-[15px]" />}
                sx={{ marginY: "15px" }}
              />
              <Field
                name="category_id"
                as={TextField}
                fullWidth
                type="number"
                label="Brand ID"
                helperText={<ErrorMessage name="category_id" component="div" className="text-red-600 text-[15px]" />}
                sx={{ marginY: "15px" }}
              />
              <input
                name="file"
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                style={{ marginBottom: "15px" }}
              />
              <ErrorMessage name="file" component="div" className="text-red-600 text-[15px]" />
              <Button variant="contained" color="success" type="submit" disabled={isSubmitting} fullWidth>
                {editingBrand?.id ? "Update" : "Save"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
