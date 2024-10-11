import { useEffect, useState } from 'react'
import './App.css'

function App() {
 
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProduct = async( ) =>{
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if(data && data.products)
    setProducts(data.products);
    }
 
    useEffect(() => {
      fetchProduct();
    }, [])

   console.log(products);

 const selectedPageHandle = (num) => {
  if(num >=1 && num <= products.length/10 && num !=page)
  setPage(num);
 }


  return (
   <div className='app'>
    {products && (<div className='products'>
        {products.slice(page * 10 - 10, page * 10 ).map((prod) =>  (
           <span className="products__single" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span> 
           </span>
        ))}  
    </div>
    )} 
    {products.length > 0 && (
  <div className="pagination">
    <span className={ page > 1 ? "" : "pagination__disabled"  } onClick={()=> selectedPageHandle(page - 1)}>◀️</span>
    <span>
      {
       [...Array(products.length / 10)].map((num,i)=>{
        return <span className={page === i + 1 ? "pagination__selected" : ""} onClick={()=>selectedPageHandle(i+1)}>{i+1}</span>
      })
      }
    </span>
    <span className={ page < products.length / 10 ? "" : "pagination__disabled"} onClick={()=> selectedPageHandle(page + 1)}>▶️</span>
    </div>)}
   </div>
  )
}

export default App
