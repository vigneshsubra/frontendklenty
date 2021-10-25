import { useRef } from "react";
import BaseCard from "../components/ui/BaseCard";
import classes from "./NewDiscussionForm.module.css";

function NewDiscussionForm(props) {
  const topicInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    // console.log('here');
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const newDiscussionData = {
      topic: enteredTopic,
      description: enteredDescription,
      replies: []
    }

    props.onPostDiscussion(newDiscussionData);
  }

  return (
    <BaseCard>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='topic'>Topic</label>
          <input type='text' required id='topic' ref={topicInputRef} ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor='desc'>Description</label>
          <textarea required id='desc' rows='5' ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Post Discussion</button>
        </div>
      </form>
    </BaseCard>
  )
}

export default NewDiscussionForm;