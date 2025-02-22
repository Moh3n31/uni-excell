import { useState } from "react";

//components
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ViewPage from './components/view-page/ViewPage';

//database
import excellFiles from "./database/excellFiles";
import types from "./database/types";

import './styles/general.css';

export default function App (){
    const [logIn, setLogIn] = useState (false);
    const [homePage, sethomePage] = useState (true);
    const [view, setView] = useState (false);

    const [viewId, setViewId] = useState(0);

    function handleLogin (){
        setLogIn(false);
        sethomePage(true);
    }
    function handleView (fileId){
        setViewId (fileId);
        
        sethomePage (false);
        setView (true);
    }
    
    function handleHome (){
        sethomePage (true);
        setView (false);
    }

    function handleDelete() {
        var deleteId = 0;

        excellFiles.forEach((element) => {
            
            const missmatch = element.fileId != viewId;

            if(!missmatch)
                deleteId = element.fileId;
        });

        excellFiles[deleteId].archived=!(excellFiles[deleteId].archived);
        return handleHome();
    }

    return (
        <div>
            {logIn && <LoginPage handleLogin={handleLogin}/>}

            {homePage && <HomePage handleLogin={handleLogin}
                handleView={handleView} excellFiles={excellFiles} types={types}/>}

            {view && <ViewPage handleLogin={handleLogin}
                handleHome={handleHome} viewId={viewId}
                types={types} handleDelete={handleDelete}/>}
        </div>
    );
}