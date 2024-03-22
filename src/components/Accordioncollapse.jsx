import { Accordion } from 'react-bootstrap';


const Accordioncollapse = () => {
  return (

    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>What kind of teaching positions do you help with?
        </Accordion.Header>
        <Accordion.Body>
          We help with placement for a variety of intermediate-level teaching positions, including positions in public and private schools, international schools, and language schools.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How do I submit my resume for a teaching position?
        </Accordion.Header>
        <Accordion.Body>
          You can submit your resume through our website or by emailing it to our team directly. We review all resumes and contact candidates who meet our criteria for available positions.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What is the typical salary range for intermediate teachers?
        </Accordion.Header>
        <Accordion.Body>
          The salary range for intermediate teachers varies depending on the country, school, and level of experience. We work with a range of schools and can provide more specific salary information during the application process.        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>What is the typical salary range for intermediate teachers?
        </Accordion.Header>
        <Accordion.Body>
          The salary range for intermediate teachers varies depending on the country, school, and level of experience. We work with a range of schools and can provide more specific salary information during the application process.        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Do you provide training or professional development opportunities?
        </Accordion.Header>
        <Accordion.Body>
          Some schools we work with provide training or professional development opportunities for their teachers. We can provide information on available opportunities during the hiring process.        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>How do you match teachers with schools?
        </Accordion.Header>
        <Accordion.Body>
          We match teachers with schools based on a variety of factors, including the teacher's qualifications, experience, and preferences, as well as the school's needs and requirements.          </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Accordioncollapse