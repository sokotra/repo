import '../styles/chatUi.css';
import Avatar from 'react-avatar';
import { IoMdSend } from 'react-icons/io';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { getUsers, getAllMessages, sentNewMessage } from '../services/ChatAPI';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import PageNotFound from './PageNotFound';
import {BsChatRightText} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function MyChat(props) {

    const [showContent, setShowContent] = useState(false);
    const [userList, setUserList] = useState('');
    const [allMessages, setAllMessage] = useState('');
    const [chatUser, setChatUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const selectedProfile = localStorage.getItem("MyProfile") ? JSON.parse(localStorage.getItem("MyProfile")).emailId : false;

    useEffect(() => {

        const interval = setInterval(() => {
            getPeopleList();
            if (chatUser !== null) {
                showMessages();
            }
        }, 1000);
        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMessages]);

    const getPeopleList = () => {
        getUsers().then(response => {
            if (response.isSuccess) {
                var res = response.data.reverse();
                setUserList(res)
            }
        })

    }




    const showMessages = () => {
        getAllMessages(chatUser).then(response => {
            if (response.isSuccess) {
                var res = response.data.reverse();
                setAllMessage(res);
            }
            else {
                alert("error")
            }
        })

    }

    const sendMessage = () => {
        var data = {
            fromId: selectedProfile,
            toId: chatUser,
            messages: newMessage
        }

        sentNewMessage(data).then(response => {
            if (response.isSuccess) {
                setNewMessage("");
                var res = response.data.list.reverse();
                setAllMessage(res);


            }
            else {
                alert("Error...")
            }
        })

    }

    const ViewContentTab = (receiver) => {
        setShowContent(true);
        setChatUser(receiver);
        showMessages();


    }


    return (
        <>
            {selectedProfile ?
                userList ?
                    <div className="container-fluid mt-4">
                        <div className="row clearfix">
                            <div className="col-lg-12">
                                <div className="card card-chat chat-app">
                                    <div id="plist" className={showContent ? "people-list show-content" : "people-list"}>
                                        <div className="input-group-prepend text-center mb-4">
                                            <span className="fs-4 fw-bold text-primary"><BsChatRightText/> MyChat</span>
                                        </div>
                                        {chatMembers()}
                                    </div>
                                    {contentView()}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className='container mt-5'>
                        <div className='text-secondary display-1  text-center'><BsChatRightText size={300} style={{ opacity: "0.5" }} /></div>
                        <p className='text-secondary display-6  text-center'>No Chat Found</p>
                        <p className='text-secondary fs-3 text-center'>Go to <Link to="/" className='text-secondary fs-3'>Home</Link></p>
                    </div>
                : <PageNotFound />
            }
        </>

    )
    function chatMembers() {
        return (
            <>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                    {userList.map(lists => {
                        return (
                            //add active in below class
                            <li className="clearfix" onClick={() => ViewContentTab(lists)} key={lists}>
                                <div className='row'>

                                    <div className='col-2'>
                                        <Avatar name={lists} size='40' className='img' />
                                    </div>
                                    <div className='col-10'>
                                        <div className="about">
                                            <div className="name">{lists.split("@")[0]}</div>
                                        </div>
                                    </div>
                                </div>


                            </li>
                        )
                    })}
                </ul>

            </>
        )
    }

    function contentView() {
        return (
            <>

                <div className="chat">
                    {allMessages ? <>
                        <div className="chat-header clearfix">
                            <div className="row">
                                <div className='col-2 col-lg-1 show-arrow'>
                                    <span className='fs-2' onClick={() => setShowContent(false)}><AiOutlineArrowLeft /></span>
                                </div>
                                <div className="col-lg-10 col-10">

                                    <Avatar name={chatUser} size='50' className='img' />
                                    <div className="chat-about">
                                        <h6 className="m-b-0">{chatUser.split("@")[0]}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-history">
                            <ul className="m-b-0">
                                {allMessages.map(messages => {
                                    return (
                                        <>
                                            {messages.fromId === selectedProfile ?
                                                <li className="clearfix">

                                                    <div className='row justify-content-right'>
                                                        <div className='col-12'>
                                                            <h6 className="message-data-time float-right fs-6">{format(new Date(messages.currentDateTime), "h:mm aa, dd MMM yyyy")}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="message other-message float-right"> {messages.messages} </div>
                                                </li>
                                                :
                                                <li className="clearfix">
                                                    <div className="message-data">
                                                        <span className="message-data-time">{format(new Date(messages.currentDateTime), "h:mm aa, dd MMM yyyy")}</span>
                                                    </div>
                                                    <div className="message my-message">{messages.messages}</div>
                                                </li>
                                            }
                                        </>
                                    )

                                })}
                            </ul>
                        </div>
                        <div className="chat-message clearfix">
                            <div className="input-group mb-0 ">
                                <input type="text" className="form-control" placeholder="Enter text here..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                <div className="input-group-prepend">
                                    <button className="btn btn-light form-control-lg " onClick={sendMessage} disabled={newMessage.length > 0 ? "" : "disabled"}><IoMdSend size={35} style={{ color: "#136b7e" }} /></button>
                                </div>
                            </div>
                        </div>
                    </>
                        : <>
                            <div className='mt-5 text-center'>

                                <h3 className='fw-lighter ftext-center'>Click the user to chat</h3>
                            </div>

                        </>}
                </div>

            </>
        )
    }
}