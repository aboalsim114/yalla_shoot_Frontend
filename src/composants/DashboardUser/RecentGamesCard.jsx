import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const RecentGamesCard = ({ games }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Matchs Récents
        </Typography>
        <List>
          {games.map((game, index) => (
            <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={`${game.category} - ${game.date}`}
                secondary={`Code postal: ${game.postalCode}, Joueurs: ${game.playersNumber}`}
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {game.description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentGamesCard;
