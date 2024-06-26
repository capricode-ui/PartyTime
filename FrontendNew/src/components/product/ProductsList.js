
"use client"
import { useRef,useEffect } from 'react';
import Product from './ProductItem';
import styles from "@/styles/product/productsList.module.css"


  export default function ProductsList({ products, category = "Chips, Biscuits and Cold Drinks" }) {
    const productsListRef = useRef(null);

     useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/getProducts/');
        const data = await response.json();
        //setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  
    const handleScrollLeft = () => {
      if (productsListRef.current) {
        productsListRef.current.scrollBy({
          left: -200, // Adjust as needed
          behavior: 'smooth'
        });
      }
    };
  
    const handleScrollRight = () => {
      if (productsListRef.current) {
        productsListRef.current.scrollBy({
          left: 200, // Adjust as needed
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <div className={styles.productsListOuterContainer}>
      <span className={styles.productsListTitle}>{category}</span>
      <div className={styles.productsListContainer}>
        <button className={`${styles.scrollButton} ${styles.scrollLeft}`} onClick={handleScrollLeft}>
          <img src="/images/left-arrow.png" alt="Left Arrow" />
        </button>
        <div className={styles.productsList} ref={productsListRef}>
          {products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              image={product.image}
              weight={product.weight}
            />
          ))}
        </div>
        <button className={`${styles.scrollButton} ${styles.scrollRight}`} onClick={handleScrollRight}>
          <img src="/images/right-arrow.png" alt="Right Arrow" />
        </button>
      </div>
      </div>
    );
  }
