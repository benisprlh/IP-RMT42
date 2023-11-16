export function TeamDetail() {
  return (
    <>
      <section className="bg-dark  h-100">
        <div className="container py-3">
          <div className="row g-0">
            <div className="col-md-6 bg-dark">
              <img src="https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png" className="img-fluid rounded-circle shadow-lg" alt="..." />
            </div>
            <div className="col-md-6 text-light d-flex align-items-center">
              <div>
                <h3 className="card-title fw-bold text-warning py-2">Atlanta Hawks</h3>
                <div>
                  <h6 className="my-0">Nickname: Hawks</h6>
                  <h6 className="my-0">City: Atlanta</h6>
                </div>
              </div>
            </div>

            <div className="card my-5">
              <div className="card-body">
                <h4 className="text-center mb-2">Statistic Team</h4>
                <div className="row g-0 ">
                  <div className="col-md-3 py-2 flex flex-column text-center">
                    <h6>Games</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points In Paint</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Points of Turn Overs</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Fast Break Points</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Offense Rebound</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Deffense Rebound</h6>
                    <p>600</p>
                  </div>
                  <div className="col-md-3 py-3 flex flex-column text-center">
                    <h6>Games</h6>
                    <p>600</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
