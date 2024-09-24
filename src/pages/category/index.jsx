import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { category } from "@service"; 
import { CategoryTable, CategoryModal } from "@components";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const fetchCategories = async () => {
    try {
      const res = await category.get();
      setCategories(res?.data?.data?.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        await category.update(editingCategory.id, categoryData);
      } else {
        await category.create(categoryData);
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.log("Error submitting category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await category.delete(id);
      fetchCategories();
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  return (
    <div>
      <CategoryModal 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        editingCategory={editingCategory} 
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>Create Category</Button>
      <CategoryTable data={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Index;
