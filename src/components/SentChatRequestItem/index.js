import { LiaBathSolid, LiaRupeeSignSolid } from 'react-icons/lia';
import './index.css'
import img from '../../assets/images/image.jpg'
import { RiCompass3Line } from 'react-icons/ri';
import { PiBuildingDuotone, PiChatDotsLight } from 'react-icons/pi';
import { CiParking1 } from 'react-icons/ci';
import { GoHeart } from 'react-icons/go';
import { MdOutlineCall } from 'react-icons/md';

const SentChatRequestItem = (props) => {

    const { chatRequestItemDetails, showChatView } = props
    const { chatId, username, propertyTitle, status } = chatRequestItemDetails;

    const onClickSendMessage = () => {
        showChatView(chatId, propertyTitle, username)
    }

    return (
        <div className="card" key={chatId}>
            <div className='card-header one'>
                <h6> {propertyTitle} For Sale in Hyderabad</h6>
                <p>Independent House, opposite to brand factory,SR nagar , Hyderabad</p>
            </div>

            <div className='card-header two'>
                <LiaRupeeSignSolid className='rupee-icon' />|
                <h6> ₹{ }Lacs </h6>|
                <h6>₹{ }/Month</h6>|
                <h6>{ }sqft</h6>
            </div>

            <div className='card-body'>
                <div>
                    <img src={img} alt="" />

                </div>
                <div>
                    {/* <p>Owner Name : {username}</p>
                    <p>Chat Request Status:  {status}</p>

                    {status === "accepted" && <button onClick={onClickSendMessage} className='send-message-btn'><PiChatDotsLight className='chat-msg-icon'/> &nbsp;Chat</button>} */}
                    <div className='property-box'>
                        <div className='property-sub-box1'>
                            <div className='icon-paragraph'>
                                <div><RiCompass3Line className='compass' /></div>
                                <div className='compass-paragraph'>
                                    <h6>Don't know</h6>
                                    <p>Facing</p>
                                </div>
                            </div>
                            <div className='icon-paragraph'>
                                <div><PiBuildingDuotone className='building' /></div>
                                <div className='building-paragraph'>
                                    <h6>{propertyTitle}</h6>
                                    <p>Appartment Type</p>
                                </div>
                            </div>
                        </div>

                        <div className='property-sub-box1'>
                            <div className='icon-paragraph'>
                                <div><LiaBathSolid className='bathroom' /></div>
                                <div className='bathroom-paragraph'>
                                    <h6>1</h6>
                                    <p>Bathrooms</p>
                                </div>
                            </div>
                            <div className='icon-paragraph'>
                                <div><CiParking1 className='parking' /></div>
                                <div className='parking-paragraph'>
                                    <h6>None</h6>
                                    <p>Parking</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='property-sub-box2'>
                        
                        <div>
                            <GoHeart className='heart' />
                        </div>
                        <div>
                            {status === "accepted" && <button onClick={onClickSendMessage} className='send-message-btn'><PiChatDotsLight className='chat-msg-icon' /> &nbsp;Chat</button>}
                        </div>
                        <div>
                            <button className='send-message-btn'><MdOutlineCall className='chat-msg-icon' /> &nbsp;Call</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default SentChatRequestItem;