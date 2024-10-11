import React, { useEffect, useState } from 'react';

function Pagination() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Initialize page as 1 instead of 0

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectedPage = (num) => {
    if (num >= 1 && num <= products.length / 10 && num !== page) {
      setPage(num);
    }
  };

  return (
    <div className='min-h-screen p-4'>
      {/* Display products */}
      {products.length > 0 && (
        <div className='grid max-md:grid-cols-2 md:grid-cols-3 gap-4'>
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <div key={prod.id} className='p-4 border rounded'>
              <img src={prod.thumbnail} alt={prod.title} className='w-full h-auto' />
              <span className='block mt-2'>{prod.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {products.length > 0 && (
        <div className='pagination flex justify-center items-center mt-6 space-x-2'>
          <span
            className={page > 1 ? "flex cursor-pointer" : "hidden"}
            onClick={() => handleSelectedPage(page - 1)}
          >
            ◀️
          </span>

          {/* Render page numbers */}
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
            <span
              key={i + 1}
              className={`cursor-pointer px-3 py-1 rounded-lg ${
                page === i + 1
                  ? "bg-blue-500 text-white font-bold"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectedPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}

          <span
            className={page < products.length / 10 ? "flex cursor-pointer" : "hidden"}
            onClick={() => handleSelectedPage(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default Pagination;
