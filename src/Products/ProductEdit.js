import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/css";

import {
  createProduct,
  deleteProduct,
  retrievProduct,
  updateProduct,
} from "./ProductsService";

const ProductEditStyle = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 4px;
  padding: 15px;
  .ProductEdit {
    &-Input {
      width: 100%;
      border: 1px solid transparent;
      color: #fff;
      background: #1d1e26;
      padding: 10px 15px;
      margin-bottom: 5px;
      border-radius: 4px;
      outline: 0;
      &-focus {
        border-color: #50fa7b;
      }
    }
    &-Textarea {
      min-height: 80px;
      resize: none;
    }
    &-Button {
      border: 1px solid #50fa7b;
      color: #50fa7b;
      background: none;
      padding: 10px 15px;
      border-radius: 4px;
      outline: 0;
      cursor: pointer;
      font-weight: 600;
      transform: uppercase;
    }
  }
`;

const ProductEdit = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!isEdit) {
      setForm({
        id: "",
        name: "",
        price: 0,
        description: "",
      });
      return;
    }

    (async () => {
      try {
        const product = await retrievProduct(id);
        setForm(product);
      } catch (error) {
        console.warn(error);
        navigate(`/admin`, { replace: true });
      }
    })();
  }, []);

  const updateField = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const { id } = await createProduct(form);
      navigate(`/admin/${id}`);
    } catch (error) {
      console.warn(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateProduct(form);
      alert(`Updated ${form.name}`);
      navigate(`/admin`);
    } catch (error) {
      console.warn(error);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm(`Do you really want to delete ${form.name}`)) {
      return;
    }
    try {
      await deleteProduct(form.id);
      navigate(`/admin`);
    } catch (error) {
      console.warn(error);
    }
  };

  if (form === null) {
    return <div>Loading...</div>;
  }

  return (
    <form className={ProductEditStyle}>
      <input
        type="text"
        name="id"
        placeholder="ID"
        className="ProductEdit-Input"
        value={form.id}
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="ProductEdit-Input"
        value={form.name}
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        className="ProductEdit-Input"
        value={form.price}
        onChange={({ target }) =>
          updateField({ name: target.name, value: parseInt(target.value, 10) })
        }
      />
      <textarea
        name="description"
        placeholder="Description"
        className="ProductEdit-Input ProductEdit-Textarea"
        value={form.description}
        onChange={({ target }) => updateField(target)}
      />
      {!isEdit && (
        <button
          type="button"
          className="ProductEdit-Button"
          onClick={handleCreate}
        >
          Create
        </button>
      )}
      {isEdit && (
        <>
          <button
            type="button"
            className="ProductEdit-Button"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="ProductEdit-Button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
    </form>
  );
};

export default ProductEdit;
