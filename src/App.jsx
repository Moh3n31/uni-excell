import { useState } from "react";

import {
    Routes,
    Route,
    useNavigate
  } from "react-router-dom";

//components
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ViewPage from './components/view-page/ViewPage';

//database
import excellFiles from "./database/excellFiles";
import types from "./database/types";

//styles
import './styles/general.css';

export default function App() {
    
    const [viewId, setViewId] = useState(0);
    const navigate = useNavigate();

//..............navigation functions..............

    function handleLogin() {
        navigate('/home');
    }

    function handleLogOut() {
        navigate('/');
    }

    function handleView(fileId) {
        setViewId(fileId);
        navigate('/view');
    }

    function handleHome() {
        navigate('/home');
    }

//..............file management..............

    function handleDelete() {
        const fileToDelete = excellFiles.find((element) => element.fileId === viewId);
        if (fileToDelete) {
            fileToDelete.archived = !fileToDelete.archived;
        }
        return handleHome();
    }

    function handleFileEdit(id, update) {
        //finds the file using id
        //then updates it based on the given 'update'
    }

//..............component..............

    return (
            <div>
                <Routes>
                    <Route path="/" element={
                        <LoginPage handleLogin={handleLogin}/>
                        } />
                    <Route 
                        path="/home" 
                        element={
                        <HomePage 
                            handleLogOut={handleLogOut} 
                            handleView={handleView} 
                            excellFiles={excellFiles} 
                            types={types}
                        />
                        } 
                    />
                    <Route 
                        path="/view" 
                        element={
                        <ViewPage
                            handleLogOut={handleLogOut}
                            handleHome={handleHome}
                            viewId={viewId}
                            types={types}
                            handleDelete={handleDelete}
                            updateTheFile={handleFileEdit}
                        />
                        } 
                    />
                </Routes>
            </div>
    );
}