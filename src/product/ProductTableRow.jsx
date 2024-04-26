import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductTableRow = ({ product, onUpdate, index,onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    tags: product.tags || "",
    // file: product.media.length>0 ? product.media[0].original_url:null
  });
  const [preview, setPreview] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name } = e.target;
    let fieldValue;
    if (name == "file") {
      fieldValue = e.target.files[0];
      if (
        fieldValue &&
        !["image/jpeg", "image/png"].includes(fieldValue.type)
      ) {
        fieldValue = null;
        setErrors({ ...errors, file: "File must be a JPG or PNG image." });
        setPreview("");
      } else {
        setErrors({ ...errors, file: null });
        setPreview(URL.createObjectURL(fieldValue));
      }
    } else {
      fieldValue = e.target.value;
    }
    setFormData({ ...formData, [name]: fieldValue });
  };

  const [errors, setErrors] = useState({});

  const handleUpdate = () => {
    const formError = {};
    if (!formData.title.trim()) {
      formError.title = "Title is required!";
    }
    if (!formData.description.trim()) {
      formError.description = "Title is required!";
    }
    if (errors.file) {
      formError.file = errors.file;
    }
    setErrors(formError);
    if (Object.keys(formError).length === 0) {
      onUpdate(product.id, formData);
      handleCloseModal();
    }
  };

  const handleDeleteProduct = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        onDelete(product.id);
    }
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>
        {product.media.length > 0 && (
          <img
            src={product.media[0].original_url}
            height="80px"
            width="100px"
            alt=""
            srcSet=""
          />
        )}
      </td>
      <td>{product.tags}</td>
      <td>
        <Button variant="primary" onClick={handleOpenModal} className="mx-1">
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </td>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`${
                  errors.title ? "border-danger" : ""
                } border rounded`}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`${
                  errors.description ? "border-danger" : ""
                } border rounded`}
              />
            </Form.Group>
            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="border rounded "
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
              {product.media.length > 0 && preview == null ? (
                <img
                  src={product.media[0].original_url}
                  height="80px"
                  width="100px"
                  alt=""
                  srcSet=""
                />
              ) : (
                <img
                  src={preview}
                  height="80px"
                  width="100px"
                  alt=""
                  srcSet=""
                />
              )}
              {errors.file && (
                <span className="text-danger">{errors.file}</span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default ProductTableRow;
