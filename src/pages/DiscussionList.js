import { useEffect, useState } from 'react';
import DiscussionItem from '../components/discussions/DiscussionItem';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import classes from './DiscussionList.module.css';


function DiscussionListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [discussions, setDiscussions] = useState();


  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/discussion-list');

        const responseData = await response.json();

        setDiscussions(responseData.discussions);
      } catch (err) {
        throw err;
      }
      setIsLoading(false);
    };

    sendRequest();

  }, []);

  return (
    <section>
      <h1>List of Discussions.</h1>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && discussions && discussions.length === 0 ? (<div><h2>No discussions added yet! Add some?</h2></div>) :
        <ul className={classes.list}>
          {discussions && discussions.map((discussion) => (
            <DiscussionItem
              key={discussion.id}
              id={discussion.id}
              title={discussion.topic}
              description={discussion.description}
            />)
          )}
        </ul>}
    </section>
  );
}

export default DiscussionListPage;