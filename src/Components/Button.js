import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ContainedButtons=
(props)=> {
  const classes = useStyles();
  const [coloredIds,setColoredIds]=React.useState([]);

  React.useEffect(()=>{
    if(props.sideNavData){
        var tempColored=[];
       props.sideNavData.map((value)=>{
        tempColored.push(value.id);
        });
        setColoredIds(tempColored);
    }
  },[props.sideNavData])

  return (
    <div className={classes.root}>
      <Button variant="outlined" size={props.size} onClick={props.onClick} style={coloredIds &&  coloredIds.includes(props.id)?{display:'block',backgroundColor:"green"}:{display:"block",borderColor:"black"}}>
          <div>{props.name}</div>
          <div>{props.secondText}</div>
      </Button>
     
    </div>
  );
}

const mapStateToProps = state => ({
    eventsData: state.EventsReducer.Events,
    sideNavData: state.EventsReducer.sideNavData || []
});

export default connect(mapStateToProps, {  })(ContainedButtons);