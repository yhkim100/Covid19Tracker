import React from 'react';
import { Card, CardContent, Typography, Grid, StylesProvider } from '@material-ui/core';
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'; //Allows us to join multiple class names together

//Pass in data into props but then destructure it to obtain 
//'confirmed', 'recovered', 'deaths', and 'lastUdpate' fields
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {

  if(!confirmed) {
    return 'Loading...';
  }

  const cardData = [
    { title: 'Infected', 
      countStart: 0,
      countEnd: confirmed.value,
      duration: 2.5,
      lastUpdate,
      description: 'Number of active cases of COVID-19',
      style: styles.infected
    }, 
    {
      title: 'Recovered', 
      countStart: 0,
      countEnd: recovered.value,
      duration: 2.5,
      lastUpdate,
      description: 'Number of recoveries from COVID-19',
      style: styles.recovered
    }, 
    {
      title: 'Deaths', 
      countStart: 0,
      countEnd: deaths.value,
      duration: 2.5,
      lastUpdate,
      description: 'Number of deaths caused by COVID-19',
      style: styles.deaths
    }
  ]

  //Return Cards making use of Material UI elements
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {cardData.map((card, i)=> 
          <Grid key = {i} item component={Card} xs={12} md={3} className={cx(styles.card, card.style)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>{card.title}</Typography>
            <Typography variant="h5">
              {/*Make use of CountUp library to make cool animation*/}
              <CountUp start={card.countStart} end={card.countEnd} duration={card.duration} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(card.lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">{card.description}</Typography>
          </CardContent>
        </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Cards;