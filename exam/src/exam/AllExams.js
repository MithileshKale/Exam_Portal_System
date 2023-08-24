import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import setmode from '../Student/context/contexts'

export default function AllExams() {
    const [exams, setExams] = useState([])
    const theme=useContext(setmode)
    useEffect(() => {
        getallexams()
    }, [])
    const getallexams = () => {
        axios({
            url: 'http://localhost:9090/api/examdetails/' + localStorage.getItem("student_id"),
            method: 'get',
            contentType: 'application/JSON'
        }).then((resp) => {
            setExams(resp.data)
        })
    }

    // to set exam id in local storage 
    const setExamId=(id)=>{
        localStorage.setItem("exam_id",id)
    }

    return (
        <>
            <Table bordered variant={theme.mode} responsive hover >
                <thead>
                    <tr>
                        <th>exam date</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map((d,k) => {
                        return (
                            <tr key={k}>
                                <td>{d.exame_date}</td>
                                <td>{d.start_time}</td>
                                <td>{d.end_time}</td>
                                <td><Link to="examinfo"><Button variant='info' onClick={() => setExamId(d.exam_id)} >View Result</Button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
