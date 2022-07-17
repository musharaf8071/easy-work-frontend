import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import fetchBackendJSON from '../../actions/Fetch';

// const bull = (
//  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }} />
// );

function Spaces() {
 const [cards, setCards] = useState([]);

 // eslint-disable-next-line prettier/prettier, prefer-const
 let tempCards = [];

 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
    let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getprojects', 'POST', {});

   fetchedData.project_list.forEach((project) => {
    console.log(project);
    tempCards.push(
     <Card sx={{ minWidth: 275 }} key={project.id}>
      <CardContent>
       <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        {project.title}
       </Typography>
       <Typography variant="h5" component="div">
        {project.description}
       </Typography>
       <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Days Remaining: {project.remaining_time}
       </Typography>
       <Typography variant="body2">Starting Date: {project.start_date}</Typography>
      </CardContent>
      <CardActions>
       <Button size="small">Go to Space</Button>
      </CardActions>
     </Card>
    );
   });
   setCards(tempCards);
   tempCards = [];
  }
  fetchData();
  console.log(cards.length);
 }, []);

 return (
  <div>
   <Typography variant="h2" component="div" gutterBottom>
    Spaces
   </Typography>
   <div
    style={{
     width: '100%',
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
    }}
   >
    {cards.map((proj) => (
     <div className="cardDiv">{proj}</div>
    ))}
   </div>
  </div>
 );
}

export default Spaces;