import classes from './Layouts.module.css';
import HeaderBar from './HeaderBar';


function Layouts(props) {
  return (
    <div>
      <HeaderBar />
      <main className={classes.main}>
        {props.children}
      </main>
    </div>
  );
}

export default Layouts;