import { useState } from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";

const CreateListing = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [rooms, setRooms] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          size,
          rooms,
          baths,
          price,
          description,
        }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Seo pageTitle="Create Listing" />
      <h1>Create Listing</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Listing created successfully!</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Size:
          <input
            type="text"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </label>
        <br />
        <label>
          Rooms:
          <input
            type="text"
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
          />
        </label>
        <br />
        <label>
          Baths:
          <input
            type="text"
            value={baths}
            onChange={(event) => setBaths(event.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">Create Listing</button>
      </form>
    </>
  );
};

export default CreateListing;
