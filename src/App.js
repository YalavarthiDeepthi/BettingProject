import './App.css';
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {getEvents,getSideNavData} from "./actions/events";
import Card from "./Components/Card";
import { slide as Menu } from 'react-burger-menu'
import { Button } from '@material-ui/core';


const materialStyles = theme => ({
  deleteButton:{
    background: 'black !important',
    color:'white',
    height:'24px',
    fontSize:'10px'
  },
  spacing:{
    padding:theme.spacing(1)
  }
});

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    // left: '36px',
    top: '22px',
    right: '28px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    right:'20px'
  },
  bmCross: {
    background: "black"
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top:0
  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    // color: '#b8b7ad',
    padding: '0.8em',
    textAlign: 'center'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  
}


class App extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.getEvents();
  }

  deleteSelection=(selection)=>{
    var filteredSideNavData=this.props.sideNavData.filter(x=>x.id!=selection.id);

    this.props.getSideNavData(filteredSideNavData)
  }
  
  render() {
    const { classes } = this.props;
    return(
      <React.Fragment>
      <div>
       
      <Menu styles={styles} right>
        {this.props.sideNavData && this.props.sideNavData.map((val)=>(
          <Fragment>
          <div style={{textAlign:"center", borderBottom:"1px solid black", paddingBottom: "10px", paddingTop: "10px"}}>
            <div className={classes.spacing}>{val.name + val.secondaryName}</div>
            <div className={classes.spacing}>{val.price}</div>
            <Button variant="contained" size="small" className={`${classes.deleteButton} ${classes.spacing}`} onClick={()=>this.deleteSelection(val)}>Delete</Button>
          </div>
          </Fragment>
        ))}
      </Menu>
      </div>
      <hr style={{marginTop:'80px', borderColor:"grey"}}/>
      <div style={{marginTop:"30px"}}>
      {this.props.eventsData && this.props.eventsData.map(event=>(
        event.markets.length>0 &&
        <Card name={event.name} Id={event.id} selectionButtons={event["markets"]}/>
      ))}
      </div>
     </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  eventsData : state.EventsReducer.Events,
  sideNavData:state.EventsReducer.sideNavData
});

export default withStyles(materialStyles)( connect (mapStateToProps,{getEvents,getSideNavData})(App));

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }