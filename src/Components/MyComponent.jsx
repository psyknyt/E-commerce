import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/?limit=30")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{data ? <OtherComponent data={data} /> : <p>Loading...</p>}</div>;
};

const OtherComponent = ({ data }) => {
  // Use the data to create JSX
  return (
    <div>
      {/* Render something based on the data */}
      <p>Data received: {JSON.stringify(data)}</p>
    </div>
  );
};

export default MyComponent;
