import classes from './BaseCard.module.css';

function BaseCard(props){
 return <div className={classes.card}>{ props.children }</div>
}

export default BaseCard;