import React from 'react'
import EmailNotification from '../Home/EmailNotification'
import GoalSet from '../Home/GoalSet'
import UnSubscribe from '../Home/Subscription/UnSubscribe'

const SubscriptionWrapper = (props) => {
    return (
        <>
            <EmailNotification/>
            <GoalSet  selecttime={props.selecttime} onGetSets={props.onGetSets}/>
            <UnSubscribe/>
            
        </>
    )
}

export default SubscriptionWrapper
