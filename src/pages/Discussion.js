import axios from 'axios';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/auth-context';
import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import BaseCard from "../components/ui/BaseCard";
import LoadingSpinner from '../components/ui/LoadingSpinner';
import classes from './Discussion.module.css';


function DiscussionPage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const replyInputref = useRef();
  const { id } = useParams();
  // const location = useLocation();
  const [discussion, setDiscussion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/discussion/${id}`).then((response) => {
      setDiscussion(response.data.discussion);
      setIsLoading(false);
    })
  }, [id]);


  const replyHandler = async (data) => {
    const newReply = {
      username: auth.username,
      reply: data
    }
    await axios.post(`http://localhost:5000/api/discussion/${id}/add-reply`, newReply, { headers: headers })
    history.push(`/discussion-page/${id}`);
  }

  return (
    <div className={classes.outer}>
      <h3> The Topic:</h3>
      <BaseCard>
        <div className={classes.title}>
          {isLoading ? <LoadingSpinner asOverlay /> : (<h2>{discussion && discussion.topic}</h2>)}
        </div>
      </BaseCard>
      <h3>Description:</h3>
      <BaseCard>
        <div className={classes.content}>
          {isLoading ? <LoadingSpinner asOverlay /> : (<p>{discussion && discussion.description}</p>)}
        </div>
      </BaseCard>
      {auth.isLoggedIn && (
        <BaseCard>
          <div className={classes.control}>
            <label htmlFor='reply'>Type your reply here:</label>
            <textarea id='reply' rows='5' ref={replyInputref}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={() => replyHandler(replyInputref.current.value)}>Post</button>
          </div>
        </BaseCard>
      )}
      <h3>Replies:</h3>
      {discussion && discussion.replies && discussion.replies.map((reply) => {
        return (
          <BaseCard key={reply.id}>
            <div>
              <h3>{reply.username}</h3>
            </div>
            <div>
              {reply.reply}
            </div>
          </BaseCard>
        )
      })}
    </div>
  );
}

export default DiscussionPage;