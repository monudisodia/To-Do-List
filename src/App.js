import React, { useState } from 'react'
import './App.css'

export default function App() {

    const [titleData, setTitleData] = useState("");
    const [inpData, setImpData] = useState("");
    const [listData, setListData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [togglebtn, setTogglebtn] = useState(true);
    const [disable, setDisable] = useState(false);
    function addList() {

        if (titleData === "") {
            alert("Please enter Title!")
        } else if (inpData === '') {
            alert("Please enter Description!!")
        } else if (inpData && !togglebtn) {

            setListData(
                listData.map((el) => {
                    if (el.id === editId) {
                        return { ...el, name: inpData }
                    }
                    return el;
                })
            )
            setImpData("");
            setTitleData("");
            setEditId(null);
            setTogglebtn(true);
        } else {

            const allInpData = { id: new Date().getTime().toString(), name: inpData, title: titleData }
            setListData([...listData, allInpData]);
            setImpData("");
            setTitleData("");
        }


    }

    const removelist = (id) => {

        const updatedListData = listData.filter((el) => {
            return el.id !== id;
        })
        setListData(updatedListData);
    }

    function editlist(id) {

        const editedListData = listData.find((el) => {
            return el.id === id;
        })
        setImpData(editedListData.name);
        setEditId(editedListData.id);
        setTogglebtn(false);


    }
    function done(id) {
        const editedListData = listData.find((el) => {
            return el.id === id;
        })
        disable ? setDisable(false) : setDisable(true);
        setEditId(editedListData.id);


    }

    function removeAll() {

        setListData([]);
    }





    return (
        <>
            <div className='Container'>

                <div style={{ padding: '10px' }}>
                    <h1 style={{ background: 'rgb(25, 79, 167)', padding: '10px', color: 'white', borderRadius: '20px' }} >ToDo List</h1>
                </div>
                <div className='input-div'>
                    <input type='text' placeholder='Add Title' className='title' value={titleData} onChange={(e) => { setTitleData(e.target.value) }} />
                    <input type="text" placeholder='Add Description' value={inpData} onChange={(e) => { setImpData(e.target.value) }} />
                    <div>{togglebtn ? <button onClick={addList}>Add</button> : <button className='edit' onClick={addList}>Edit</button>}</div>

                </div>
                <div className='list-heading'>
                    <select className='select'>
                        <option>All</option>
                        <option>Newest</option>
                    </select>
                </div>

                {
                    listData !== [] && listData.map((data) => {

                        return (
                            <div className="list-data">
                                <div key={data.id} ><div className='title-date'><div style={{ fontWeight: 'bold', fontSize: "20px" }}>{data.title}</div>
                                <div className='time'>{new Date().toLocaleTimeString()}  {new Date().toLocaleDateString()}</div>
                                </div>
                                <div className='data-name'>{data.name}</div>

                                    <button className='edit' onClick={() => editlist(data.id)} disabled={disable}>+</button>
                                    <button key={data.id} className='donebtn' onClick={() => done(data.id)}>✓</button>
                                    <button onClick={() => removelist(data.id)} className="deletebtn">–</button>


                                </div>

                            </div>
                        )
                    })
                }

                {
                    listData.length >= 1 && <button onClick={removeAll} style={{ background: "rgb(172, 20, 20)" }}>✕</button>
                }



            </div>
        </>
    )
}
