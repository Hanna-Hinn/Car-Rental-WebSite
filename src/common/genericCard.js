/**
 *  A Common Card component
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const GenericCard = (props) => {
  return (
    <Fragment>
      <Card>
        <CardActionArea onClick={props.onClick} sx={props.style}>
          <CardMedia component="img" height="140" src={props.cardMedia} />
          <CardContent>
            {props.typoGraphy.map((tg, index) => {
              return (
                <Typography
                  key={index}
                  gutterBottom
                  variant={tg.textStyle}
                  color={tg.color}
                >
                  {tg.content}
                </Typography>
              );
            })}
          </CardContent>
        </CardActionArea>
        {props.children}
      </Card>
    </Fragment>
  );
};

GenericCard.propTypes = {
  cardMedia: PropTypes.string,
  typoGraphy: PropTypes.array,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default GenericCard;
