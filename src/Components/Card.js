import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from "../Components/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getSideNavData } from "../actions/events"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "16px",
        border: '1px solid black',
        borderRadius: '0px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        borderBottom: '1px solid black',
        textAlign:'center',
        padding:'10px',
        color: 'black',
        fontWeight: '550'
    },
    pos: {
        marginBottom: 12,
    },
    cardContent: {
        padding: 0
    },
    actions: {
        display: "block"
    },
    gridItem1: {
        textAlign: 'right'
    },
    gridItem2: {
        textAlign: 'center'
    },
    gridItem3: {
        textAlign: 'left'
    },
    gridAlign:{
        display:"block"
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: "none"
    },
    gridContainer: {
        borderTop: '1px solid black'
    },
    menuBar: {
        display: "block"
    },
    market: {
        display: "block"
    }
}));

function SimpleCard({ name, selectionButtons, Id, sideNavData, getSideNavData }) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const handleClick = (nameId, selection, marketName) => {
        const tempObj = [ ...sideNavData ];
        const existing = [];
        tempObj.map((value) => (
            existing.push(value.id)
        ));
        if (existing.includes(selection.id)) {
            var reduxData=sideNavData.filter(x=>x.id!=selection.id);
            getSideNavData(reduxData);
        }
        else {
            // tempObjValue.push(selection);
            if (marketName == "Team to Win")
                selection["secondaryName"]=" to win"
            else
                selection["secondaryName"]=" to Score First"
             tempObj.push(selection)
            getSideNavData(tempObj);
        }
    }

    return (
        <Fragment>

            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {name.replace("vs",`\u00A0\u00A0\u00A0\u00A0\u00A0vs\u00A0\u00A0\u00A0\u00A0\u00A0`)}
                    </Typography>

                </CardContent>

                <CardActions className={classes.actions}>
                    {selectionButtons.map((button, index) => (
                        <React.Fragment>
                        <Grid container className={index > 0 ? `${classes.gridAlign}` : classes.gridAlign}>
                        <div style={{display:"block",padding:'10px',color:'grey'}}>{button.name=="Team to Win"?"To WIN":"To Score First"}</div>
                        <div style={{display:"flex"}}>
                            {button["selections"].map((select) => (
                                <Grid item xs={3}>
                                   
                                    <Button id={select.id} headerName={name} selectedValue={select}  size="small" name={select.name} secondText={select.price} onClick={() => handleClick(Id, select, button.name)} />
                                </Grid>
                            ))}
                           
                        </div>
                        {selectionButtons.length>1 && index<selectionButtons.length-1?<hr style={{borderColor:"grey"}}/>:''}
                        </Grid>
                        
                        </React.Fragment>
                    ))}

                </CardActions>
            </Card>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    eventsData: state.EventsReducer.Events,
    sideNavData: state.EventsReducer.sideNavData || []
});

export default connect(mapStateToProps, { getSideNavData })(SimpleCard);