import './styles/signUp.css';
import React, {useState, useEffect} from 'react';
import history from '../routh/history';
import firebase from "../configs/FireBase";
import "firebase/firestore";

// Material UI packages --------------------------------------
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
// ------------------------------------------------------------
import {useStyles} from "./SignIn";

export default function SignUp(props) {

    const DB = firebase.firestore();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [groupVal, setGroupVal] = useState("");
    const [groups, setGroups] = useState([]);

    console.log(groupVal);

    let toggle = true;

    useEffect(() =>{
      callDB();
      // eslint-disable-next-line
    }, [null])
    
    function callDB() {
      DB.collection("Group").get().then(querySnapshot => {
        const groups = [];
        querySnapshot.forEach(doc => {
          groups.push({
            id: doc.id,
            value: doc.data().name,
          })
        });
        setGroups(groups);
      })
    }

    function handleOnSubmit(e) {
      e.preventDefault();

      if (toggle && groupVal) {
       firebase.auth().createUserWithEmailAndPassword(email, password).then(p => {
          DB.collection("User").doc(p.user.uid).set({
            name: firstname,
            surname: lastname,
            email: email,
            age: age,
            group: groupVal
          })
          return p.user.uid;
        }).then(userId => {
          DB.collection("User_to_group").doc().set({
            groupId: groups.find(item => item.value === groupVal).id,
            userId: userId,
          })
        }).then(() => {
          history.push('/Home');
        })
        .catch((error) => {
            window.alert(error.message);           
        }).finally(() => {
            toggle = true;
        });
    } else {
        let select = document.getElementById("select");
        select.style.border = "1px solid #3B5998";
        setTimeout(() => {
          select.style.border = "none";
        }, 500);
    }
  }
  
  const items = groups.map(item => <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>)

  /* -- PLS DON'T DELETE THIS -- */
  // function test(e) {
  //   const IN = e.target;
  //   IN.setCustomValidity("Please enter at least 5 characters.");
  //   console.dir(e.target);
  // }
  // <input onInvalid = {test}/>

  const classes = useStyles();

    return (
     <div id="signInContainer">
       <div className="signUpContainer">

{/* <<<<<<< HEAD
          <h1>SIGN UP</h1>
          <form name="userRegistrationForm" onSubmit={handleOnSubmit}>
            <div>
              <TextField
                label="First Name"
                className={classes.textFieldEmail}
                type="text"
                autoComplete="First Name"
                margin="normal"
                required={true}
                variant="filled"
                style={{marginBottom: 0}}
                inputProps={{ pattern: "[A-Za-z]{1,15}",  title: "First Name must contain only letters." }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div>
              <TextField
                label="Last Name"
                className={classes.textFieldEmail}
                type="text"
                autoComplete="Last Name"
                margin="normal"
                required={true}
                variant="filled"
                style={{ marginBottom: 0 }}
                inputProps={{ pattern: "[A-Za-z]{1,15}", title: "Last Name must contain only letters." }}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div>
              <TextField
                label="Email"
                className={classes.textFieldEmail}
                type="email"
                autoComplete="Email"
                margin="normal"
                required={true}
                variant="filled"
                style={{ marginBottom: 0 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <TextField
                label="Password"
                className={classes.textFieldEmail}
                type="password"
                autoComplete="password"
                margin="normal"
                required={true}
                variant="filled"
                style={{ marginBottom: 0 }}
                inputProps={{
                  pattern: ".{8,}", 
                  title: "Password must contain 8 or more characters." 
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <TextField
                label="Age"
                className={classes.textFieldEmail}
                type="number"
                autoComplete="Age"
                margin="normal"
                required={true}
                variant="filled"
                InputProps={{ inputProps: { min: 18, max: 81 } }}
                style={{ marginBottom: 15 }}
                value={age}
                onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <FormControl id="select"required variant="filled" className={classes.formControl} style={{marginBottom: 5, width: "95%"}}>
                <InputLabel htmlFor="Select Group">Select Group</InputLabel>
                <Select
                  value={groupVal}
                  onChange={(e) => setGroupVal(e.target.value)}
                  input={<FilledInput name="group" id="filled-age-simple" />}
                >
                  {items}
                </Select>
              </FormControl>
            </div>
            <Button type="submit" color="primary" variant="contained" className={classes.buttonRegistry}>
              REGISTRY
            </Button>
            <Button color="inherit" onClick={props.swtich} variant="contained" className={classes.buttonBack}>
              BACK
            </Button>
          </form>
======= */}
          <h1 style={{background: "#3f51b5"}}>SIGN UP</h1>
          <div className="signUpMainCont">
            <form name="userRegistrationForm" onSubmit={handleOnSubmit}>
              <div>
                <TextField
                  label="First Name"
                  className={classes.textFieldEmail}
                  type="text"
                  autoComplete="First Name"
                  margin="normal"
                  required={true}
                  variant="filled"
                  style={{marginBottom: 0}}
                  inputProps={{ pattern: "[A-Za-z]{1,15}",  title: "First Name must contain only letters." }}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  className={classes.textFieldEmail}
                  type="text"
                  autoComplete="Last Name"
                  margin="normal"
                  required={true}
                  variant="filled"
                  style={{ marginBottom: 0 }}
                  inputProps={{ pattern: "[A-Za-z]{1,15}", title: "Second Name must contain only letters." }}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)} />
              </div>
              <div>
                <TextField
                  label="Email"
                  className={classes.textFieldEmail}
                  type="email"
                  autoComplete="Email"
                  margin="normal"
                  required={true}
                  variant="filled"
                  style={{ marginBottom: 0 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <TextField
                  label="Password"
                  className={classes.textFieldEmail}
                  type="password"
                  autoComplete="password"
                  margin="normal"
                  required={true}
                  variant="filled"
                  style={{ marginBottom: 0 }}
                  inputProps={{
                    pattern: ".{6,}", 
                    title: "Password must contain 6 or more characters." 
                   }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <TextField
                  label="Age"
                  className={classes.textFieldEmail}
                  type="number"
                  autoComplete="Age"
                  margin="normal"
                  required={true}
                  variant="filled"
                  InputProps={{ inputProps: { min: 18, max: 81 } }}
                  style={{ marginBottom: 15 }}
                  value={age}
                  onChange={(e) => setAge(e.target.value)} />
              </div>
              {/* <select defaultValue={'DEFAULT'} required onChange={(e) => setGroupVal(e.target.value)} >
                <option value="DEFAULT" disabled hidden> -- select an option -- </option>
                {items}
              </select>
              <p style={{ fontSize: 12 }}>Select your group</p>
              <button type="submit" value="Registre" id="regButton">REGISTRY</button>
              <button type="button" value="Back" onClick={props.swtich} id="backButton">BACK</button>  */}
              <div>
                <FormControl id="select"required variant="filled" className={classes.formControl} style={{marginBottom: 5, width: "95%"}}>
                  <InputLabel htmlFor="Select Group">Select Group</InputLabel>
                  <Select
                    value={groupVal}
                    onChange={(e) => setGroupVal(e.target.value)}
                    input={<FilledInput name="group" id="filled-age-simple" />}
                  >
                    {items}
                  </Select>
                </FormControl>
              </div>
              <Button type="submit" color="primary" variant="contained" className={classes.buttonRegistry}>
                REGISTER
              </Button>
              <Button color="inherit" onClick={props.swtich} variant="contained" className={classes.buttonBack}>
                BACK
              </Button>
          {/* 
              <input type="text" 
                    required maxLength="32" pattern="[A-Za-z]{1,32}" 
                    placeholder="First Name" 
                    value={firstname} 
                    onChange={(e)=>setFirstname(e.target.value)}/>

              <p style={{fontSize: 12}}>Must contain only letters</p>
            
              <input type="text" required maxLength="32" pattern="[A-Za-z]{1,32}" 
                      placeholder="Last Name" 
                      value={lastname} 
                      onChange={(e)=>setLastname(e.target.value)} />

              <p style={{fontSize: 12}}>Must contain only letters</p>
              
              <input type="email" required placeholder="Email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} />

              <p style={{ fontSize: 12 }}>Example@gmail.com</p>
              
              <input type="password" required maxLength="12" pattern="[A-Za-z0-9]{6,12}" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} />
            
              <p style={{fontSize: 12}}>Must contain at list 6 charackters [A-Za-z0-9]</p>
              
              <input type="number" required min="18" max="70" 
                    placeholder="Age" 
                    value={age} 
                    onChange={(e)=>setAge(e.target.value)} />

                <p style={{ fontSize: 12 }}>18 to 70</p> */}
            </form>
          </div>
       </div>
    </div>
    );
}