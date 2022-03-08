import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  var a = [];
  const [showVOte, setShowVote] = useState(false);

  var abc = [];

  const [sortedArray, setSortedArray] = useState([]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (title !== "") {
      if (localStorage.getItem("Voting")) {
        JSON.parse(localStorage.getItem("Voting")).map((as) => {
          a.push(as);
        });
      }
      a.push({ name: title});
    }
    localStorage.setItem("Voting", JSON.stringify(a));
  };

  function createTitle() {
    return (
      <div
        className="mt-5 ml-5"
        style={{ textAlign: "center", marginBottom: "5%" }}
      >
        <div style={{ textAlign: "left", marginBottom: "5%" }}>
          <h1>Enter a Candidate Name For Election.</h1>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8">
              <div className="form-group">
                <label className="text-muted">Candidate Name</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
            </div>

            <div className="col-lg-4">
              <button
                className="btn btn-outline-primary mt-4"
                style={{ width: "100%" }}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  const handleVote = (na) => {
    // var index = a.findIndex(item => item.name === ab.name);

    // console.log(index,ab,a)
    if (localStorage.getItem(na)) {
      var add = localStorage.getItem(na);
      var abc = 1;
      var sum = Number(add) + Number(abc);
      localStorage.setItem(na, sum);
    } else {
      localStorage.setItem(na, 1);
    }
    window.location.reload();
  };

  return (
    <div className="container">
      {createTitle()}
      <div className="container mt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Candidate Name</th>
            </tr>
          </thead>
          <tbody>
            {localStorage.getItem("Voting") &&
              JSON.parse(localStorage.getItem("Voting")).map((a, i) => {
                if (localStorage.getItem(a.name)) {
                  abc.push({
                    name: a.name,
                    vote: Number(localStorage.getItem(a.name)),
                  });
                }
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{a.name}</td>
                    {showVOte ? (
                      <td>{localStorage.getItem(a.name)} </td>
                    ) : (
                      <td>
                        <div style={{ textAlign: "right" }}>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => {
                              handleVote(a.name);
                              // setSortedArray(abc.sort(function(a,b){ return b.vote - a.vote} ))
                            }}
                          >
                            Vote
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div style={{ textAlign: "center", margin: "5%" }}>
          {showVOte ? (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowVote(false)}
            >
              Continue Vote 
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                setShowVote(true);
              }}
            >
              Show Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
