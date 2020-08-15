'use strict';
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

/** 
   * Use comas después de cada número excepto para el último número.
   * Para MEXICO son 10 digitos
   * Para USA son 11 digitos empezando con "1"
   */

const PHONE_NUMBER_ARRAY = [
    "2223331111", 
    "2223332222", 
    "2223333333"  
]; 

/** Definiendo los mensajes para los 3 tipos de click del IoT Button AWS*/
const SINGLE_CLICK_MESSAGE = "Por favor llamame a mi celular cuando tengas tiempo"; //Evento de un click
const DOUBLE_CLICK_MESSAGE = "Llamame al telefono de la casa"; //Evento de doble click
const LONG_CLICK_MESSAGE = "Necesito ayuda , por favor ven a casa !";// Evento de dejar presionado el button

exports.handler = (event, context, callback) => {
    let clickMessage = SINGLE_CLICK_MESSAGE;
    if (event.clickType === "LONG") {
        clickMessage = LONG_CLICK_MESSAGE;
    }
    if (event.clickType === "DOUBLE") {
        clickMessage = DOUBLE_CLICK_MESSAGE;
    }
    for (var i = 0; i < PHONE_NUMBER_ARRAY.length; i++) {
        const params = {
        PhoneNumber: PHONE_NUMBER_ARRAY[i],
        Message: clickMessage,
        };
        SNS.publish(params, callback);
    }
};