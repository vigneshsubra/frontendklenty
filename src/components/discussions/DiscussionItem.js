import { useHistory } from 'react-router-dom';
import BaseCard from '../ui/BaseCard';
import classes from './DiscussionItem.module.css';

function DiscussionItem(props) {
  const history = useHistory();

  const discussionId = props.id;

  function openDiscussionHandler() {
    history.push({
      pathname: `/discussion-page/${discussionId}`,
      // state: discussionId
    });
  }

  return (
    <BaseCard>
      <li className={classes.item}>
        <div className={classes.title}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.content}>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={openDiscussionHandler}>Open Discussion</button>
        </div>
      </li>
    </BaseCard>
  );
}

export default DiscussionItem;