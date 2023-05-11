import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { useState } from "react";
import Axios from "axios";
import {
  Grid,
  Stack,
  TextField,
  Button,
  Input,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
  const [form, setForm] = useState({});
  const [imageSelected, setImageSelected] = useState();
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "oh6qkskk");
    const res = await Axios.post(
      "https://api.cloudinary.com/v1_1/dqpju0ulg/image/upload",
      formData
    );
    const body = [{
      title: form.title,
      slug: form.slug,
      desc: form.description,
      color: form.color,
      size: form.size,
      seller: localStorage.getItem('myadmin').token,
      price: form.price,
      category: form.category,
      availableQty: form.availableQty,
      img: res.data.secure_url,
    }];
    const a = await Axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,
      body
    );

  };
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField
                  onChange={onChange}
                  value={form.title ? form.title : ""}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.size ? form.size : ""}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.color ? form.color : ""}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.slug ? form.slug : ""}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.category ? form.category : ""}
                  name="category"
                  label="Category"
                  variant="outlined"
                />
                <TextField
                  onChange={onChange}
                  value={form.availableQty ? form.availableQty : ""}
                  name="availableQty"
                  label="Available Quantity"
                  variant="outlined"
                />
                <TextField
                  name="description"
                  label="Description"
                  onChange={onChange}
                  value={form.description ? form.description : ""}
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                />
                <Input
                  onChange={(e) => {
                    setImageSelected(e.target.files[0]);
                  }}
                  name="img"
                  placeholder="uploadPhoto"
                  label="uploadImage"
                  variant="outlined"
                  type="file"
                />
                <TextField
                  onChange={onChange}
                  value={form.price ? form.price : ""}
                  name="price"
                  label="Price"
                  variant="outlined"
                />
              </Stack>
              <br />
              <Button onClick={submitForm} onSubmitvariant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
