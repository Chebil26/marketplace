import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductPanel = ({ name, author, image, price }) => {
  return (
    <Card
      sx={{
        width: '200px',
        height: '500px',
        margin: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        display: 'inline-block',
        verticalAlign: 'top',
      }}>
      <div
        style={{
          height: 0,
          paddingTop: '150%',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <img
          src={image}
          alt={name}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      </div>
      <CardContent sx={{ padding: '8px' }}>
        <Typography variant='h6' component='h3' gutterBottom>
          {name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' gutterBottom>
          Author: {author}
        </Typography>
        <Typography variant='body1' color='textPrimary'>
          Price: {price} DA
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductPanel;

// import { Card, CardContent, Typography } from '@mui/material';

// const ProductPanel = ({ name, author, image, price, description }) => {
//   const limitDescription = (description, limit) => {
//     const words = description.split(' ');
//     if (words.length > limit) {
//       return words.slice(0, limit).join(' ') + '...';
//     }
//     return description;
//   };

//   const limitedDescription = limitDescription(description, 30);

//   return (
//     <Card
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         width: '600px',
//         margin: '10px',
//         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
//       }}>
//       <div style={{ width: '40%', padding: '2px' }}>
//         <div
//           style={{
//             height: 0,
//             paddingTop: '150%',
//             position: 'relative',
//             overflow: 'hidden',
//           }}>
//           <img
//             src={image}
//             alt={name}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               height: '100%',
//               width: '100%',
//               objectFit: 'cover',
//               borderRadius: '4px',
//             }}
//           />
//         </div>
//         <div style={{ marginTop: '8px' }}>
//           <Typography variant='h6' component='h3' gutterBottom>
//             {name}
//           </Typography>
//           <Typography variant='subtitle1' color='textSecondary' gutterBottom>
//             Author: {author}
//           </Typography>
//           <Typography variant='body1' color='textPrimary'>
//             Price: ${price}
//           </Typography>
//         </div>
//       </div>
//       <CardContent
//         sx={{
//           width: '60%',
//           padding: '8px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}>
//         <div>
//           <Typography variant='subtitle1' color='textSecondary' gutterBottom>
//             Description: {limitedDescription}
//           </Typography>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductPanel;
