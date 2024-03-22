import { useEffect, useState } from "react";
import Accordioncollapse from "../components/Accordioncollapse"
import HeroSection from "../components/HeroSection"
import Modalform from "../components/Modalform";
import { serverurl } from "./Positionslist";
import pricing from "../pricing.jpg"
import { positionsData, subjectsData, experiencesData } from '../data/data';


function Home() {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedposition, setselectedposition] = useState('');
    const [positionsdata, setpositionsData] = useState([]);
    const [subjectsdata, setsubjectsdata] = useState([]);
    const [experiencesdata, setexperiencesdata] = useState([]);
    useEffect(() => {
        fetchPositions();
        fetchSubjects();
        fetchExperiences();
    }, [])
    const handleerrors = (errors) => {
        setErrors(errors);
    }
    const handleClose = () => {
        setShow(false);
        setErrors({});
    }

    const handleShow = (id) => {
        console.log(id)
        setselectedposition(id);
        setShow(true);
    }
    const fetchPositions = async () => {
        // const response = await fetch(`${serverurl}/position`);
        // const jsonData = await response.json();

        setpositionsData(positionsData);
    };
    const fetchSubjects = async () => {
        // const response = await fetch(`${serverurl}/subject`);
        // const jsonData = await response.json();

        setsubjectsdata(subjectsData);
    };
    const fetchExperiences = async () => {
        // const response = await fetch(`${serverurl}/experience`);
        // const jsonData = await response.json();

        setexperiencesdata(experiencesData);
    };
    return (
        <>
            <HeroSection subjects={subjectsdata} experiences={experiencesdata} />
            <div className="container">
                <h2 className="text-center mb-md-3">Latest Positions</h2>
                <div className="d-flex align-items-center justify-content-center" >
                    <div className='row m-md-1 w-100'>
                        {positionsdata.map((position, index) => {
                            if (index < 4) {
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
                                            <p className='dimgrey mb-2 col-6'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>{position?.worktype == 1 ? ' Full Time' : ' Part Time'}</p>
                                            <div className=""> {/*text-end  col-6 */}
                                                <button type="button" onClick={() => handleShow(position?._id)} className="btn btn-primary btn-outline btnctus">Apply For This Job</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            } else {
                                return '';
                            }
                        })}
                        <Modalform handleClose={handleClose} show={show} selectedposition={selectedposition} handleerrors={handleerrors} errors={errors} />

                    </div>
                </div>
                <div className="text-center mb-md-5">
                    <a href="/positionslist">  <button type="button" className="my-2 btn btn-primary">View All</button></a>

                </div>
            </div>
            <div className="overviewsection bgc-primary py-5">
                <div className="container">
                    <div className="communitysection">
                        <h2 className="fw-bold lh-sm">Join our community of <span className="myhighlightcolor">talented professionals</span> by applying for a job today!</h2>
                        <p className="mt-4 mb-5">Joining our community is the first step towards building a fulfilling career in education, where you can use your skills and expertise to make a positive difference in the world.
                            We offer comprehensive services that help faculty members and institutions find the right match for their needs, making the recruitment process easy and hassle-free.
                        </p>
                    </div>
                    <div className="overviewcard card border-0 shadow row flex-row mb-4">
                        <div className="py-2 px-4  px-md-0 my-md-4 col-md-3 mt-4  text-center">
                            <h2 className="myhighlightcolor fw-bold">10k+</h2>
                            <h6 className="overviewcardtext pb-md-0 pb-4">Members Placed</h6>
                        </div>
                        <div className="py-2 px-4  px-md-0 my-md-4 col-md-3  text-center">
                            <h2 className="myhighlightcolor fw-bold">1200+</h2>
                            <h6 className="overviewcardtext pb-md-0 pb-4">Colleges</h6>
                        </div>
                        <div className="py-2 px-4  px-md-0 my-md-4  col-md-3  text-center">
                            <h2 className="myhighlightcolor fw-bold">1 Lakh</h2>
                            <h6 className="overviewcardtext pb-md-0 pb-4">Avg. Salary</h6>
                        </div>
                        <div className="py-2 px-4  px-md-0 my-md-4 mb-3 col-md-3  text-center border-0">
                            <h2 className="myhighlightcolor fw-bold">25+</h2>
                            <h6 className="overviewcardtext pb-md-0  border-0">Years of Experience</h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container my-5">
                <div className="text-center">
                    <h2>Our Pricing Plan</h2>
                </div>
                <div className="row mt-5 align-items-center justify-content-between">
                    <div className="col-md-7">
                        <p>
                            At PNR Consultancy, we are committed to provide genuine and transparent services to both faculty members and institutions. As part of our commitment to excellence, we charge a consultancy fee of one month salary from the faculty member upon successful placement.
                        </p>
                        <p>
                            We understand that finding the right job can be a challenging and time-consuming process, which is why we provide comprehensive services that help faculty members find the right match for their skills and preferences. Our team of experts has over 25 years of experience in faculty recruitment, and we work closely with institutions to ensure a smooth and hassle-free recruitment process.
                        </p>
                        <p>
                            If you are a talented professional looking for the right job, or an institution seeking the best talent for your needs, we invite you to contact us today to learn more about our services and how we can help you achieve your goals.
                        </p>
                    </div>
                    <div className="col-md-4 aboutusimg">
                        <img src={pricing} className="w-100 h-100" alt="pricing" />
                    </div>
                </div>
            </div>
            <div className="bgc-primary">
                <div className="container py-5 ">
                    <div className="row py-4">
                        <div className="col-md-4">
                            <p className="mb-4 myhighlightcolor fw-bold"> COMMON QUESTIONS </p>
                            <h2 className="h1 fw-bold">Frequently Ask Question.</h2>
                            <p className="my-4">Find quick answers to your questions and learn more about our service by checking out our FAQs section!</p>
                        </div>
                        <div className="col-md-8">
                            <Accordioncollapse />

                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Home