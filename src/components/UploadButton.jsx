import React, {useState} from 'react';
import './UploadButton.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileExcel } from "@fortawesome/free-solid-svg-icons";

function UploadButton(props) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const uploadFileRef = React.createRef();

    function onChange(evt) {
        const file = evt.target.files[0]
        handleFileSelect(file);
    }

    function handleFileSelect(file) {
        setTimeout(() => {
            setFile(file);
        }, 1000);

        setFileLoading(true)
        setTimeout(() => {
            setFileLoading(false)
            props.onChange(file);
        }, 2000);
    }

    function triggerFileUpload(evt) {
        evt.preventDefault();
        uploadFileRef.current.click();
    }

    function onDrop(evt) {
        evt.preventDefault();
        setDragging(false);
        uploadFileRef.current.files = evt.dataTransfer.files
        handleFileSelect(uploadFileRef.current.files[0])
    }

    function onDragover(evt) {
        evt.preventDefault();
        setDragging(true);
    }

    function onDragLeave(evt) {
        evt.preventDefault();
        setDragging(false);
    }

    function updateFiles(evt) {
        setFile(null);
        // in timeout 500 remove hidden from drop
    }

    function uploadedIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
                <g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"/></g>
            </svg>
        )
    }

    function fileTemplate() {
        if (!file) {
            return <></>
        }

        return (
            <div className="file">
                <div className="name">
                    <span>{file.name}</span>
                </div>

                <div className={`progress ${fileLoading ? 'active' : ''}`} />
                <div className={`done ${!fileLoading ? 'anim' : ''}`}>
                    <a href="" target="_blank">{uploadedIcon()}</a>
                </div>
            </div>
        )
    }

    return (
        <div className="upload">
            <div className="upload-files">
                <header>
                    <p>
                        <FontAwesomeIcon icon={faCloudUploadAlt} />
                        <span className="up">CSV</span>
                        <span className="load"> upload</span>
                    </p>
                </header>
                <div id="drop" className={`body ${dragging ? 'active' : ''} ${file ? 'hidden' : ''}`}
                     onDrop={onDrop} onDragOver={onDragover} onDragLeave={onDragLeave}>
                    <FontAwesomeIcon icon={faFileExcel} className="icon"/>
                    <p className="pointer-none">
                        <b>Drag and drop</b> files here <br/>
                        or <a href="" onClick={triggerFileUpload}>browse</a> to begin the upload
                    </p>
                    <input type="file" onChange={onChange} ref={uploadFileRef} accept=".csv" />
                </div>
                <footer className={!!file ? 'hasFiles' : ''}>
                    <div className="divider"/>
                    <div className="list-files">
                        {fileTemplate()}
                    </div>

                    <button className={`${file ? 'active' : ''} importer`} onClick={updateFiles}>
                        Update files
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default UploadButton;
