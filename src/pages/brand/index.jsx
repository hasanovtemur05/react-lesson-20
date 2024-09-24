import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { brand, category } from "@service"; 
import { BrandModal, BrandTable } from "@components";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setEditingBrand(null);
  };

  const fetchBrands = async () => {
    try {
      const res = await brand.get();
      setBrands(res?.data?.data?.brands);
    } catch (error) {
      console.log("Error fetching brands");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await category.get();
      setCategories(res?.data?.data?.categories); // Assumed response structure
    } catch (error) {
      console.log("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const handleSubmit = async (brandData) => {
    try {
      if (editingBrand) {
        await brand.update(editingBrand.id, brandData);
      } else {
        await brand.create(brandData);
      }
      fetchBrands();
      handleClose();
    } catch (error) {
      console.log("Error submitting brand:", error);
    }
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await brand.delete(id);
      fetchBrands();
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };

  const handleCreate = () => {
    setEditingBrand(null);
    setOpen(true);
  };

  return (
    <div>
      <BrandModal 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        editingBrand={editingBrand} 
        categories={categories} // Pass categories to BrandModal
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>Create Brand</Button>
      <BrandTable data={brands} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Index;
