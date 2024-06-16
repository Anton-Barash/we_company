import React, { useState } from 'react';
import Login, { Password, Submit, Username } from '@react-login-page/page1';

function Log() {

    
    return (
        <Login style={{ width: "100wh", height: "100vh" }}>

            <Username></Username>
            <Password></Password>
            <Submit></Submit>
        </Login>
    );
}

export default Log;