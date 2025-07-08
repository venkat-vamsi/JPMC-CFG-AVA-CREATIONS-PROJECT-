// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import { handloomCategories } from '../data/handlooms';
// import { bambooCategories } from '../data/bamboo';
// import { agroCategories } from '../data/agro';

// const categoryMap = {
//   handlooms: handloomCategories,
//   bamboo: bambooCategories,
//   agro: agroCategories,
// };

// const CategoryPage = () => {
//   const { productType } = useParams();
//   const categories = categoryMap[productType] || [];
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   useEffect(() => {
//     setSelectedCategory(categories[0]);
//   }, [productType]);

//   const styles = {
//     page: {
//       display: 'flex',
//       minHeight: '100vh',
//       fontFamily: 'Segoe UI, sans-serif',
//       backgroundColor: '#f0fff4',
//     },
//     sidebar: {
//       width: '25%',
//       backgroundColor: '#e6f4ea',
//       padding: '20px',
//       boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
//     },
//     listItem: (isSelected) => ({
//       padding: '14px 18px',
//       margin: '10px 0',
//       backgroundColor: isSelected ? '#a8d5ba' : '#ffffff',
//       border: '1px solid #a8d5ba',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       color: '#2f5233',
//       fontWeight: isSelected ? 'bold' : '500',
//       transition: 'all 0.3s ease',
//       boxShadow: isSelected
//         ? '0 3px 8px rgba(38, 70, 83, 0.2)'
//         : '0 2px 5px rgba(0, 0, 0, 0.05)',
//     }),
//     content: {
//       flex: 1,
//       padding: '40px',
//     },
//     heading: {
//       fontSize: '32px',
//       color: '#256029',
//       marginBottom: '20px',
//     },
//     paragraph: {
//       fontSize: '18px',
//       lineHeight: '1.8',
//       color: '#3e5545',
//     },
//     card: {
//       position: 'relative',
//       width: '300px',
//       backgroundColor: '#fff',
//       borderRadius: '10px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       marginBottom: '20px',
//     },
//     image: {
//       width: '100%',
//       height: 'auto',
//     },
//     priceTag: {
//       position: 'absolute',
//       top: '10px',
//       left: '10px',
//       backgroundColor: '#256029',
//       color: 'white',
//       padding: '5px 10px',
//       borderRadius: '6px',
//       fontWeight: 'bold',
//       fontSize: '14px',
//     },
//     desc: {
//       padding: '15px',
//       fontSize: '15px',
//       color: '#333',
//     },
//     button: {
//       display: 'block',
//       margin: '0 auto 15px',
//       padding: '10px 20px',
//       backgroundColor: '#256029',
//       color: 'white',
//       border: 'none',
//       borderRadius: '6px',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//     },
//   };

//   if (!categories.length) {
//     return (
//       <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
//         404 - Category Not Found
//       </h2>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <div style={styles.sidebar}>
//         <h2
//           style={{
//             color: '#2f5233',
//             marginBottom: '25px',
//             textTransform: 'capitalize',
//             fontSize: '24px',
//             borderBottom: '2px solid #c7e2cc',
//             paddingBottom: '10px',
//           }}
//         >
//           {productType} Categories
//         </h2>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {categories.map((cat) => (
//             <li
//               key={cat.id}
//               onClick={() => setSelectedCategory(cat)}
//               style={styles.listItem(selectedCategory?.id === cat.id)}
//               onMouseEnter={(e) => {
//                 if (selectedCategory?.id !== cat.id)
//                   e.currentTarget.style.backgroundColor = '#d6f5e3';
//               }}
//               onMouseLeave={(e) => {
//                 if (selectedCategory?.id !== cat.id)
//                   e.currentTarget.style.backgroundColor = '#ffffff';
//               }}
//             >
//               {cat.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div style={styles.content}>
//         <h1 style={styles.heading}>{selectedCategory?.name}</h1>
//         <p style={styles.paragraph}>{selectedCategory?.description}</p>

//         {selectedCategory?.products?.length > 0 && (
//           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//             {selectedCategory.products.map((item, index) => (
//               <div key={index} style={styles.card}>
//                 <img src={item.image} alt={selectedCategory.name} style={styles.image} />
//                 <div style={styles.priceTag}>{item.price}</div>
//                 <div style={styles.desc}>
//                   <p>This is a premium handloom product made with care and tradition.</p>
//                 </div>
//                 <button style={styles.button}>Add to Cart</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { handloomCategories } from '../data/handlooms';
import { bambooCategories } from '../data/bamboo';
import { agroCategories } from '../data/agro';

const categoryMap = {
  handlooms: handloomCategories,
  bamboo: bambooCategories,
  agro: agroCategories,
};

const CategoryPage = () => {
  const { productType } = useParams();
  const categories = categoryMap[productType] || [];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [productType]);

  const styles = {
    page: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f0fff4',
    },
    sidebar: {
      width: '25%',
      backgroundColor: '#e6f4ea',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
    },
    listItem: (isSelected) => ({
      padding: '14px 18px',
      margin: '10px 0',
      backgroundColor: isSelected ? '#a8d5ba' : '#ffffff',
      border: '1px solid #a8d5ba',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#2f5233',
      fontWeight: isSelected ? 'bold' : '500',
      transition: 'all 0.3s ease',
      boxShadow: isSelected
        ? '0 3px 8px rgba(38, 70, 83, 0.2)'
        : '0 2px 5px rgba(0, 0, 0, 0.05)',
    }),
    content: {
      flex: 1,
      padding: '40px',
    },
    heading: {
      fontSize: '32px',
      color: '#256029',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: '#3e5545',
    },
    card: {
      position: 'relative',
      width: '300px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    priceTag: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#256029',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    desc: {
      padding: '15px',
      fontSize: '15px',
      color: '#333',
    },
    button: {
      display: 'block',
      margin: '0 auto 15px',
      padding: '10px 20px',
      backgroundColor: '#256029',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  if (!categories.length) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
        404 - Category Not Found
      </h2>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2
          style={{
            color: '#2f5233',
            marginBottom: '25px',
            textTransform: 'capitalize',
            fontSize: '24px',
            borderBottom: '2px solid #c7e2cc',
            paddingBottom: '10px',
          }}
        >
          {productType} Categories
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              style={styles.listItem(selectedCategory?.id === cat.id)}
              onMouseEnter={(e) => {
                if (selectedCategory?.id !== cat.id)
                  e.currentTarget.style.backgroundColor = '#d6f5e3';
              }}
              onMouseLeave={(e) => {
                if (selectedCategory?.id !== cat.id)
                  e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.content}>
        <h1 style={styles.heading}>{selectedCategory?.name}</h1>
        <p style={styles.paragraph}>{selectedCategory?.description}</p>

        {selectedCategory?.products?.length > 0 && (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {selectedCategory.products.map((item, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={item.image}
                  alt={selectedCategory.name}
                  style={styles.image}
                />
                <div style={styles.priceTag}>{item.price}</div>
                <div style={styles.desc}>
                  <p>{item.description}</p>
                </div>
                <button style={styles.button}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
