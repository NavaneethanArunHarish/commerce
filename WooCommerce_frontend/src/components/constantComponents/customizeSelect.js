import { RadioGroup } from "react-radio-group";

import style2 from '../../assets/carousel/butta/style2.png';

import dot1 from '../../assets/carousel/butta/dot3.png';

import peacock from '../../assets/carousel/butta/peacock-buttas-gold.png';

export const BgColor = [
    {
      text: 'Red',
      value: 'red',
      label: {color: 'red', empty: true, circular: true ,className:'right floated' },
    },
     {
        text: 'Green',
        value: 'green',
        label: {color: 'green', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Blue',
        value: 'blue',
        label: {color: 'blue', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Yellow',
        value: 'yellow',
        label: {color: 'yellow', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Black',
        value: 'black',
        label: {color: 'black', empty: true, circular: true ,className:'right floated' },
      }   
  ];
  

  export const buttaStyle = [
    {
      text: 'Style1',
      value: peacock,
      //value: style2,
      
    },
     {
        text: 'Style2',
        value: dot1,
        //label: {color: 'green', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Style3',
        value: 'style3',
        //label: {color: 'blue', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Style4',
        value: 'Style4',
        //label: {color: 'yellow', empty: true, circular: true ,className:'right floated' },
      },
      {
        text: 'Style5',
        value: 'style5',
        //label: {color: 'black', empty: true, circular: true ,className:'right floated' },
      }   
  ];