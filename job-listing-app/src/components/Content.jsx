import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function Content() {
  const [api, setApi] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://www.arbeitnow.com/api/job-board-api")
      .then((res) => setApi(res.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const currentItems = api.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const totalPages = Math.ceil(api.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container">
      <div className="row">
        {currentItems.map((item) => (
          <div className="col-md-6 col-lg-4 mb-4" key={item.slug}>
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img
                    src={`https://logo.clearbit.com/${item.company_name?.replace(
                      /\s+/g,
                      ""
                    )}.com`}
                    alt={item.company_name}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.company_name
                      )}&background=random&size=50`;
                    }}
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <h5 className="card-title">{item.title}</h5>
                <h6 className="text-muted">{item.company_name}</h6>
                <p className="card-text">📍 {item.location}</p>
                {item.remote ? (
                  <p className="text-success">🌍 Remote Job</p>
                ) : (
                  <p className="text-danger">🏢 Onsite Job</p>
                )}
                <p className="text-muted">
                  📅 Posted: {new Date(item.created_at * 1000).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  {item.tags &&
                    item.tags.map((tag, i) => (
                      <span key={i} className="badge bg-primary me-1">
                        {tag}
                      </span>
                    ))}
                </div>
                <a href={item.url} target="_blank" className="btn btn-primary">
                  View Job
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center mt-4"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
}

export default Content;
