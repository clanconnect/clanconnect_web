import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, Empty } from "antd";
import routeConstant from "common/routeConstants";
import InfluncerFile from "../InfluncerFile";
import {
  getCreativesAction,
  creativeUpdateBulkAction,
} from "redux/brands/creatives/actions";
import {
  influncerNameDataApproved,
  influncerNameDataPending,
  influncerNameDataRejected,
} from "common/dataManager";
import "./styles.scss";
import { useDispatch } from "react-redux";

const CreativeApprovalData = ({
  defaultActiveKey,
  getCreatives,
  creativeDetails,
}) => {
  const { TabPane } = Tabs;
  let { id } = useParams();
  const dispatch = useDispatch();
  const [showSelectAllActive, setShowSelectAllActive] = useState(false);
  const [selectedCreatives, setSelectedCreatives] = useState([]);

  const handleSelectAll = () => {
    const isSelected = isAllSelected();
    const uppdatedCreative = new Set(selectedCreatives);
    creativeDetails.forEach((data) => {
      data.creatives.map((creative) => {
        if (!isSelected && !uppdatedCreative.has(creative.id)) {
          uppdatedCreative.add(creative.id);
        } else if (isSelected && uppdatedCreative.has(creative.id)) {
          uppdatedCreative.delete(creative.id);
        }
      });
    });
    setSelectedCreatives(Array.from(uppdatedCreative));
  };

  const isAllSelected = () => {
    let isSelected = true;
    if (selectedCreatives.length === 0) {
      return false;
    }
    creativeDetails.forEach((data) => {
      data.creatives.map((creative) => {
        if (!selectedCreatives.includes(creative.id)) {
          isSelected = false;
        }
      });
    });
    return isSelected;
  };

  const onClickSelect = (value) => {
    setShowSelectAllActive(value);
  };

  const handleBulkCreatives = (status, currentStatus) => {
    dispatch(
      creativeUpdateBulkAction({
        creatives: selectedCreatives,
        status,
        projectId: id,
        currentStatus,
      })
    );
  };

  useEffect(() => {
    // if (defaultActiveKey === 'pending') {
    //   let params = {
    //     include: 'media,user',
    //     status: 'pending',
    //   };
    //   dispatch(getCreativesAction({ params, id }));
    // }
    let params = {
      include: "media,user",
      status: defaultActiveKey,
    };
    dispatch(getCreativesAction({ params, id }));
  }, []);

  const operations = (
    <Link to={routeConstant.allCreativesListsBrand}>
      <p className="cursor-pointer view-title">View all creatives</p>
    </Link>
  );

  const fetchNotScheduledCreatives = (creativeDetails) => {
    creativeDetails = creativeDetails.filter(
      ({ creatives }) => creatives.length !== 0
    );

    creativeDetails = creativeDetails.filter(({ creatives }) => {
      (creatives || []).forEach((c) => {
        return !c.socials || (!c.socials.youtube && !c.socials.instagram);
      });
      return true;
    });

    creativeDetails = creativeDetails.map(({ creatives, user }) => {
      creatives = creatives.filter(
        (c) => !c.socials || (!c.socials.youtube && !c.socials.instagram)
      );
      return { user, creatives };
    });
    return creativeDetails;
  };

  const fetchScheduledCreatives = (creativeDetails) => {
    creativeDetails = creativeDetails.filter(
      ({ creatives }) => creatives.length !== 0
    );

    creativeDetails = creativeDetails.filter(({ creatives }) => {
      (creatives || []).forEach(
        (c) => c.socials && (c.socials.youtube || c.socials.instagram)
      );
      return true;
    });

    creativeDetails = creativeDetails
      .map(({ creatives, user }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            ((c.socials.youtube && !c.socials.youtube?.isUploaded) ||
              (c.socials.instagram && !c.socials.instagram.isUploaded))
        );
        return { user, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return creativeDetails;
  };

  const fetchLiveCreatives = (creativeDetails) => {
    creativeDetails = creativeDetails.filter(
      ({ creatives }) => creatives.length !== 0
    );

    creativeDetails = creativeDetails
      .map(({ creatives, user }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isUploaded || c.socials?.instagram?.isUploaded)
        );
        return { user, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return creativeDetails;
  };

  const fetchCancelledCreatives = (creativeDetails) => {
    creativeDetails = creativeDetails.filter(
      ({ creatives }) => creatives.length !== 0
    );

    creativeDetails = creativeDetails
      .map(({ creatives, user }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isErrored ||
              c.socials?.youtube?.cancelReason ||
              c.socials?.instagram?.isErrored ||
              c.socials?.instagram?.cancelReason)
        );
        return { user, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return creativeDetails;
  };

  return (
    <div className="tab-creative">
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          getCreatives(key);
          setSelectedCreatives([]);
          setShowSelectAllActive(false);
        }}
        tabBarExtraContent={operations}
      >
        <TabPane tab="Pending" key="pending">
          {creativeDetails.length !== 0 && (
            <div className="btn-row">
              <div>
                {showSelectAllActive ? (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleSelectAll}
                    >
                      Select All
                    </button>

                    <button
                      className="btn btn-outline-grey"
                      onClick={() => setSelectedCreatives([])}
                    >
                      Deselect All
                    </button>

                    <button
                      className="btn btn-outline-green"
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives("accepted", "pending");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives("rejected", "pending");
                      }}
                    >
                      Reject
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        onClickSelect(false);
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <button
                    className="btn bg-green"
                    onClick={() => onClickSelect(true)}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          )}
          <InfluncerFile
            influncerNameData={influncerNameDataPending}
            showSelectAllActive={showSelectAllActive}
            creativeDetails={creativeDetails}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />
          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>

        <TabPane tab="Approved" key="accepted">
          <Tabs className="tab-sub-tabs mt-5">
            <TabPane tab="Non-scheduled" key="non-scheduled">
              {fetchNotScheduledCreatives(creativeDetails).length !== 0 && (
                <div className="btn-row">
                  <div>
                    {showSelectAllActive ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </button>

                        <button
                          className="btn btn-outline-grey"
                          onClick={() => setSelectedCreatives([])}
                        >
                          Deselect All
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            onClickSelect(false);
                            handleBulkCreatives("rejected", "accepted");
                          }}
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onClickSelect(false);
                          }}
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn bg-green"
                        onClick={() => onClickSelect(true)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              )}
              <InfluncerFile
                influncerNameData={influncerNameDataApproved}
                showSelectAllActive={showSelectAllActive}
                creativeDetails={fetchNotScheduledCreatives(creativeDetails)}
                selectedCreatives={selectedCreatives}
                setSelectedCreatives={setSelectedCreatives}
              />
            </TabPane>

            <TabPane tab="Scheduled" key="scheduled">
              {fetchScheduledCreatives(creativeDetails).length !== 0 && (
                <div className="btn-row">
                  <div>
                    {showSelectAllActive ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </button>

                        <button
                          className="btn btn-outline-grey"
                          onClick={() => setSelectedCreatives([])}
                        >
                          Deselect All
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            onClickSelect(false);
                            handleBulkCreatives("rejected", "accepted");
                          }}
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onClickSelect(false);
                          }}
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn bg-green"
                        onClick={() => onClickSelect(true)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              )}

              <InfluncerFile
                influncerNameData={influncerNameDataApproved}
                showSelectAllActive={showSelectAllActive}
                creativeDetails={fetchScheduledCreatives(creativeDetails)}
                selectedCreatives={selectedCreatives}
                setSelectedCreatives={setSelectedCreatives}
              />
            </TabPane>

            <TabPane tab="Live" key="live">
              {fetchLiveCreatives(creativeDetails).length !== 0 && (
                <div className="btn-row">
                  <div>
                    {showSelectAllActive ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </button>

                        <button
                          className="btn btn-outline-grey"
                          onClick={() => setSelectedCreatives([])}
                        >
                          Deselect All
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            onClickSelect(false);
                            handleBulkCreatives("rejected", "accepted");
                          }}
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onClickSelect(false);
                          }}
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn bg-green"
                        onClick={() => onClickSelect(true)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              )}
              <InfluncerFile
                influncerNameData={influncerNameDataApproved}
                showSelectAllActive={showSelectAllActive}
                creativeDetails={fetchLiveCreatives(creativeDetails)}
                selectedCreatives={selectedCreatives}
                setSelectedCreatives={setSelectedCreatives}
              />
            </TabPane>

            <TabPane tab="Cancelled" key="cancelled">
              {fetchCancelledCreatives(creativeDetails).length !== 0 && (
                <div className="btn-row">
                  <div>
                    {showSelectAllActive ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </button>

                        <button
                          className="btn btn-outline-grey"
                          onClick={() => setSelectedCreatives([])}
                        >
                          Deselect All
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            onClickSelect(false);
                            handleBulkCreatives("rejected", "accepted");
                          }}
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            onClickSelect(false);
                          }}
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn bg-green"
                        onClick={() => onClickSelect(true)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              )}

              <InfluncerFile
                influncerNameData={influncerNameDataApproved}
                showSelectAllActive={showSelectAllActive}
                creativeDetails={fetchCancelledCreatives(creativeDetails)}
                selectedCreatives={selectedCreatives}
                setSelectedCreatives={setSelectedCreatives}
              />
            </TabPane>
          </Tabs>

          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>

        <TabPane tab="Rejected" key="rejected">
          {creativeDetails.length !== 0 && (
            <div className="btn-row">
              <div>
                {showSelectAllActive ? (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleSelectAll}
                    >
                      Select All
                    </button>

                    <button
                      className="btn btn-outline-grey"
                      onClick={() => setSelectedCreatives([])}
                    >
                      Deselect All
                    </button>
                    <button
                      className="btn btn-outline-green"
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives("accepted", "rejected");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        onClickSelect(false);
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <button
                    className="btn bg-green"
                    onClick={() => onClickSelect(true)}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          )}
          <InfluncerFile
            influncerNameData={influncerNameDataRejected}
            showSelectAllActive={showSelectAllActive}
            creativeDetails={creativeDetails}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />
          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreativeApprovalData;
