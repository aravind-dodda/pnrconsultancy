import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Modalform from '../components/Modalform';
import { positionsData, subjectsData, experiencesData } from '../data/data';
import { sendTelegramNotification } from '../telegram/notification';


export const serverurl = 'https://api.pnrconsultancy.com';
// export const serverurl = 'http://localhost:4000';
let count = 0;

const Positionslist = () => {


    const [show, setShow] = useState(false);
    const [mobile, setMobile] = useState();

    const [positionsdata, setpositionsData] = useState([]);
    const [subjectsdata, setsubjectsdata] = useState([]);
    const [experiencesdata, setexperiencesdata] = useState([]);
    const [selectedposition, setselectedposition] = useState('');
    const [positionsorgdata, setpositionsorgData] = useState([]);
    const [selectedexperience, setselectedexperience] = useState(0);
    const [selectedworktype, setselectedworktype] = useState(0);
    const [selectedsubject, setselectedsubject] = useState(0);
    const [errors, setErrors] = useState({});
    const queryParams = new URLSearchParams(window.location.search);
    const querysubjectid = queryParams.get('subjectid') == null ? 0 : queryParams.get('subjectid');
    const experienceid = queryParams.get('experienceid') == null ? 0 : queryParams.get('experienceid');
    const worktypeid = queryParams.get('worktypeid') == null ? 0 : queryParams.get('worktypeid');
    const mobileno = queryParams.get('mobileno') == null ? "" : queryParams.get('mobileno');


    const handlesubjectchange = (event) => {
        let id = event.target.value
        setselectedsubject(id)

    }

    const handlemobileNumberChange = (event) => {
        let id = event.target.value
        setMobile(id)
    }
    const handleexperiencechange = (event) => {
        let id = event.target.value
        setselectedexperience(id)
    }
    const handleworktypechange = (event) => {
        let id = event.target.value
        setselectedworktype(id)
    }

    const filterdata = async (event, clearfilter = 0) => {
        if (clearfilter !== 2) {

            event?.preventDefault();
        }


        const newErrors = {};
        if (clearfilter !== 2) {

            if (selectedsubject === 0) {
                newErrors.filtermobile = "Please select subject";
            }

            if (isNaN(mobile) || mobile.length !== 10 && clearfilter === 0) {
                newErrors.filtermobile = "Please enter a valid 10-digit mobile number";
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log("error")
        } else {
            setErrors({});
            console.log("no error")
            if (positionsorgdata.length === 0 && selectedsubject !== 0 && clearfilter !== 2) {
                fetchPositions()
            }
            console.log(querysubjectid);
            if (clearfilter === 2 && querysubjectid !== 0 && positionsorgdata.length === 0) {
                fetchPositions()
                // querysubjectid = 0
            }

            let subjectid, experienceid, worktypeid

            if (clearfilter === 0 || clearfilter === 2) {
                subjectid = selectedsubject;
                experienceid = selectedexperience;
                worktypeid = selectedworktype;

            } else {
                subjectid = 0;
                experienceid = 0;
                worktypeid = 0;
            }

            let filteredData = positionsorgdata
                .filter(position => subjectid == 0 || position.subject._id == subjectid)
                .filter(position => experienceid == 0 || position.experience._id == experienceid)
                .filter(position => worktypeid == 0 || position.worktype == worktypeid);


            setpositionsData(filteredData);


            if (clearfilter === 0) {
                let subject = subjectsData.find(subject => subject._id === selectedsubject);
                let subjectName = subject ? subject.name : '';
                let experience = experiencesData.find(experience => experience._id === selectedexperience);
                let experienceName = experience ? experience.name : '';
                let worktype = selectedworktype === 1 ? 'Full Time' : 'Part Time';
                let message = `A new search query has been received on our website. Here are the details of the search:
          
          Subject: ${subjectName}
          Experience: ${experienceName}
          Work Type: ${worktype}
          Mobile Number: ${mobile}`;
                sendTelegramNotification(message)
                // var myHeaders = new Headers();
                // myHeaders.append("Content-Type", "application/json");

                // var raw = JSON.stringify({
                //     "experienceid": selectedexperience,
                //     "subjectid": selectedsubject,
                //     "mobile": mobile,
                //     "worktype": selectedworktype
                // });




                // var requestOptions = {
                //     method: 'POST',
                //     headers: myHeaders,
                //     body: raw,
                //     redirect: 'follow'
                // };

                // fetch(`${serverurl}/search`, requestOptions)
                //     .then(response => response.text())
                //     .then(result => {
                //         result = JSON.parse(result)
                //         if (result.status === 200) {
                //         } else {
                //             let error = {
                //                 response: "unable to search please try again",
                //             }
                //         }
                //     })
                //     .catch(error => {
                //         console.error(error)
                //     });
            }

        }
    }

    const handleerrors = (errors) => {
        setErrors(errors);
    }
    const handleClose = () => {
        setShow(false);
        setErrors({});
    }
    const handleShow = (id) => {
        setselectedposition(id);
        setShow(true);
    }

    useEffect(() => {
        setMobile(mobileno)
        // fetchPositions(); //to load data on page load
        fetchSubjects();
        fetchExperiences();
        setselectedworktype(Number(worktypeid))
        setselectedsubject(querysubjectid)
        setselectedexperience(experienceid)
    }, [])



    useEffect(() => {
        // if (positionsorgdata.length !== 0 || selectedsubject !== 0) {
        filterdata({}, 2)
        // }
    }, [positionsorgdata])







    const fetchPositions = async () => {
        // const response = await fetch(`${serverurl}/position`);
        // const jsonData = await response.json();
        // setpositionsData(jsonData);
        setpositionsorgData(positionsData);
    };
    const fetchSubjects = async () => {
        // const response = await fetch(`${serverurl}/subject`);
        // const jsonData = await response.json();
        setsubjectsdata(subjectsData);
        // setselectedsubject(subjectid)

    };
    const fetchExperiences = async () => {
        // const response = await fetch(`${serverurl}/experience`);
        // const jsonData = await response.json();
        setexperiencesdata(experiencesData);
        ///setselectedexperience(experienceid)
    };

    const clearfilter = async (event) => {
        event.preventDefault();
        setselectedexperience(0);
        setselectedworktype(0);
        setselectedsubject(0);
        setMobile('')
        filterdata(event, 1);
    }

    return (
        <div>
            <div className="text-center p-5 mb-3"
                style={{ backgroundColor: "rgb(242, 246, 255)" }}>
                <h2>Find Jobs</h2>
                <p><i>Explore the Jobs</i></p>
            </div>
            <div className="container-fluid row mx-0 p-0 my-lg-5">
                <div className='col-lg-3 filtercontainer'>
                    <form className=" p-4">
                        <div className="form-group mb-lg-4">
                            <label htmlFor="exampleFormControlSelect1" className='h6 m-0'>Subject</label>
                            <Form.Group className="my-2 border-0" controlId="exampleForm.ControlSelect1">
                                <Form.Select defaultValue={0} onChange={(event) => handlesubjectchange(event)}>
                                    <option selected={selectedsubject === 0 ? true : false} value={0}>Select Your Subject</option>
                                    {
                                        subjectsdata.map((subject, index) => {
                                            return (
                                                <option key={index} selected={selectedsubject === subject._id ? true : false} value={subject._id}>{subject.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="form-group mb-lg-4">
                            <label htmlFor="exampleFormControlSelect2" className='h6 m-0'>Work Type</label>
                            <Form.Group className="my-2 border-0" controlId="exampleForm.ControlSelect2">
                                <Form.Select onChange={(event) => handleworktypechange(event)}>
                                    <option selected={selectedworktype === 0 ? true : false} value={0}>Select Your Work Type</option>
                                    <option selected={selectedworktype === 1 ? true : false} value={1}>Full Time</option>
                                    <option selected={selectedworktype === 2 ? true : false} value={2}>Parttime</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="exampleFormControlSelect3" className='h6 m-0'>Level of Teaching</label>
                            <Form.Group className="my-2 border-0" controlId="exampleForm.ControlSelect3">
                                <Form.Select onChange={(event) => handleexperiencechange(event)}>
                                    <option value={0} selected={selectedexperience === 0 ? true : false}>Select Your Level of teaching </option>
                                    {
                                        experiencesdata.map((experience, index) => {
                                            return (
                                                <option key={index} selected={selectedexperience === experience._id ? true : false} value={experience._id}>{experience.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
                            {/* <Form.Label >Mobile Number</Form.Label> */}
                            <label htmlFor="exampleForm.ControlInput3" className='h6 mb-2'>Mobile Number</label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Mobile Number"
                                onChange={(event) => handlemobileNumberChange(event)}
                                value={mobile}

                            />
                            {errors.filtermobile && <span className='text-danger fs-6'>{errors.filtermobile}</span>}

                        </Form.Group>
                        <div className="form-group mb-4 text-center">
                            <button className='btn-danger btn' onClick={clearfilter}>Clear Filter</button>
                            <button className='btn-primary btn ms-2' onClick={filterdata}>Search</button>

                        </div>


                    </form>
                </div>
                <div className="col-lg-9 container ml-3">
                    <div className='row m-md-1'>

                        {positionsdata.length === 0 ? (<p className='text-center fs-4'>Please try changing filters to find positions</p>)
                            : (positionsdata.map((position, index) => {
                                return (
                                    <div key={index} style={{ backgroundColor: "#f7f7f9" }} className="border border-5 border-bottom-0 border-top-0 border-white col-lg-6 mb-3 p-4" >
                                        <h5>{position?.name}</h5>
                                        <div className="row">
                                            <p className='dimgrey mb-2 col-6 d-none'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                            </svg> {position?.subject?.name}</p>
                                            <p className='dimgrey mb-2 col-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mortarboard" viewBox="0 0 16 16">
                                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
                                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
                                            </svg> {position?.experience?.name}</p>
                                            <p className='dimgrey mb-2 col-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                            </svg>{position?.salary}</p>
                                            <p className='dimgrey mb-2 col-6 text-capitalize'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                                                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                                            </svg> {position?.city}</p>
                                            <p className='dimgrey mb-4 col-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>{position?.worktype == 1 ? ' Full Time' : ' Part Time'}</p>
                                            <div className="">
                                                <button type="button" onClick={() => handleShow(position?._id)} className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))}
                        {/* <div style={{ backgroundColor: "#f7f7f9" }} className="border border-5 border-bottom-0 border-top-0 border-white col-lg-6 mb-3 p-4" >
                            <h5>Senior User Interface Designer</h5>
                            <div className="d-xxl-flex gap-3">
                                <p className='dimgrey mb-1'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> United States Of America</p>
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                </svg> 5 Hours Ago</p>
                                <p className='dimgrey'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>30K-35K</p>
                            </div>
                            <button type="button" onClick={handleShow} className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                        </div>
                        <div style={{ backgroundColor: "#f7f7f9" }} className="border border-5 border-bottom-0 border-top-0 border-white col-lg-6 mb-3 p-4">
                            <h5>System Designer</h5>
                            <div className="d-xxl-flex gap-3">
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> United States Of America</p>
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                </svg> 5 Hours Ago</p>
                                <p className='dimgrey'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>30K-35K</p>
                            </div>
                            <button type="button" className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                        </div>
                        <div style={{ backgroundColor: "#f7f7f9" }} className="border border-5 border-bottom-0 border-top-0 border-white col-lg-6 mb-3 p-4">
                            <h5>Data Mangement and Analyst</h5>
                            <div className="d-xxl-flex gap-3">
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> United States Of America</p>
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                </svg> 5 Hours Ago</p>
                                <p className='dimgrey'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>30K-35K</p>
                            </div>
                            <button type="button" className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                        </div>

                        <div style={{ backgroundColor: "#f7f7f9" }} className="border border-5 border-bottom-0 border-top-0 border-white col-lg-6 mb-3 p-4">
                            <h5>Web Application Designer</h5>
                            <div className="d-xxl-flex gap-3">
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> United States Of America</p>
                                <p className='dimgrey mb-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                </svg> 5 Hours Ago</p>
                                <p className='dimgrey'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>30K-35K</p>
                            </div>
                            <button type="button" className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <Modalform handleClose={handleClose} show={show} selectedposition={selectedposition} handleerrors={handleerrors} errors={errors} />
            {/* <footer
                className="text-center text-lg-start text-dark"
                style={{ backgroundColor: "#f7f7f9" }}
            >
                <div className="container p-4 pb-0">
                    <section className="">
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h4 className="text-uppercase mb-4 font-weight-bold">
                                    Product
                                </h4>
                                <p className=" text-secondary">
                                    How it works
                                </p>
                                <p className="text-secondary">
                                    Features
                                </p>
                                <p className="text-secondary">
                                    Pricing
                                </p>
                                <p className="text-secondary">
                                    FAQ
                                </p>
                                <p className="text-secondary">
                                    Download
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h4 className="text-uppercase mb-4 font-weight-bold">Company</h4>
                                <p className="text-secondary">
                                    About
                                </p>
                                <p className="text-secondary">
                                    Blog
                                </p>
                                <p className="text-secondary">
                                    Partnership
                                </p>
                                <p className="text-secondary">
                                    Terms of use
                                </p>
                                <p className="text-secondary">
                                    Privacy policy
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h4 className="text-uppercase mb-4 font-weight-bold">Support</h4>
                                <p className="text-secondary">Help Center</p>
                                <p className="text-secondary">Contact Us</p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h4 className="text-uppercase mb-4 font-weight-bold">Get in touch</h4>
                                <div className='social-icons'>
                                    <a href="/" className="mx-1"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                    </svg> </a>
                                    <a href="/" className="mx-1"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                    </svg> </a>
                                    <a href="/" className='mx-1'> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                    </svg> </a>
                                </div>



                            </div>
                        </div>
                    </section>
                </div>

                <div className="text-end p-3" >
                    <p className=" text-secondary">@ apex Talent 2022. All Rights Reseerved</p>

                </div>
            </footer> */}





        </div >
    )
}

export default Positionslist