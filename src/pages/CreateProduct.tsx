import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useAppDispatch } from "../redux/hooks"
import { createProduct } from "../redux/slices/productsSlice"
import { IProduct } from "../models/IProduct"
import { useNavigate } from "react-router-dom"
import { setSuccessAlert } from "../redux/slices/successAlertSlice"
import * as Yup from "yup"
import "../css/create-product.css"

const CreateProduct = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required").min(20, "Description must be at least 20 characters"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
  })

  return (
    <>
      <h1>Create product</h1>

      <Formik
        initialValues={{
          title: "",
          brand: "",
          description: "",
          images: [],
          price: 0,
          favorite: false,
          id: Date.now(),
        }}
        validationSchema={validationSchema}
        onSubmit={(values: IProduct) => {
          dispatch(
            createProduct({
              title: values.title,
              brand: values.brand,
              description: values.description,
              favorite: values.favorite,
              id: values.id,
              images: values.images,
              price: values.price,
            })
          )
          dispatch(setSuccessAlert({ show: true, text: "The card has been created!" }))
          navigate(`/products/${values.id}`)
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => {
          return (
            <Form className="form-container">
              <label htmlFor="title">Title:</label>
              <Field className="input-form" type="text" name="title" id="title" placeholder="Enter a title..." />
              <ErrorMessage name="title" component="p" className="error-message-form" />

              <label htmlFor="description">Description:</label>
              <Field className="input-form" type="text" name="description" id="description" placeholder="Enter a description..." />
              <ErrorMessage name="description" component="p" className="error-message-form" />

              <label htmlFor="brand">Brand:</label>
              <Field className="input-form" type="text" name="brand" id="brand" placeholder="Enter a brand..." />
              <ErrorMessage name="brand" component="p" className="error-message-form" />

              <label htmlFor="price">Price (in dollars):</label>
              <Field className="input-form" type="number" name="price" id="price" placeholder="$" value={values.price || ""} />
              <ErrorMessage name="price" component="p" className="error-message-form" />

              <label htmlFor="images">Image:</label>
              <input
                className="input-form"
                type="file"
                accept="image/*"
                name="images"
                id="images"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue("images", event.currentTarget.files[0])
                  }
                }}
              />
              <ErrorMessage name="image" component="p" className="error-message-form" />

              <div className="element-center">
                <button type="submit" className="create-btn" disabled={isSubmitting}>
                  Create
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CreateProduct
