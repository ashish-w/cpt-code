import { LazyLoadImage } from "react-lazy-load-image-component";

const QuantitySelectors = ({ setCount, count, tourData, maxDuration }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        className="mt-3"
      >
        <div className="form-group" style={{}}>
          <div className="t-title text-bold">Adults (16+)</div>
          <div
            className=""
            style={{
              display: "flex",
              gap: "0.4rem",
            }}
          >
            <div
              className="cursor-pointer text-normal"
              onClick={(e) => {
                setCount({
                  ...count,
                  adults: count.adults > 1 ? count.adults - 1 : 0,
                });
              }}
            >
              -
            </div>
            <input
              className="counter-field-sidebar text-dark-green"
              style={{ width: "4rem", borderRadius: "30px" }}
              type="number"
              value={count.adults}
              readOnly
            />
            <div
              className="cursor-pointer text-normal"
              style={{ color: "#5ba205" }}
              onClick={(e) => {
                setCount({ ...count, adults: count.adults + 1 });
              }}
            >
              +
            </div>
          </div>
        </div>

        <div className="form-group ">
          <div className="t-title text-bold">Children (5-16)</div>
          <div
            className=""
            style={{
              display: "flex",
              gap: "0.4rem",
            }}
          >
            <div
              className="cursor-pointer text-normal"
              onClick={(e) => {
                setCount({
                  ...count,
                  kids: count.kids > 1 ? count.kids - 1 : 0,
                });
              }}
            >
              -
            </div>
            <input
              className="counter-field-sidebar text-dark-green"
              style={{
                width: "4rem",
                borderRadius: "30px",
              }}
              type="number"
              value={count.kids}
              readOnly
            />
            <div
              className="cursor-pointer text-normal"
              style={{ color: "#5ba205" }}
              onClick={(e) => {
                setCount({ ...count, kids: count.kids + 1 });
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>

      {tourData?.slug.data.attributes.slug?.includes("bike-rental") && (
        <>
          <div className="form-group centered-row">
            <div className="t-title text-left">
              <i className="pr-2">
                <LazyLoadImage src="/basket2.svg" width={20} />
              </i>
              Baskets
            </div>
            <div
              className="btn-counter"
              onClick={(e) =>
                setCount({
                  ...count,
                  baskets: count.baskets > 1 ? count.baskets - 1 : 0,
                })
              }
            >
              -
            </div>
            <input
              className="counter-field-sidebar"
              type="number"
              value={count.baskets}
              readOnly
            />
            <div
              className="btn-counter"
              onClick={(e) =>
                setCount({ ...count, baskets: count.baskets + 1 })
              }
            >
              +
            </div>
          </div>
          <div className="form-group centered-row">
            <div className="t-title text-left">
              <i className="pr-2">
                <LazyLoadImage src="/lock.svg" width={20} />
              </i>
              Locks
            </div>
            <div
              className="btn-counter"
              onClick={(e) =>
                setCount({
                  ...count,
                  locks: count.locks > 1 ? count.locks - 1 : 0,
                })
              }
            >
              -
            </div>
            <input
              className="counter-field-sidebar"
              type="number"
              value={count.locks}
              readOnly
            />
            <div
              className="btn-counter"
              onClick={(e) => setCount({ ...count, locks: count.locks + 1 })}
            >
              +
            </div>
          </div>
        </>
      )}
      {/* 
      {tourData?.fixedDuration ? (
        <p className="t-title">
          <b> {tourData.fixedDuration}</b>
        </p>
      ) : (
        <>
          <p className="t-title">Duration</p>
          <div className="form-group centered-row">
            <div
              className="btn-counter"
              onClick={(e) =>
                setCount({
                  ...count,
                  duration: count.duration > 1 ? count.duration - 1 : 1,
                })
              }
            >
              -
            </div>
            {count.duration === 4 ? (
              "All day"
            ) : (
              <input
                className="counter-field-sidebar"
                type="text"
                value={count.duration + " h"}
                readOnly
              />
            )}
            <div
              className="btn-counter"
              onClick={(e) =>
                setCount({
                  ...count,
                  duration:
                    count.duration < maxDuration
                      ? count.duration + 1
                      : maxDuration,
                })
              }
            >
              +
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default QuantitySelectors;
