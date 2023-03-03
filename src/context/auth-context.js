import React from 'react';
import jwt_decode from "jwt-decode"
export const AuthContext = React.createContext("auth")
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
export const authState = {
  userJWT: getCookie("erp-jwt"),
  isVerified: null
}

export function setJWT(jwt){
  authState.userJWT = jwt
  setCookie("erp-jwt", jwt, jwt_decode(jwt).exp)
}
export function setUserVerified(state){
  authState.isVerified = state;
}
export function logoutUser(){
  authState.userJWT = null
  document.cookie = ""
}