import React, {useEffect} from 'react';
import "./styles/home.css";
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import UserWelcome from "./UserWelcome";
import Vote from "./Vote";
import SendText from "./SendText";
import MessagesToMe from "./MessagesToMe";
import MessagesFromMe from "./MessagesFromMe";
import HomeArticle from "./HomeArticle";
import fire from "../configs/FireBase";
import history from "../routh/history";
import voteBG from "../../img/voteBG.jpg";
import msgToMe from "../../img/sms.png";
import mySendMsg from "../../img/sendMsg.png";
import sendText from "../../img/sendText.jpg";
import backToHome from "../../img/backToHome2.png";


export default function Home() {
    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (!user) {
                //console.log("user doesn't exist !");
                return history.push("/");
            }
            //console.log("user exist !");
        });
    // eslint-disable-next-line
    }, [null]);

    return (
        <Router>
            <div id="homeWrapper">
                <UserWelcome />
                <div id="refSection">
                    <Link to={process.env.PUBLIC_URL +"/Home"}>
                        <img src={backToHome} alt="Back To Home" />
                    </Link>
                    <Link to={process.env.PUBLIC_URL+"/Home/SendText"}>
                        <img src={mySendMsg} alt="Send Message" />
                    </Link>
                    <Link to={process.env.PUBLIC_URL+"/Home/MessagesToMe"}>
                        <img src={msgToMe} alt="Messages To ME" />
                    </Link>
                    <Link to={process.env.PUBLIC_URL +"/Home/MessagesFromMe"}>
                        <img src={sendText} alt="My Sent Messages" />
                    </Link>
                    <Link to={process.env.PUBLIC_URL +"/Home/Vote"}>
                        <img src={voteBG} alt ="Vote" />
                    </Link>
                </div>

                <Switch>
                    <Route path={process.env.PUBLIC_URL+"/Home/SendText"} component={SendText} />
                    <Route path={process.env.PUBLIC_URL+"/Home/MessagesFromMe"} component={MessagesFromMe} />
                    <Route path={process.env.PUBLIC_URL+"/Home/MessagesToMe"} component={MessagesToMe} />
                    <Route path={process.env.PUBLIC_URL+"/Home/Vote"} component={Vote} />
                    <Route path={process.env.PUBLIC_URL+"/Home"} component={HomeArticle} />
                </Switch>
            </div>
        </Router>
    )    
}
