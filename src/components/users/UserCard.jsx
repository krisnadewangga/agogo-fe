import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom'

import './UserCard.scss';
import DefaultImage from '../../containers/DefaultImage';
import DefaultIP from '../../containers/DefaultIP';

const UserCard = (props) => {
  const imgServer = props.userAvatar;
  const imgLocal = imgServer ? imgServer.replace("https://pos.agogo-bakery.com", DefaultIP) : props.defAvatar;
        
  return (
    <Card className="UserCard">
      <Link to={'/login/' + props.userIndex}>
        <CardImg top width="100%" className='mt-3' src={imgLocal} alt={props.userName} onError={(e) => {
            e.currentTarget.onerror = null; // prevents infinite loop if fallback also fails
            e.currentTarget.src = DefaultImage; // set the fallback source
         }} />
        <CardBody>
          <CardTitle className={props.colorTitle}>{props.userName ? props.userName : 'User Name'}</CardTitle>
          <CardSubtitle className={props.colorSubTitle}>{props.userRole}</CardSubtitle>

        </CardBody> 
      </Link>
    </Card>
  )
}

export default UserCard