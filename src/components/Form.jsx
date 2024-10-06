import { useEffect, useState } from "react";

function Form() {
  let [student, setStudent] = useState({});
  let [hobby, setHobby] = useState([]);
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);
  let [error, setError] = useState({});

  useEffect(() => {
    let oldList = JSON.parse(sessionStorage.getItem("studentList")) || [];
    setList(oldList);
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;
    let ho1 = [...hobby];

    if (name == "hobby") {
      if (e.target.checked) {
        ho1.push(value);
      } else {
        let pos = ho1.findIndex((val) => val == value);
        console.log(pos);

        ho1.splice(pos, 1);
      }
      value = ho1;
      console.log(value);
    }
    setHobby(ho1);
    let newStudent = { ...student, [name]: value };
    setStudent(newStudent);
    setError(dataValidation());
  };

  let dataValidation = () => {
    let tempError = {};
    if (!student.name) tempError.name = "Name is required.";
    if (!student.email) tempError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email))
      tempError.email = "Invalid Email.";
    if (!student.password) tempError.password = "password is required";
    setError(tempError);
    return Object.keys(tempError).length == 0;
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!dataValidation()) return false;

    let newList;

    if (index != -1) {
      list[index] = student;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, student];
    }
    setList(newList);
    sessionStorage.setItem("studentList", JSON.stringify(newList));
    setStudent({});
    setHobby([]);
  };

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    sessionStorage.setItem("studentList", JSON.stringify(newList));
  };

  let editData = (pos) => {
    let editStud = list[pos];
    console.log(editStud);
    setStudent(editStud);
    setHobby(editStud.hobby);
    setIndex(pos);
  };
  return (
    <>
      <div className="container hello">
        <header className="header">
          <h1 id="title" className="text-center display-3 mt-3">
            Ragistration Form
          </h1>
        </header>
        <div className="form-wrap hii">
          <form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label id="name-label">Name</label>

                  <input
                    type="text"
                    name="name"
                    value={student.name ? student.name : ""}
                    onChange={handleInput}
                  />
                  <span className="error">{error.name || ""}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="email-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={student.email ? student.email : ""}
                    onChange={handleInput}
                  />
                  <span className="error">{error.name || ""}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label id="number-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={student.password || ""}
                    onChange={handleInput}
                  />
                  <span className="error">{error.name || ""}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Current City</label>
                  <select
                    name="city"
                    id=""
                    value={student.city || ""}
                    onChange={handleInput}
                  >
                    <option value="">---Select City---</option>
                    <option value="surat">Surat</option>
                    <option value="Baroda">Baroda</option>
                    <option value="Baroda">Amdavad</option>
                    <option value="Baroda">Rajkot</option>
                    <option value="Baroda">Navsari</option>
                    <option value="Vapi">Vapi</option>{" "}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <div className="border w-75 rounded">
                    <input
                      type="radio"
                      className="me-2 ms-2"
                      name="gender"
                      value="male"
                      checked={student.gender == "male"}
                      onChange={handleInput}
                      id=""
                    />{" "}
                    Male
                    <input
                      type="radio"
                      className="me-2 ms-2"
                      name="gender"
                      value="female"
                      checked={student.gender == "female"}
                      onChange={handleInput}
                      id=""
                    />{" "}
                    Female
                    <input
                      type="radio"
                      className="me-2 ms-2"
                      name="gender"
                      value="other"
                      checked={student.gender == "other"}
                      onChange={handleInput}
                      id=""
                    />{" "}
                    Other
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Select Your Hobby</label>
                  <div className="custom-control custom-checkbox custom-control-inline border w-75 rounded">
                    <input
                      type="checkbox"
                      className="custom-control-input ms-2 me-2"
                      name="hobby"
                      value="cricket"
                      checked={hobby.includes("cricket") ? "checked" : ""}
                      onChange={handleInput}
                    />
                    <label className="custom-control-label me-2">Cricket</label>
                    <input
                      type="checkbox"
                      className="me-2"
                      name="hobby"
                      value="singing"
                      checked={hobby.includes("singing") ? "checked" : ""}
                      onChange={handleInput}
                    />
                    <label className="custom-control-label me-2">Singing</label>
                    <input
                      type="checkbox"
                      className=" me-2"
                      name="hobby"
                      value="dancing"
                      checked={hobby.includes("dancing") ? "checked" : ""}
                      onChange={handleInput}
                    />
                    <label className=" me-2">Dancing</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    rows={3}
                    cols={20}
                    name="address"
                    className="form-control"
                    placeholder="Enter Current Address"
                    value={student.address || ""}
                    onChange={handleInput}
                    id=""
                  />
                </div>
              </div>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value={index != -1 ? "Edit Data" : "Add Data"}
              />
            </div>
          </form>
        </div>
      </div>
      <br /> <br />
      <h2 className="text-center">Student Record</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Hobby</th>
            <th>Gander</th>
            <th>Address</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.password}</td>
                <td>{v.hobby.toString()}</td>
                <td>{v.gender}</td>
                <td>{v.address}</td>
                <td>{v.city}</td>
                <td>
                  <button
                    className="btn btn-danger me-3 py-1"
                    onClick={() => deleteData(i)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success py-1 px-4"
                    onClick={() => editData(i)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Form;
