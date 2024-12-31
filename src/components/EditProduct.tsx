import React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { IProduct } from "../models/IProduct"
import { setSuccessAlert } from "../redux/slices/successAlertSlice"
import { updateProduct } from "../redux/slices/productsSlice"
import * as Yup from "yup"

interface IEditProductProps {
  productId: number
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProduct: React.FC<IEditProductProps> = ({ productId, setEditMode }) => {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.products)

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required").min(20, "Description must be at least 20 characters"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
  })

  const product: IProduct = products.find((p: IProduct) => p.id === productId)

  return (
    <div className="product-page">
      <h2 className="edit-mode-title">Edit mode</h2>

      <Formik
        initialValues={{
          title: product.title,
          brand: product.brand,
          description: product.description,
          images: product.images,
          price: product.price,
          favorite: product.favorite,
          id: product.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values: IProduct) => {
          dispatch(
            updateProduct({
              title: values.title,
              brand: values.brand,
              description: values.description,
              favorite: values.favorite,
              images: values.images,
              price: values.price,
              id: values.id,
            })
          )
          dispatch(setSuccessAlert({ show: true, text: "The card has been updated!" }))
          setEditMode(false)
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
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
              <Field className="input-form" type="number" name="price" id="price" placeholder="$" />
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
                  Update
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default EditProduct
