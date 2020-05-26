import React, {useState} from 'react';
import './App.scss';
import {readCsvFile} from "./helpers";
import Table from "./components/Table";
import Paginator from "./components/Paginator";
import UploadButton from "./components/UploadButton";

const DISPLAY_COLUMNS = 5

function App() {
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [data, setData] = useState([]);
    const [paginatedData, setPaginatedData] = useState([])

    function paginate(page, data) {
        setPage(page)

        const paginated = data.map(row => {
            return row.slice(page * DISPLAY_COLUMNS, (page + 1) * DISPLAY_COLUMNS)
        })

        setPaginatedData(paginated)
    }

    function displayFile(file) {
        readCsvFile(file, (data) => {
            if (data.length > 0) {
                const colNum = data[0].length
                setPages(Math.ceil(colNum / DISPLAY_COLUMNS))
                setData(data)
                paginate(0, data)
            }
        })
    }

    function onPrev(e) {
        e.preventDefault()
        paginate(Math.max(0, page - 1), data)
    }

    function onNext(e) {
        e.preventDefault()
        paginate(Math.min(pages - 1, page + 1), data)
    }

    function paginationButtons() {
        if (pages > 1) {
            return (
                <>
                    <a className="prev" onClick={onPrev}>Previous</a>
                    <a className="next" onClick={onNext}>Next</a>
                </>
            )
        } else {
            return <></>
        }
    }
    function table() {
        if (data && data.length > 0) {
            return (
                <div>
                    <div className="slideshow-container">
                        <Table data={paginatedData}/>
                        {paginationButtons()}
                    </div>
                    <Paginator pages={pages} currentPage={page}
                               onPageSelect={(page) => paginate(page, data)}/>
                </div>
            )
        }
    }

    return (
        <div className="container">
            <div className="container-column"><UploadButton onChange={displayFile}/></div>
            <div className="container-column">{table()}</div>
        </div>
    );
}

export default App;
