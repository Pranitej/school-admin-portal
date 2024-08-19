import React, { useState, useEffect } from "react";

export default function AddFamily({ handleAddFamily }) {
  const [familyName, setFamilyName] = useState("");
  const [status, setStatus] = useState("Active");

  const addFamilyRecord = async () => {
    setStatus("Active");
    await fetch(
      "https://csdemoproject.info/SchoolProject/api/families/addFamily",
      {
        method: "POST",
        body: JSON.stringify({
          familyName: familyName,
          status: status,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFamilyName("");
          handleAddFamily();
        } else {
          alert("Family not added. Try again!!!");
        }
      })
      .catch((err) => {
        console.error("Error : " + err.message);
        alert("Error:" + err.message);
      });
    setFamilyName("");
  };

  let submitClick = (e) => {
    addFamilyRecord();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addFamily"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Add Family</p>

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
              <div className="modal-body">
                <div className="">
                  <div className="form-group">
                    <label for="familyName">Family Name:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="familyName"
                      onChange={(e) => {
                        setFamilyName(e.target.value);
                      }}
                    />
                  </div>
                  <div class="form-group">
                    <label for="status">Status:</label>
                    <select
                      className="form-control"
                      id="status"
                      value={status || "Active"}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info btn-sm"
                  onClick={() => submitClick()}
                  data-dismiss="modal"
                >
                  Add Family <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect btn-sm"
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
