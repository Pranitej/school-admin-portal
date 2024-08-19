import React, { useState, useEffect } from "react";
import axios from "axios";

function AddEmployee({ handleAddEmployee }) {
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState({
    empId: null,
    firstName: "",
    lastName: "",
    gender: "",
    contactAddress: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    pic: "",
    birthday: "",
    joinDate: "",
    status: "",
    jobTitle: "",
    aboutMe: "",
    dl: "",
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setEmployee((prevChild) => ({
      ...prevChild,
      pic: e.target.files[0].name,
    }));
    previewImage(e);
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("emppic9");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 5);
      formData.append("filename", filename);

      try {
        const response = await axios.post(
          "https://csdemoproject.info/SchoolProject/api/files/upload",
          formData
        );

        if (response.status === 200) {
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected.");
    }
  };

  const addEmployeeRecord = async (e) => {
    // e.preventDefault();
    employee.pic = Date.now() + employee.pic;

    try {
      const response = await axios.post(
        "https://csdemoproject.info/SchoolProject/api/employees/addEmployee",
        { ...employee, password: Date.now().slice(-5) }
      );

      if (!response.status === 201) {
        throw new Error("Failed to add employee");
      }

      // Reset form fields after successful submission
      setEmployee({
        empId: null,
        firstName: "",
        lastName: "",
        gender: "",
        contactAddress: "",
        primaryPhone: "",
        alternatePhone: "",
        email: "",
        pic: "",
        birthday: "",
        joinDate: "",
        status: "",
        jobTitle: "",
        aboutMe: "",
        dl: "",
      });
      uploadImage(employee.pic);
      handleAddEmployee();
      alert("Employee added successfully");
    } catch (error) {
      alert("Failed to add employee. Please try again.");
    }
  };

  let submitClick = (e) => {
    if (employee.status === "") {
      alert("Please select a status.");
      return;
    }
    addEmployeeRecord();
  };
  ///////////////////////////////
  useEffect(() => {
    window.$("#gender9").materialSelect();
    window.$("#status9").materialSelect();

    window.$(".datepicker").pickadate({
      // Escape any “rule” characters with an exclamation mark (!).
      format: "dd-mm-yyyy",
      formatSubmit: "yyyy/mm/dd",
      hiddenPrefix: "prefix__",
      hiddenSuffix: "__suffix",
    });
  });
  ////////////////////////////////
  return (
    <div>
      <div
        className="modal fade"
        id="addEmployee"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <p className="heading lead">Add Employee</p>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>

            <form className="form-floating">
              {/* Body */}
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="pic9">Employee Picture:</label>
                      <input
                        type="file"
                        id="pic9"
                        name="pic"
                        onChange={handleFileChange}
                        className="btn btn-outline-secondary btn-rounded"
                        data-mdb-ripple-color="dark"
                      />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;Upload Employee Photo</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      id="emppic9"
                      className="img-fluid rounded-circle"
                      width="130px"
                      height="150px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="md-form">
                      <label htmlFor="firstName9">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName9"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="lastName9">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName9"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <select
                        class="mdb-select colorful-select dropdown-primary "
                        id="gender9"
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <label class="mdb-main-label pull-left">Gender</label>
                    </div>
                    <div className="md-form">
                      <label htmlFor="contactAddress9">Contact Address:</label>
                      <textarea
                        rows="3"
                        className="md-textarea form-control"
                        id="contactAddress9"
                        name="contactAddress"
                        value={employee.contactAddress}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="md-form">
                      <label htmlFor="primaryPhone9">Primary Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="primaryPhone9"
                        name="primaryPhone"
                        value={employee.primaryPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="alternatePhone9">Alternate Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alternatePhone9"
                        name="alternatePhone"
                        value={employee.alternatePhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="md-form">
                      <label htmlFor="email9">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email9"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="birthday9">Birthday:</label>
                      <input
                        type="text"
                        className="form-control datepicker"
                        id="birthday9"
                        name="birthday"
                        value={employee.birthday}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="joinDate9">Join Date:</label>
                      <input
                        type="date"
                        className="form-control datepicker"
                        id="joinDate9"
                        name="joinDate"
                        value={employee.joinDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <select
                        className="mdb-select colorful-select dropdown-primary"
                        name="status"
                        value={employee.status}
                        id="status9"
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        <option value="EveryDay">EveryDay</option>
                        <option value="Inactive">InActive</option>
                        <option value="Substitue">Substitue</option>
                      </select>
                      <label class="mdb-main-label pull-left">Status</label>
                    </div>
                    <div className="md-form">
                      <label htmlFor="jobTitle9">Job Title:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="jobTitle9"
                        name="jobTitle"
                        value={employee.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="aboutMe9">About Me:</label>
                      <textarea
                        className="md-textarea form-control"
                        id="aboutMe9"
                        name="aboutMe"
                        value={employee.aboutMe}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="md-form">
                      <label htmlFor="dl9">DL:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="dl9"
                        name="dl"
                        value={employee.dl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={() => submitClick()}
                  data-dismiss="modal"
                >
                  Add Employee <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}

export default AddEmployee;
