import React from "react";

const MyStore = () => {
  const [loading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
        console.log(jsonData);
      } catch (err) {
        setIsLoading(false);
        console.log(`Error loading data ${err}`);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleButtonClick = (itemId) => {
    setSelectedItemId(itemId); // Set the selected item ID when button is clicked
  };

  const renderProductInfo = (itemId) => {
    const selectedItem = data.find((item) => item.id === itemId);
    if (selectedItem) {
      return <p>{selectedItem.description}</p>;
    }
    return null;
  };

  return (
    <>
      <h1>
        Welcome to my store, here are the items available, if you like one just
        click on it
      </h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title} {`Price is $ ${item.price}`}
            <button onClick={() => handleButtonClick(item.id)}>
              Click me for description
            </button>
            {selectedItemId === item.id && renderProductInfo(item.id)}
            <img src={item.image} alt="image" />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyStore;
