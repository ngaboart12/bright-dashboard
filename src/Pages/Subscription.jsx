import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    let number = 1;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'subscription'));
        const subscriptionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubscriptions(subscriptionData);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions(); // Call the function to fetch data when the component mounts
  }, [])

  const handleDeleteSubscription = async (id) => {
    try {
      // Delete the document with the specified ID from the 'subscription' collection
      await deleteDoc(doc(db, 'subscription', id));
      // Update the state to reflect the removal of the deleted subscription
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((subscription) => subscription.id !== id)
      );
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };
  return (
    <div className='w-full flex flex-col gap-4'>
    <h1 className='text-[20px] font-[800]'>SUBSCRIPTION</h1>
    <ul className='flex flex-col gap-2'>
      {subscriptions.map((subscription) => (
         <li key={subscription.id} className='p-2 bg-white rounded-[4px] flex flex-row gap-4'>
         <span className='bg-gray-200 px-4 py-1'>{number++}</span>
         {subscription.email}
         <button className='ml-auto text-red-500' onClick={() => handleDeleteSubscription(subscription.id)}>Delete</button>
       </li>
      ))}
    </ul>
    
  </div>
  )
}

export default Subscription
