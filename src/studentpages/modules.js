import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Modules() {
  const params = useParams();

  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/modules/course/' + params.courseID);
      const responseTwo = await fetch('/modules/' + params.courseID + '/assignmentByCourse')

      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseData = await response.json();
      const responseDataTwo = await responseTwo.json();

      setModules(responseData);
      setAssignments(responseDataTwo);
      setLoading(false)
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(modules).length === 0){
        setError("No modules found");
      }else{
        setError(error.message);
      }
    })
    
  }, []);

  if(loading){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>A moment please...</p>
    </section>
  }

  if(error){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>{error}</p>
    </section>
  }

  const fileDownloadHandler = (e) => {
    let name = e.target.getAttribute("data-name")
    fetch('/modules/download/' + e.target.value, {
      method: "GET"
    })
      .then((response) => response.blob())
      .then((blob) => {
        
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          name + '.pdf',
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log(e.target.value);
  }

  return (
    <div>
      <div>
        <h2 className="mt-3 ms-3">Modules</h2>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Modules</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, index) => (
                <tr key={module.id}>
                  <td>{index + 1}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {module.modules_name}
                  </td>
                  <td>
                    <Button size="sm" onClick={fileDownloadHandler} value={module.id} data-name={module.modules_name}>Download</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Modules;
