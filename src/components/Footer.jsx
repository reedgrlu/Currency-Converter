import React from "react";

var year = new Date().getFullYear();

var text = "Copyright ⓒ " + year;

function Footer(){
    return (<footer><p>{text}</p></footer>);
}

export default Footer;